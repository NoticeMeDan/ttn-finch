package com.noticemedan.finch.entity.ttn

import java.time.LocalDateTime
import javax.persistence.*

@Entity
data class RxMetadata (
	var gatewayId: String,
	var time: LocalDateTime,
	var timestamp: Long,
	var uplinkToken: String,
	@ManyToOne(fetch = FetchType.LAZY) var eventData: EventData? = null,
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	var id: Long? = null
)
