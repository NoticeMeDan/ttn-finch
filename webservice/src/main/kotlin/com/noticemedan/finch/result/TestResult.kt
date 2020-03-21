package com.noticemedan.finch.result

import com.noticemedan.finch.util.ActivityLogHelper

class TestResult(
	logger: ActivityLogHelper
) : AbstractResult(logger) {
	override fun run() {
		println("Er du gal en sej besked")
	}
}
