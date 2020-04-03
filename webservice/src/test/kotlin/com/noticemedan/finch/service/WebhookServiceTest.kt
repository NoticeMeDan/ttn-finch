package com.noticemedan.finch.service

import com.noticemedan.finch.TestConfig
import com.noticemedan.finch.dto.FlowInfo
import com.noticemedan.finch.dto.ResultConfigInfo
import com.noticemedan.finch.dto.ResultKind
import com.noticemedan.finch.dto.ttn.*
import com.noticemedan.finch.exception.ApplicationNotPartOfFlow
import com.vladmihalcea.hibernate.type.json.internal.JacksonUtil
import org.junit.Test
import org.junit.jupiter.api.assertDoesNotThrow
import org.junit.jupiter.api.assertThrows
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit4.SpringRunner
import java.time.Instant

@RunWith(SpringRunner::class)
@SpringBootTest(classes = [TestConfig::class])
class WebhookServiceTest {
	@Autowired
	private lateinit var webhookService: WebhookService

	@Autowired
	private lateinit var flowService: FlowService

	@Test
	fun addEventData () {
		val receivedAt = Instant.now()

		val event = EventDataInfo(
			EndDeviceIdInfo(
				"devId",
				ApplicationIdInfo("appId"),
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

		assertThrows<ApplicationNotPartOfFlow> { webhookService.addEventData(event) }

        val resultConfig = ResultConfigInfo(ResultKind.CSV_TO_DISK, JacksonUtil.toJsonNode("{\"fileName\": \"Hej\"}"))
        flowService.createFlow(FlowInfo("My flow", "appId", "1 * * * * *", resultConfig))

		assertDoesNotThrow { webhookService.addEventData(event) }
	}
}
