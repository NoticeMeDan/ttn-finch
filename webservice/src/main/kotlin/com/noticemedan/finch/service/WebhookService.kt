package com.noticemedan.finch.service

import com.noticemedan.finch.dao.EventDataDao
import com.noticemedan.finch.dao.FlowDao
import com.noticemedan.finch.dto.ttn.EventDataInfo
import com.noticemedan.finch.entity.QFlow
import com.noticemedan.finch.entity.ttn.CorrelationId
import com.noticemedan.finch.entity.ttn.EventData
import com.noticemedan.finch.entity.ttn.RxMetadata
import com.noticemedan.finch.exception.ApplicationNotPartOfFlow
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class WebhookService (
		private val eventDataDao: EventDataDao,
		private val flowDao: FlowDao
) {
	@Transactional
	fun addEventData (data: EventDataInfo) {
		val flowQuery = QFlow.flow.applicationId.eq(data.endDeviceIds.applicationIds.applicationId)
		if (!flowDao.exists(flowQuery)) throw ApplicationNotPartOfFlow()

		val event = eventDataDao.save(EventData(
				data.endDeviceIds.deviceId,
				data.endDeviceIds.applicationIds.applicationId,
				data.endDeviceIds.deviceAddress,
				listOf(),
				data.receivedAt,
				data.uplinkMessage.fPort,
				data.uplinkMessage.frameCount,
				data.uplinkMessage.framePayload,
				listOf(),
				data.uplinkMessage.settings.dataRate.lora.bandwidth,
				data.uplinkMessage.settings.dataRate.lora.spreadingFactor,
				data.uplinkMessage.settings.codingRate,
				data.uplinkMessage.settings.frequency,
				data.uplinkMessage.settings.timestamp,
				data.uplinkMessage.settings.time,
				data.uplinkMessage.receivedAt
		))

		event.correlationIds = data.correlationIds.map { x -> CorrelationId(x, event) }
		event.metadata = data.uplinkMessage.rxMetadata.map { x ->
			RxMetadata(x.gatewayIds.gatewayId, x.time, x.timestamp, x.uplinkToken, event) }

		eventDataDao.save(event)
	}
}
