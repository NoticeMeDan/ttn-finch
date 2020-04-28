package com.noticemedan.finch.dto.ttn

import com.fasterxml.jackson.annotation.JsonProperty

data class EndDeviceIdInfo(
        @JsonProperty("device_id") val deviceId: String,
        @JsonProperty("application_ids") val applicationIds: ApplicationIdInfo,
        @JsonProperty("dev_addr") val deviceAddress: String
)
