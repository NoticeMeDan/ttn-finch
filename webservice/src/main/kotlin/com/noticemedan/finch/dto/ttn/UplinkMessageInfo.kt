package com.noticemedan.finch.dto.ttn

import com.fasterxml.jackson.annotation.JsonProperty
import java.time.LocalDateTime

data class UplinkMessageInfo (
		@JsonProperty("f_port") val fPort: Int,
		@JsonProperty("f_cnt") val frameCount: Int,
		@JsonProperty("frm_payload") val framePayload: String,
		@JsonProperty("rx_metadata") val rxMetadata: List<RxMetadataInfo>,
		@JsonProperty("settings") val settings: SettingsInfo,
		@JsonProperty("received_at") val receivedAt: LocalDateTime
)
