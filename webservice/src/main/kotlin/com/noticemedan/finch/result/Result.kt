package com.noticemedan.finch.result

import com.fasterxml.jackson.databind.ObjectMapper
import com.noticemedan.finch.dao.EventDataDao
import com.noticemedan.finch.dao.FlowDao
import com.noticemedan.finch.dto.ResultDescription
import com.noticemedan.finch.entity.Flow
import com.noticemedan.finch.entity.ttn.EventData
import com.noticemedan.finch.entity.ttn.QEventData
import com.noticemedan.finch.exception.FlowNotFound
import com.noticemedan.finch.util.ActivityLogHelper
import java.time.Instant
import javax.transaction.Transactional
import kotlin.reflect.KClass

abstract class Result <T: Any> (
        private val flowDao: FlowDao,
        private val eventDataDao: EventDataDao,
        private val activityLogHelper: ActivityLogHelper,
        private val objectMapper: ObjectMapper,
        private val schemaClass: KClass<T>
) {
    @Transactional
    open fun run (flowId: Long) {
        val flow = flowDao.findById(flowId).orElseThrow { FlowNotFound() }

        val config = objectMapper.treeToValue(flow.resultConfig!!.config, schemaClass.java)

        activityLogHelper.addLogLineToFlow("Running ${flow?.resultConfig?.kind} result", flow)

        val query = QEventData.eventData.applicationId.eq(flow.applicationId).and(
                QEventData.eventData.receivedAt.after(flow.resultConfig!!.lastRun))
        val eventData = eventDataDao.findAll(query).toSet()

        val startedRunAt = Instant.now()

        if (eventData.isEmpty()) {
            activityLogHelper.addLogLineToFlow("There are no new EventData, halting result", flow)
        } else process(flow, config, eventData)

        activityLogHelper.addLogLineToFlow("${flow?.resultConfig?.kind} result finished", flow)

        flow.resultConfig!!.lastRun = startedRunAt
        flowDao.save(flow)
    }

    abstract fun getDescription(): ResultDescription
    abstract fun process (flow: Flow, config: T, eventData: Set<EventData>)
}
