package com.noticemedan.finch.result

import com.noticemedan.finch.dto.ResultDescription
import com.noticemedan.finch.entity.Flow
import com.noticemedan.finch.util.ActivityLogHelper
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional

@Component
class TestResult(private val logger: ActivityLogHelper) : Result {
	@Transactional
	override fun run(flow: Flow) {
		logger.addLogLineToFlow("Running test result...", flow)
		Thread.sleep(2000)
		logger.addLogLineToFlow("TestResult finished", flow)
	}

    override fun getDescription(): ResultDescription {
        TODO("Not yet implemented")
    }
}
