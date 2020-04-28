package com.noticemedan.finch.dto.ttn

import com.fasterxml.jackson.annotation.JsonProperty
import java.time.Instant

data class EventDataInfo(
        @JsonProperty("end_device_ids") val endDeviceIds: EndDeviceIdInfo,
        @JsonProperty("correlation_ids") val correlationIds: List<String>,
        @JsonProperty("received_at") val receivedAt: Instant,
        @JsonProperty("uplink_message") val uplinkMessage: UplinkMessageInfo
)
