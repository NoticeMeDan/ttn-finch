package com.noticemedan.finch.service

import com.noticemedan.finch.TestConfig
import com.noticemedan.finch.dto.FlowInfo
import com.noticemedan.finch.dto.ResultConfigInfo
import com.noticemedan.finch.dto.ResultKind
import com.noticemedan.finch.exception.FlowNameAlreadyInUse
import com.noticemedan.finch.exception.FlowNotFound
import com.noticemedan.finch.exception.InvalidCronExpression
import com.noticemedan.finch.exception.InvalidResultConfig
import com.vladmihalcea.hibernate.type.json.internal.JacksonUtil
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit4.SpringRunner

import org.assertj.core.api.Assertions.*
import org.junit.jupiter.api.assertDoesNotThrow
import org.junit.jupiter.api.assertThrows

@RunWith(SpringRunner::class)
@SpringBootTest(classes = [TestConfig::class])
class FlowServiceTest {

	@Autowired
	private lateinit var flowService: FlowService

	@Test
	fun createFlow () {
		val flow = FlowInfo("My cool flow", "my-cool-app", "1 * * * * *", resultConfig, true)
        val config = "{\"url\": \"http://google.com/\", \"size\": 2}"
        val resultConfig = ResultConfigInfo(ResultKind.HTTP, JacksonUtil.toJsonNode(config))
		val flow = FlowInfo("My cool flow", "my-cool-app", "1 * * * * *", resultConfig, true)

		val subject = flowService.createFlow(flow)

		assertThat(subject).isNotNull
		assertThat(subject.id).isNotNull() // If i access the isNotNull field instead of running the function, it crashes due to type inference issues
		assertThat(subject.name).isEqualTo(flow.name)
		assertThat(subject.applicationId).isEqualTo(flow.applicationId)
	}

	@Test
	fun createFlowWithInvalidCronSchedule () {
        val flow = FlowInfo("My cool flow", "my-cool-app", "This is not a schedule", resultConfig, true)
        val config = "{\"url\": \"http://google.com/\", \"size\": 2}"
        val resultConfig = ResultConfigInfo(ResultKind.HTTP, JacksonUtil.toJsonNode(config))
        val flow = FlowInfo("My cool flow", "my-cool-app", "This is not a schedule", resultConfig), true

		assertThrows<InvalidCronExpression> { flowService.createFlow(flow) }
	}

    @Test
    fun createFlowWithInvalidResultConfig () {
        val resultConfig = ResultConfigInfo(ResultKind.HTTP, JacksonUtil.toJsonNode("{}"))
        val flow = FlowInfo("My cool flow", "my-cool-app", "1 * * * * *", resultConfig, true)

        assertThrows<InvalidResultConfig> { flowService.createFlow(flow) }
    }

    @Test
    fun createFlowWithMissingResultConfig () {
        val flow = FlowInfo("My cool flow", "my-cool-app", "1 * * * * *", null, true)

        assertThrows<InvalidResultConfig> { flowService.createFlow(flow) }
    }

	@Test
	fun getFlows () {
        val config = "{\"url\": \"http://google.com/\", \"size\": 2}"
        val resultConfig = ResultConfigInfo(ResultKind.HTTP, JacksonUtil.toJsonNode(config))
        val flow1 = FlowInfo("B comes last", "app-1", "1 * * * * *", resultConfig, true)
		val flow2 = FlowInfo("A comes first", "app-2", "1 * * * * *", resultConfig, true)

		flowService.createFlow(flow1)
		flowService.createFlow(flow2)

		val subject = flowService.getFlows(0)

		assertThat(subject).isNotNull
		assertThat(subject.totalPages).isEqualTo(1)
		assertThat(subject.pageData).isSortedAccordingTo { f1:FlowInfo, f2:FlowInfo -> f1.id!!.toInt() - f2.id!!.toInt() }
    }

	@Test
	fun getFlow () {
        val config = "{\"url\": \"http://google.com/\", \"size\": 2}"
        val resultConfig = ResultConfigInfo(ResultKind.HTTP, JacksonUtil.toJsonNode(config))
        val flow = FlowInfo("Yee boi", "app-42", "1 * * * * *", resultConfig, true)

		val createdFlow = flowService.createFlow(flow)

		val subject = flowService.getFlow(createdFlow.id!!)

		assertThat(subject).isNotNull
		assertThat(subject.id).isEqualTo(createdFlow.id!!)
		assertThat(subject.name).isEqualTo(createdFlow.name)
		assertThat(subject.applicationId).isEqualTo(createdFlow.applicationId)
	}

	@Test
	fun cannotCreateFlowsWithDuplicateNames () {
        val config = "{\"url\": \"http://google.com/\", \"size\": 2}"
        val resultConfig = ResultConfigInfo(ResultKind.HTTP, JacksonUtil.toJsonNode(config))
        val flow1 = FlowInfo("We have the same name", "app-42", "1 * * * * *", resultConfig, true)
		val flow2 = FlowInfo("We have the same name", "app-42", "1 * * * * *", resultConfig, true)

		assertDoesNotThrow { flowService.createFlow(flow1) }
		assertThrows<FlowNameAlreadyInUse> { flowService.createFlow(flow2) }
	}

    @Test
    fun deleteFlow () {
        val config = "{\"url\": \"http://google.com/\", \"size\": 2}"
        val resultConfig = ResultConfigInfo(ResultKind.HTTP, JacksonUtil.toJsonNode(config))
        val flow = FlowInfo("flow-42", "app-42", "1 * * * * *", resultConfig, true)

        val createdFlow = flowService.createFlow(flow)

        flowService.deleteFlow(createdFlow.id!!)

        assertThrows<FlowNotFound> { flowService.getFlow(createdFlow.id!!) }
    }

    @Test
    fun deleteNonExitingFlow () {
        val config = "{\"url\": \"http://google.com/\", \"size\": 2}"
        val resultConfig = ResultConfigInfo(ResultKind.HTTP, JacksonUtil.toJsonNode(config))
        val flow = FlowInfo("flow-42", "app-42", "1 * * * * *", resultConfig, true)

        val createdFlow = flowService.createFlow(flow)

        assertDoesNotThrow { flowService.deleteFlow(createdFlow.id!!) }
        assertThrows<FlowNotFound> { flowService.deleteFlow(createdFlow.id!!) }
    }
}
