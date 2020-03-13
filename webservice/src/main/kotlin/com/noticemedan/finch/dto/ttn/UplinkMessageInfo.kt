package com.noticemedan.finch.dto.ttn

import com.fasterxml.jackson.annotation.JsonProperty
import java.time.Instant

data class UplinkMessageInfo (
		@JsonProperty("f_port") val fPort: Long,
		@JsonProperty("f_cnt") val frameCount: Long,
		@JsonProperty("frm_payload") val framePayload: String,
		@JsonProperty("rx_metadata") val rxMetadata: List<RxMetadataInfo>,
		@JsonProperty("settings") val settings: SettingsInfo,
		@JsonProperty("received_at") val receivedAt: Instant
)
