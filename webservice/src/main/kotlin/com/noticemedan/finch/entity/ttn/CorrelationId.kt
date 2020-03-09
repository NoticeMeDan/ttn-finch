package com.noticemedan.finch.entity.ttn

import javax.persistence.*

@Entity
data class CorrelationId (
		val correlation: String,
		@ManyToOne(fetch = FetchType.LAZY) var eventData: EventData,
		@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
		var id: Long? = null
)
