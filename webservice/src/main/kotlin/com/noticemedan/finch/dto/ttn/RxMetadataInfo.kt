package com.noticemedan.finch.dto.ttn

import com.fasterxml.jackson.annotation.JsonProperty
import java.time.Instant

data class RxMetadataInfo(
        @JsonProperty("gateway_ids") val gatewayIds: GatewayIdInfo,
        @JsonProperty("time") val time: Instant,
        @JsonProperty("timestamp") val timestamp: Long,
        @JsonProperty("uplink_token") val uplinkToken: String
)
