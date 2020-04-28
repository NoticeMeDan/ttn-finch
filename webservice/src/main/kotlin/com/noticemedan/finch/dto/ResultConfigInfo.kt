package com.noticemedan.finch.dto

import com.fasterxml.jackson.databind.JsonNode

data class ResultConfigInfo(
        var kind: ResultKind,
        var config: JsonNode,
        var id: Long? = null
)
