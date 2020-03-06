package com.noticemedan.finch.entity

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
data class Flow (
		var name: String,
		var applicationId: String,
		@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
		var id: Long? = null
)
