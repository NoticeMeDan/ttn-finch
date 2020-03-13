package com.noticemedan.finch.service

import com.noticemedan.finch.TestConfig
import com.noticemedan.finch.dto.FlowInfo
import com.noticemedan.finch.util.ActivityLogHelper
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
		val flow = flowService.createFlow(FlowInfo("Test flow", "my-app"))

		val message1 = "Test message 1"
		val message2 = "Test message 2"

		activityLogHelper.addLogLineToFlow(message1, flow.id!!)
		activityLogHelper.addLogLineToFlow(message2, flow.id!!)

		val subject = activityLogService.getLogForPeriod(Instant.EPOCH, Instant.now(), flow.id!!, 0)

		assertThat(subject).isNotNull
		assertThat(subject.totalPages).isEqualTo(1)
		assertThat(subject.pageData.size).isEqualTo(3) // createFlow also adds a log entry
	}
}
