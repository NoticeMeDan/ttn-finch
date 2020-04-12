package com.noticemedan.finch.result

import com.fasterxml.jackson.databind.ObjectMapper
import com.noticemedan.finch.dao.EventDataDao
import com.noticemedan.finch.dao.FlowDao
import com.noticemedan.finch.dto.ResultDescription
import com.noticemedan.finch.dto.ResultKind
import com.noticemedan.finch.entity.Flow
import com.noticemedan.finch.entity.ttn.QEventData
import com.noticemedan.finch.exception.FlowNotFound
import com.noticemedan.finch.result.schema.HttpSchema
import com.noticemedan.finch.util.ActivityLogHelper
import com.noticemedan.finch.util.DtoFactory
import com.noticemedan.finch.util.JsonSchemaUtil
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Propagation
import org.springframework.transaction.annotation.Transactional
import java.time.Instant

@Component
class HttpResult(
        private val flowDao: FlowDao,
        private val eventDataDao: EventDataDao,
        private val dtoFactory: DtoFactory,
        private val activityLogHelper: ActivityLogHelper,
        private val objectMapper: ObjectMapper,
        private val httpClient: OkHttpClient
) : Result {

    @Transactional
    override fun run(flowId: Long) {
        val flow = flowDao.findById(flowId).orElseThrow { FlowNotFound() }

        val config = objectMapper.treeToValue(flow.resultConfig!!.config, HttpSchema::class.java)

        activityLogHelper.addLogLineToFlow("Running HTTP result with size ${config.size}", flow)
        sendEvents(flow, config)
        activityLogHelper.addLogLineToFlow("HTTP result finished", flow)
    }

    @Transactional(propagation = Propagation.MANDATORY)
    fun sendEvents (flow: Flow, config: HttpSchema) {
        val startedRunAt = Instant.now()

        val query = QEventData.eventData.applicationId.eq(flow.applicationId).and(
                QEventData.eventData.receivedAt.after(flow.resultConfig!!.lastRun))
        val events = eventDataDao.findAll(query).toList()

        if (events.isEmpty()) {
            activityLogHelper.addLogLineToFlow("There are no new EventData, halting result", flow)
            return
        }

        events.map(dtoFactory::toInfo).chunked(config.size).forEach {
            val body = objectMapper.writeValueAsString(it)
            val request = Request.Builder()
                    .url(config.url)
                    .post(body.toRequestBody("application/json".toMediaType()))
                    .build()

            httpClient.newCall(request).execute().use { res ->
                if (!res.isSuccessful)
                    activityLogHelper.addLogLineToFlow("POST request failed with status code ${res.code}", flow)
            }
        }

        flow.resultConfig!!.lastRun = startedRunAt
        flowDao.save(flow)
    }

    override fun getDescription(): ResultDescription {
        return ResultDescription(
                ResultKind.HTTP,
                "HTTP Forward",
                "POSTs data to a remote HTTP resource",
                JsonSchemaUtil.getJsonSchema(HttpSchema::class)
        )
    }
}
