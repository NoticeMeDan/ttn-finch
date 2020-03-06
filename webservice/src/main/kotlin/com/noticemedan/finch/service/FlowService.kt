package com.noticemedan.finch.service

import com.noticemedan.finch.dao.FlowDao
import com.noticemedan.finch.dto.FlowInfo
import com.noticemedan.finch.entity.Flow
import com.noticemedan.finch.util.DtoFactory
import org.springframework.transaction.annotation.Transactional

open class FlowService (
		private val flowDao: FlowDao,
		private val dtoFactory: DtoFactory
) {

	@Transactional
	open fun createFlow (applicationId: String): FlowInfo {
		return dtoFactory.toInfo(flowDao.save(Flow(applicationId)))
	}

	@Transactional
	open fun getFlows (): List<FlowInfo> {
		return flowDao.findAll().map(dtoFactory::toInfo)
	}
}
