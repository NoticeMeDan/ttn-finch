package com.noticemedan.finch.result

import com.noticemedan.finch.util.ActivityLogHelper
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional

@Component
class TestResult(private val logger: ActivityLogHelper) : Result {
	@Transactional
	override fun run(flowId: Long) {
		logger.addLogLineToFlow("Running test result...", flowId)
		Thread.sleep(2000)
		logger.addLogLineToFlow("TestResult finished", flowId)
	}
}
