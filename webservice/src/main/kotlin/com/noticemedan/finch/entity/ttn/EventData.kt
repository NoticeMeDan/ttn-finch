package com.noticemedan.finch.entity.ttn

import java.time.Instant
import javax.persistence.*

@Entity
data class EventData(
        var deviceId: String,
        var applicationId: String,
        var deviceAddress: String,
        @OneToMany(mappedBy = "eventData", cascade = [CascadeType.ALL], orphanRemoval = true)
        var correlationIds: List<CorrelationId>,
        var receivedAt: Instant,
        var fPort: Long,
        var frameCount: Long,
        var framePayload: String,
        @OneToMany(mappedBy = "eventData", cascade = [CascadeType.ALL], orphanRemoval = true)
        var metadata: List<RxMetadata>,
        var settingsBandwidth: Long,
        var settingsSpreadingFactor: Long,
        var settingsCodingRate: String,
        var settingsFrequency: String,
        var settingsTimestamp: Long,
        var settingsTime: Instant,
        var uplinkReceivedAt: Instant,
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long? = null
)
