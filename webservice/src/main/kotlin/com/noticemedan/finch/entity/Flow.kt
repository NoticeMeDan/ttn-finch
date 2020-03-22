package com.noticemedan.finch.entity

import javax.persistence.*

@Entity
data class Flow (
		var name: String,
		var applicationId: String,
		var schedule: String,
		@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
		var id: Long? = null
)
