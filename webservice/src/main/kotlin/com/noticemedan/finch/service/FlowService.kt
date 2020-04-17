package com.noticemedan.finch.service

import com.noticemedan.finch.dao.FlowDao
import com.noticemedan.finch.dto.FlowInfo
import com.noticemedan.finch.dto.Slice
import com.noticemedan.finch.entity.Flow
import com.noticemedan.finch.entity.ResultConfig
import com.noticemedan.finch.exception.FlowNameAlreadyInUse
import com.noticemedan.finch.exception.FlowNotFound
import com.noticemedan.finch.exception.InvalidCronExpression
import com.noticemedan.finch.exception.InvalidResultConfig
import com.noticemedan.finch.util.ActivityLogHelper
import com.noticemedan.finch.util.DtoFactory
import com.noticemedan.finch.util.SliceFactory
import io.vavr.kotlin.Try
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.scheduling.support.CronSequenceGenerator
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.Instant

@Service
class FlowService(
        private val flowDao: FlowDao,
        private val dtoFactory: DtoFactory,
        private val activityLogHelper: ActivityLogHelper,
        private val resultService: ResultService
) {

    @Transactional
    fun createFlow(source: FlowInfo): FlowInfo {
        if (!CronSequenceGenerator.isValidExpression(source.schedule))
            throw InvalidCronExpression()

        source.resultConfig?.let {
            if (!resultService.validateResultConfig(source.resultConfig.kind, source.resultConfig.config))
                throw InvalidResultConfig()

            val flow = Try { flowDao.save(Flow(source.name, source.applicationId, source.schedule, null, null, source.activityLogEnabled)) }
                    .getOrElseThrow { -> FlowNameAlreadyInUse() }

            flow.resultConfig = ResultConfig(source.resultConfig.kind, source.resultConfig.config, flow, Instant.EPOCH)
            flowDao.save(flow)

            resultService.addFlowToScheduler(flow)
            activityLogHelper.addLogLineToFlow("Flow created", flow)
            return dtoFactory.toInfo(flow)
        } ?: throw InvalidResultConfig()
    }

    @Transactional
    fun updateFlow(source: FlowInfo): FlowInfo {
        val current = flowDao.findById(source.id!!).orElseThrow { FlowNotFound() }

        if (!CronSequenceGenerator.isValidExpression(source.schedule))
            throw InvalidCronExpression()

        source.resultConfig?.let {
            if (!resultService.validateResultConfig(source.resultConfig.kind, source.resultConfig.config))
                throw InvalidResultConfig()

            val flow = Try { flowDao.save(Flow(source.name, source.applicationId, source.schedule, null, current.activityLogLines , source.activityLogEnabled, source.id)) }
                    .getOrElseThrow { -> FlowNameAlreadyInUse() }

            flow.resultConfig = ResultConfig(source.resultConfig.kind, source.resultConfig.config, flow, current.resultConfig?.lastRun ?: Instant.EPOCH)

            resultService.removeFlowFromScheduler(source.id)
            flowDao.save(flow)

            resultService.addFlowToScheduler(flow)
            activityLogHelper.addLogLineToFlow("Flow updated", flow)
            return dtoFactory.toInfo(flow)
        } ?: throw InvalidResultConfig()
    }

    @Transactional
    fun getFlows(page: Int): Slice<FlowInfo> {
        return SliceFactory.toSlice(
                flowDao.findAll(PageRequest.of(page, 10, Sort.by(Sort.Direction.ASC, "id"))),
                dtoFactory::toInfo
        )
    }

    @Transactional
    fun getFlow(flowId: Long): FlowInfo {
        return flowDao.findById(flowId)
                .map(dtoFactory::toInfo)
                .orElseThrow { FlowNotFound() }
    }

    @Transactional
    fun deleteFlow(flowId: Long): Long {
        if (flowDao.existsById(flowId)) {
            resultService.removeFlowFromScheduler(flowId)
            flowDao.deleteById(flowId)
        } else {
            throw FlowNotFound()
        }

        return flowId
    }
}
