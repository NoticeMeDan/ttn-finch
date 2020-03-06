package com.noticemedan.finch.dto.ttn

import com.fasterxml.jackson.annotation.JsonProperty
import java.time.LocalDateTime

data class RxMetadataInfo (
		@JsonProperty("gateway_ids") val gatewayIds: GatewayIdInfo,
		@JsonProperty("time") val time: LocalDateTime,
		@JsonProperty("timestamp") val timestamp: Long,
		@JsonProperty("uplink_token") val uplinkToken: String
)
