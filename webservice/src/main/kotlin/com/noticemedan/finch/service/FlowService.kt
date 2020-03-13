package com.noticemedan.finch.service

import com.noticemedan.finch.dao.FlowDao
import com.noticemedan.finch.dto.FlowInfo
import com.noticemedan.finch.entity.Flow
import com.noticemedan.finch.exception.FlowNotFound
import com.noticemedan.finch.util.ActivityLogHelper
import com.noticemedan.finch.util.DtoFactory
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
		val flow = flowDao.save(Flow(source.name, source.applicationId))
		activityLogHelper.addLogLineToFlow("Flow created", flow.id!!)
		return dtoFactory.toInfo(flow)
	}

	@Transactional
	fun getFlows (): List<FlowInfo> {
		return flowDao.findAll()
				.map(dtoFactory::toInfo)
				.sortedBy { x -> x.name }
	}

	@Transactional
	fun getFlow (flowId: Long): FlowInfo {
		return flowDao.findById(flowId)
				.map(dtoFactory::toInfo)
				.orElseThrow { FlowNotFound() }
	}
}
