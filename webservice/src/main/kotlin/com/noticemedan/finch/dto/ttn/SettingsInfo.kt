package com.noticemedan.finch.dto.ttn

import com.fasterxml.jackson.annotation.JsonProperty
import java.time.Instant

data class SettingsInfo (
		@JsonProperty("data_rate") val dataRate: DataRateInfo,
		@JsonProperty("coding_rate") val codingRate: String,
		@JsonProperty("frequency") val frequency: String,
		@JsonProperty("timestamp") val timestamp: Long,
		@JsonProperty("time") val time: Instant
)
