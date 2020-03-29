package com.noticemedan.finch.dto

import com.fasterxml.jackson.databind.JsonNode

data class ResultDescription (
        val kind: ResultKind,
        val name: String,
        val description: String,
        val schema: JsonNode
)
