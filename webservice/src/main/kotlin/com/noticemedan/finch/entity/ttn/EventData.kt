package com.noticemedan.finch.entity.ttn

import java.time.LocalDateTime
import javax.persistence.*

@Entity
data class EventData (
		var deviceId: String,
		var applicationId: String,
		var deviceAddress: String,
		@OneToMany(cascade = [CascadeType.REMOVE], orphanRemoval = true)
		var correlationIds: List<CorrelationId>,
		var receivedAt: LocalDateTime,
		var fPort: Int,
		var frameCount: Int,
		var framePayload: String,
		@OneToMany(cascade = [CascadeType.REMOVE], orphanRemoval = true)
		var metadata: List<RxMetadata>,
		var settingsBandWidth: Long,
		var settingsSpreadingFactor: Int,
		var settingsCodingRate: String,
		var settingsFrequency: String,
		var settingsTimestamp: Long,
		var settingsTime: LocalDateTime,
		var uplinkReceivedAt: LocalDateTime,
		@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
		var id: Long? = null
)
