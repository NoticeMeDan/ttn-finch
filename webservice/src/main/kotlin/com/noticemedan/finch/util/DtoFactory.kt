package com.noticemedan.finch.util

import com.noticemedan.finch.dto.ActivityLogLineInfo
import com.noticemedan.finch.dto.FlowInfo
import com.noticemedan.finch.entity.ActivityLogLine
import com.noticemedan.finch.entity.Flow
import org.springframework.stereotype.Component

@Component
object DtoFactory {
	fun toInfo (source: Flow): FlowInfo {
		return FlowInfo(
			source.name,
			source.applicationId,
			source.schedule,
			source.id)
	}

	fun toInfo (source: ActivityLogLine): ActivityLogLineInfo {
		return ActivityLogLineInfo(source.message, source.time)
	}
}
