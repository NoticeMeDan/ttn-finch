package com.noticemedan.finch.entity

import com.fasterxml.jackson.databind.JsonNode
import com.noticemedan.finch.dto.ResultKind
import com.vladmihalcea.hibernate.type.json.JsonBinaryType
import org.hibernate.annotations.TypeDef
import java.time.Instant
import javax.persistence.*

@Entity
@TypeDef(
        typeClass = JsonBinaryType::class,
        defaultForType = JsonNode::class
)
data class ResultConfig(
        @Enumerated(EnumType.STRING)
        var kind: ResultKind,
        @Column(columnDefinition = "jsonb")
        var config: JsonNode,
        @OneToOne
        @JoinColumn(name = "flow_id")
        var flow: Flow? = null,
        var lastRun: Instant,
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long? = null
)
