package com.noticemedan.finch.dto.ttn

import com.fasterxml.jackson.annotation.JsonProperty

data class DataRateInfo(@JsonProperty("lora") val lora: LoraInfo)
