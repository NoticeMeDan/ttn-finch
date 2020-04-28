package com.noticemedan.finch.entity.ttn

import java.time.Instant
import javax.persistence.*

@Entity
data class RxMetadata(
        var gatewayId: String,
        var time: Instant,
        var timestamp: Long,
        var uplinkToken: String,
        @ManyToOne(fetch = FetchType.LAZY) var eventData: EventData,
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long? = null
)
