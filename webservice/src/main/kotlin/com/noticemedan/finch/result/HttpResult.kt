package com.noticemedan.finch.result

import com.fasterxml.jackson.databind.ObjectMapper
import com.noticemedan.finch.dao.EventDataDao
import com.noticemedan.finch.dao.FlowDao
import com.noticemedan.finch.dto.ResultDescription
import com.noticemedan.finch.dto.ResultKind
import com.noticemedan.finch.entity.Flow
import com.noticemedan.finch.entity.ttn.EventData
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

@Component
class HttpResult(
        flowDao: FlowDao,
        eventDataDao: EventDataDao,
        private val dtoFactory: DtoFactory,
        private val activityLogHelper: ActivityLogHelper,
        private val objectMapper: ObjectMapper,
        private val httpClient: OkHttpClient
) : Result<HttpSchema>(flowDao, eventDataDao, activityLogHelper, objectMapper, HttpSchema::class) {
    @Transactional(propagation = Propagation.MANDATORY)
    override fun process (flow: Flow, config: HttpSchema, eventData: Set<EventData>) {
        eventData.map(dtoFactory::toInfo).chunked(config.size).forEach {
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
    }

    override fun getDescription(): ResultDescription {
        return ResultDescription(
                ResultKind.HTTP,
                "HTTP Forward",
                "POSTs data to a remote HTTP resource",
                JsonSchemaUtil.generateJsonSchema(HttpSchema::class)
        )
    }
}
