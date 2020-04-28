package com.noticemedan.finch.dto.ttn

import com.fasterxml.jackson.annotation.JsonProperty

data class LoraInfo(
        @JsonProperty("bandwidth") val bandwidth: Long,
        @JsonProperty("spreading_factor") val spreadingFactor: Long
)
