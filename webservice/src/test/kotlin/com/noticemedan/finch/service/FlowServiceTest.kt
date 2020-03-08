package com.noticemedan.finch.service

import com.noticemedan.finch.TestConfig
import com.noticemedan.finch.dto.FlowInfo
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit4.SpringRunner

import org.assertj.core.api.Assertions.*

@RunWith(SpringRunner::class)
@SpringBootTest(classes = [TestConfig::class])
class FlowServiceTest {

	@Autowired
	private lateinit var flowService: FlowService

	@Test
	fun createFlow () {
		val name = FlowInfo("My cool flow", "my-cool-app")

		val subject = flowService.createFlow(name)

		assertThat(subject).isNotNull
		assertThat(subject.id).isNotNull()
		assertThat(subject.name).isEqualTo(name.name)
		assertThat(subject.applicationId).isEqualTo(name.applicationId)
	}

	@Test
	fun getFlows () {
		val flow1 = FlowInfo("B comes last", "app-1")
		val flow2 = FlowInfo("A comes first", "app-2")

		flowService.createFlow(flow1)
		flowService.createFlow(flow2)

		val subject = flowService.getFlows()

		assertThat(subject).isNotNull
		assertThat(subject.map {x -> x.name}).isSortedAccordingTo(Comparator.naturalOrder())
	}

	@Test
	fun getFlow () {
		val flow = FlowInfo("Yee boi", "app-42")

		val createdFlow = flowService.createFlow(flow)

		val subject = flowService.getFlow(createdFlow.id!!)

		assertThat(subject).isNotNull
		assertThat(subject.id).isEqualTo(createdFlow.id!!)
		assertThat(subject.name).isEqualTo(createdFlow.name)
		assertThat(subject.applicationId).isEqualTo(createdFlow.applicationId)
	}
}
