package com.noticemedan.finch.util

import com.noticemedan.finch.dto.FlowInfo
import com.noticemedan.finch.entity.Flow
import org.springframework.stereotype.Component

@Component
class DtoFactory {
	fun toInfo (source: Flow): FlowInfo {
		return FlowInfo(
				source.name,
				source.applicationId,
				source.id)
	}
}
