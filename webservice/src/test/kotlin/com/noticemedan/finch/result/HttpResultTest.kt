package com.noticemedan.finch.result

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.nhaarman.mockito_kotlin.*
import com.noticemedan.finch.TestConfig
import com.noticemedan.finch.dto.FlowInfo
import com.noticemedan.finch.dto.ResultConfigInfo
import com.noticemedan.finch.dto.ResultKind
import com.noticemedan.finch.dto.ttn.*
import com.noticemedan.finch.service.ActivityLogService
import com.noticemedan.finch.service.FlowService
import com.noticemedan.finch.service.WebhookService
import com.vladmihalcea.hibernate.type.json.internal.JacksonUtil
import okhttp3.*
import okhttp3.RequestBody.Companion.toRequestBody
import okhttp3.ResponseBody.Companion.toResponseBody
import okio.Buffer
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.test.context.junit4.SpringRunner
import java.time.Instant
import org.assertj.core.api.Assertions.*

@RunWith(SpringRunner::class)
@SpringBootTest(classes = [TestConfig::class])
class HttpResultTest {
    @Autowired
    private lateinit var flowService: FlowService

    @Autowired
    private lateinit var webhookService: WebhookService

    @Autowired
    private lateinit var activityLogService: ActivityLogService

    @MockBean
    private lateinit var okHttpClient: OkHttpClient

    @Autowired
    private lateinit var httpResult: HttpResult

    @Autowired
    private lateinit var objectMapper: ObjectMapper

    @Test
    fun haltsWhenNoNewEventData () {
        val config = "{\"url\": \"http://google.com/\", \"size\": 2}"
        val resultConfig = ResultConfigInfo(ResultKind.HTTP, JacksonUtil.toJsonNode(config))
        val flowInfo = FlowInfo("My awesome flow", "my-awesome-app", "1 * * * * *", resultConfig, true)
        val flow = flowService.createFlow(flowInfo)

        verify(okHttpClient, never()).newCall(any()) // Client should never be called when there are no new eventdata

        httpResult.run(flow.id!!)

        val logs = activityLogService.getLogForPeriod(Instant.EPOCH, Instant.now(), flow.id!!, 0)

        assertThat(logs.pageData.size).isEqualTo(4)
        assertThat(logs.pageData.size).isEqualTo(4)
        assertThat(logs.pageData).anyMatch { it.message == "Flow created" }
        assertThat(logs.pageData).anyMatch { it.message == "Running HTTP result with size 2" }
        assertThat(logs.pageData).anyMatch { it.message == "There are no new EventData, halting result" }
        assertThat(logs.pageData).anyMatch { it.message == "HTTP result finished" }
    }

    @Test
    fun writesLogEntryWhenReceivingNon200StatusCode () {
        val config = "{\"url\": \"http://google.com/\", \"size\": 2}"
        val resultConfig = ResultConfigInfo(ResultKind.HTTP, JacksonUtil.toJsonNode(config))
        val flowInfo = FlowInfo("My awesome flow 2", "my-cool-app", "1 * * * * *", resultConfig, true)
        val flow = flowService.createFlow(flowInfo)

        val receivedAt = Instant.now()
        val event = EventDataInfo(
                EndDeviceIdInfo(
                        "devId",
                        ApplicationIdInfo("my-cool-app"),
                        "devAddr"
                ),
                listOf("correlation"),
                receivedAt,
                UplinkMessageInfo(
                        1L,
                        1L,
                        "payload",
                        listOf(RxMetadataInfo(
                                GatewayIdInfo("gatewayId"),
                                receivedAt,
                                1L,
                                "token"
                        )),
                        SettingsInfo(
                                DataRateInfo(LoraInfo(1L, 1L)),
                                "codingrate",
                                "freq",
                                1L,
                                receivedAt
                        ),
                        receivedAt
                )
        )

        webhookService.addEventData(event)

        val callMock = mock<Call> {
            whenever(it.execute()).thenReturn(Response.Builder()
                    .protocol(Protocol.HTTP_2)
                    .message("This is a message")
                    .request(Request.Builder()
                            .url("http://google.com")
                            .method("POST", "{\"iAm\": \"JSON\"}".toRequestBody())
                            .build())
                    .body("{\"thisIs\": \"aResponse\"}".toResponseBody())
                    .code(401).build())
        }

        whenever(okHttpClient.newCall(any())).thenReturn(callMock)

        httpResult.run(flow.id!!)

        val logs = activityLogService.getLogForPeriod(Instant.EPOCH, Instant.now(), flow.id!!, 0)

        assertThat(logs.pageData.size).isEqualTo(4)
        assertThat(logs.pageData).anyMatch { it.message == "Flow created" }
        assertThat(logs.pageData).anyMatch { it.message == "Running HTTP result with size 2" }
        assertThat(logs.pageData).anyMatch { it.message == "POST request failed with status code 401" }
        assertThat(logs.pageData).anyMatch { it.message == "HTTP result finished" }
        verify(okHttpClient, times(1)).newCall(any())
    }

    @Test
    fun chunksRequestsCorrectly () {
        val config = "{\"url\": \"http://google.com/\", \"size\": 2}"
        val resultConfig = ResultConfigInfo(ResultKind.HTTP, JacksonUtil.toJsonNode(config))
        val flowInfo = FlowInfo("My awesome flow 3", "my-dope-app", "1 * * * * *", resultConfig, true)
        val flow = flowService.createFlow(flowInfo)

        val receivedAt = Instant.now()
        val event = EventDataInfo(
                EndDeviceIdInfo(
                        "devId",
                        ApplicationIdInfo("my-dope-app"),
                        "devAddr"
                ),
                listOf("correlation"),
                receivedAt,
                UplinkMessageInfo(
                        1L,
                        1L,
                        "payload",
                        listOf(RxMetadataInfo(
                                GatewayIdInfo("gatewayId"),
                                receivedAt,
                                1L,
                                "token"
                        )),
                        SettingsInfo(
                                DataRateInfo(LoraInfo(1L, 1L)),
                                "codingrate",
                                "freq",
                                1L,
                                receivedAt
                        ),
                        receivedAt
                )
        )

        webhookService.addEventData(event)
        webhookService.addEventData(event)
        webhookService.addEventData(event)

        val callMock = mock<Call> {
            whenever(it.execute()).thenReturn(Response.Builder()
                    .protocol(Protocol.HTTP_2)
                    .message("This is a message")
                    .request(Request.Builder()
                            .url("http://google.com")
                            .method("POST", "{\"iAm\": \"JSON\"}".toRequestBody())
                            .build())
                    .body("{\"thisIs\": \"aResponse\"}".toResponseBody())
                    .code(401).build())
        }

        whenever(okHttpClient.newCall(any())).thenReturn(callMock)

        httpResult.run(flow.id!!)

        argumentCaptor<Request>().apply {
            verify(okHttpClient, times(2)).newCall(capture())

            assertThat(allValues.size).isEqualTo(2)

            val firstReqBody = objectMapper.readValue<Array<EventDataInfo>>(requestBodyToString(firstValue.body!!))
            val secondReqBody = objectMapper.readValue<Array<EventDataInfo>>(requestBodyToString(secondValue.body!!))

            assertThat(firstReqBody.size).isEqualTo(2)
            assertThat(secondReqBody.size).isEqualTo(1)
        }
    }

    companion object {
        private fun requestBodyToString(body: RequestBody): String {
            val buffer = Buffer()
            body.writeTo(buffer)
            return buffer.readUtf8()
        }
    }
}
