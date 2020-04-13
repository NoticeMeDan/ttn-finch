package com.noticemedan.finch.result

import com.noticemedan.finch.dto.ResultDescription

interface Result {
	fun run (flowId: Long)
    fun getDescription(): ResultDescription
}
