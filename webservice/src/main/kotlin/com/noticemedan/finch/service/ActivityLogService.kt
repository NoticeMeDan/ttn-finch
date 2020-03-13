package com.noticemedan.finch.service

import com.noticemedan.finch.dao.ActivityLogLineDao
import com.noticemedan.finch.dao.FlowDao
import com.noticemedan.finch.dto.ActivityLogLineInfo
import com.noticemedan.finch.dto.Slice
import com.noticemedan.finch.entity.QActivityLogLine
import com.noticemedan.finch.exception.FlowNotFound
import com.noticemedan.finch.util.DtoFactory
import com.noticemedan.finch.util.SliceFactory
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.Instant

@Service
class ActivityLogService (
		private val activityLogLineDao: ActivityLogLineDao,
		private val flowDao: FlowDao,
		private val dtoFactory: DtoFactory
) {
	companion object {
		const val PAGE_SIZE = 30
	}

	@Transactional
	fun getLogForPeriod (from: Instant, to: Instant, flowId: Long, page: Int): Slice<ActivityLogLineInfo> {
		val flow = flowDao.findById(flowId).orElseThrow { FlowNotFound() }
		val query = QActivityLogLine.activityLogLine.time.between(from, to)
				.and(QActivityLogLine.activityLogLine.flowId.eq(flow.id))

		return SliceFactory.toSlice(
				activityLogLineDao.findAll(
						query,
						PageRequest.of(page, PAGE_SIZE, Sort.by(Sort.Direction.DESC, "time"))
				),
				dtoFactory::toInfo
		)
	}
}
