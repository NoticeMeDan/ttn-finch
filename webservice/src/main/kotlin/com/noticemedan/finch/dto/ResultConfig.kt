package com.noticemedan.finch.dto

import com.fasterxml.jackson.databind.JsonNode
import javax.persistence.*

@Entity
data class ResultConfig (
        var kind: ResultKind,
        // var config: JsonNode,
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long? = null
)
