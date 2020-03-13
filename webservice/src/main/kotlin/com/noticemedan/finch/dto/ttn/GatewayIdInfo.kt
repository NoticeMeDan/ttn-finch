package com.noticemedan.finch.dto.ttn

import com.fasterxml.jackson.annotation.JsonProperty

data class GatewayIdInfo (@JsonProperty("gateway_id") val gatewayId: String )
