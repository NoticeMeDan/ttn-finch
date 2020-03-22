package com.noticemedan.finch.result

import com.noticemedan.finch.util.ActivityLogHelper

class TestResult(logger: ActivityLogHelper, flowId: Long) : AbstractResult(logger, flowId) {
	private fun process () {
		logger.addLogLineToFlow("Running test result...", flowId)
		Thread.sleep(2000)
		logger.addLogLineToFlow("TestResult finished", flowId)
	}

	override fun run() {
		process()
	}
}
