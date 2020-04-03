package com.noticemedan.finch.util

import com.noticemedan.finch.dto.ActivityLogLineInfo
import com.noticemedan.finch.dto.FlowInfo
import com.noticemedan.finch.dto.ResultConfigInfo
import com.noticemedan.finch.entity.ActivityLogLine
import com.noticemedan.finch.entity.Flow
import com.noticemedan.finch.entity.ResultConfig
import org.springframework.stereotype.Component

@Component
object DtoFactory {
	fun toInfo (source: Flow): FlowInfo =
            FlowInfo(
                source.name,
                source.applicationId,
                source.schedule,
                source.resultConfig?.let(::toInfo),
                source.id)

	fun toInfo (source: ActivityLogLine): ActivityLogLineInfo =
            ActivityLogLineInfo(source.message, source.time)

    fun toInfo (source: ResultConfig): ResultConfigInfo =
            ResultConfigInfo(source.kind, source.config, source.id)
}
