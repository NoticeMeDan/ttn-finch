package com.noticemedan.finch.result

import com.noticemedan.finch.dto.ResultDescription
import com.noticemedan.finch.entity.Flow

interface Result {
	fun run (flow: Flow)
    fun getDescription(): ResultDescription
}
