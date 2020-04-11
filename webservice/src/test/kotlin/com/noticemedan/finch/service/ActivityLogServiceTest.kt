package com.noticemedan.finch.service

import com.noticemedan.finch.TestConfig
import com.noticemedan.finch.dto.FlowInfo
import com.noticemedan.finch.dto.ResultConfigInfo
import com.noticemedan.finch.dto.ResultKind
import com.noticemedan.finch.entity.Flow
import com.noticemedan.finch.entity.ResultConfig
import com.noticemedan.finch.util.ActivityLogHelper
import com.vladmihalcea.hibernate.type.json.internal.JacksonUtil
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit4.SpringRunner
import java.time.Instant

import org.assertj.core.api.Assertions.*
import org.springframework.transaction.annotation.Transactional

@RunWith(SpringRunner::class)
@SpringBootTest(classes = [TestConfig::class])
class ActivityLogServiceTest {
	@Autowired
	private lateinit var flowService: FlowService

	@Autowired
	private lateinit var activityLogService: ActivityLogService

	@Autowired
	private lateinit var activityLogHelper: ActivityLogHelper

	@Test
	@Transactional
	fun getLogForPeriod () {
        val resultConfig = ResultConfigInfo(ResultKind.CSV_TO_DISK, JacksonUtil.toJsonNode("{\"fileName\": \"Hej\"}"))
        val flowInfo = flowService.createFlow(FlowInfo("Test flow", "my-app", "* * * * * *", resultConfig, true))
        val flow = Flow(flowInfo.name, flowInfo.applicationId, flowInfo.schedule, null, null, flowInfo.activityLogEnabled, flowInfo.id)
        flow.resultConfig = ResultConfig(flowInfo.resultConfig!!.kind, flowInfo.resultConfig!!.config, flow)

        val message1 = "Test message 1"
		val message2 = "Test message 2"

		activityLogHelper.addLogLineToFlow(message1, flow)
		activityLogHelper.addLogLineToFlow(message2, flow)

		val subject = activityLogService.getLogForPeriod(Instant.EPOCH, Instant.now(), flow.id!!, 0)

		assertThat(subject).isNotNull
		assertThat(subject.totalPages).isEqualTo(1)
		assertThat(subject.pageData.size).isEqualTo(3) // createFlow also adds a log entry
	}

    @Test
    @Transactional
    fun activityLogDisabled () {
        val resultConfig = ResultConfigInfo(ResultKind.CSV_TO_DISK, JacksonUtil.toJsonNode("{\"fileName\": \"Hej\"}"))
        val flowInfo = flowService.createFlow(FlowInfo("Test flow with disabled log", "my-app", "* * * * * *", resultConfig, false))
        val flow = Flow(flowInfo.name, flowInfo.applicationId, flowInfo.schedule, null, null, flowInfo.activityLogEnabled, flowInfo.id)
        flow.resultConfig = ResultConfig(flowInfo.resultConfig!!.kind, flowInfo.resultConfig!!.config, flow)

        val message1 = "Test message 1 should not appear"
        val message2 = "Test message 2 should not appear"

        activityLogHelper.addLogLineToFlow(message1, flow)
        activityLogHelper.addLogLineToFlow(message2, flow)

        val subject = activityLogService.getLogForPeriod(Instant.EPOCH, Instant.now(), flow.id!!, 0)

        assertThat(subject.pageData.size).isEqualTo(0)
    }
}
