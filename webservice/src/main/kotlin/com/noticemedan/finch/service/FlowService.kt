package com.noticemedan.finch.service

import com.noticemedan.finch.dao.FlowDao
import com.noticemedan.finch.dto.FlowInfo
import com.noticemedan.finch.dto.Slice
import com.noticemedan.finch.entity.Flow
import com.noticemedan.finch.exception.FlowNameAlreadyInUse
import com.noticemedan.finch.exception.FlowNotFound
import com.noticemedan.finch.util.ActivityLogHelper
import com.noticemedan.finch.util.DtoFactory
import com.noticemedan.finch.util.SliceFactory
import io.vavr.kotlin.Try
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class FlowService (
	private val flowDao: FlowDao,
	private val dtoFactory: DtoFactory,
	private val activityLogHelper: ActivityLogHelper
) {

	@Transactional
	fun createFlow (source: FlowInfo): FlowInfo {
		val flow = Try { flowDao.save(Flow(source.name, source.applicationId)) }
			.getOrElseThrow { -> FlowNameAlreadyInUse() }

		activityLogHelper.addLogLineToFlow("Flow created", flow.id!!)
		return dtoFactory.toInfo(flow)
	}

	@Transactional
	fun getFlows (page: Int): Slice<FlowInfo> {
		return SliceFactory.toSlice(
				flowDao.findAll(PageRequest.of(page, 10)),
				dtoFactory::toInfo
		)
	}

	@Transactional
	fun getFlow (flowId: Long): FlowInfo {
		return flowDao.findById(flowId)
				.map(dtoFactory::toInfo)
				.orElseThrow { FlowNotFound() }
	}
}
