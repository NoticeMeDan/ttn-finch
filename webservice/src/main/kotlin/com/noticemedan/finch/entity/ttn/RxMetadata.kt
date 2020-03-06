package com.noticemedan.finch.entity.ttn

import java.time.LocalDateTime
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
data class RxMetadata (
	var gatewayId: String,
	var time: LocalDateTime,
	var timestamp: Long,
	var uplinkToken: String,
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	var id: Long? = null
)
