package com.noticemedan.finch.entity

import java.time.Instant
import javax.persistence.*

@Entity
data class ActivityLogLine(
        var message: String,
        var time: Instant,
        @ManyToOne
        @JoinColumn(name = "flow_id")
        var flow: Flow? = null,
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long? = null
)
