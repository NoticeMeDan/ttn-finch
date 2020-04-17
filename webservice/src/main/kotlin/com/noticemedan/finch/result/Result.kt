package com.noticemedan.finch.result

import com.fasterxml.jackson.databind.ObjectMapper
import com.noticemedan.finch.dao.FlowDao
import com.noticemedan.finch.dto.ResultDescription
import com.noticemedan.finch.entity.Flow
import com.noticemedan.finch.exception.FlowNotFound
import com.noticemedan.finch.util.ActivityLogHelper
import javax.transaction.Transactional
import kotlin.reflect.KClass

abstract class Result <T: Any> (
        private val flowDao: FlowDao,
        private val activityLogHelper: ActivityLogHelper,
        private val objectMapper: ObjectMapper,
        private val configClazz: KClass<T>
) {
    @Transactional
    open fun run (flowId: Long) {
        val flow = flowDao.findById(flowId).orElseThrow { FlowNotFound() }

        val config = objectMapper.treeToValue(flow.resultConfig!!.config, configClazz.java)

        activityLogHelper.addLogLineToFlow("Running ${flow?.resultConfig?.kind} result", flow)
        process(flow, config)
        activityLogHelper.addLogLineToFlow("${flow?.resultConfig?.kind} result finished", flow)
    }

    abstract fun process (flow: Flow, config: T)
    abstract fun getDescription(): ResultDescription
}
