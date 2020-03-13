package com.noticemedan.finch.dto

import java.time.Instant

data class ActivityLogLineInfo (
		val message: String,
		val time: Instant
)
