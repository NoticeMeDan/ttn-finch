package com.noticemedan.finch.dto

data class FlowInfo (
	val name: String,
	val applicationId: String,
	val schedule: String,
    val resultConfig: ResultConfigInfo?,
    var activityLogEnabled: Boolean,
	val id: Long? = null
)
