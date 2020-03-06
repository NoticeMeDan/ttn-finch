package com.noticemedan.finch.entity

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity
data class Flow (
		var applicationId: String,
		@Id @GeneratedValue var id: Int? = null
)
