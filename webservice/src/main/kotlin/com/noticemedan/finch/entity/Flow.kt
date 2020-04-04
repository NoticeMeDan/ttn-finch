package com.noticemedan.finch.entity

import javax.persistence.*

@Entity
data class Flow (
        var name: String,
        var applicationId: String,
        var schedule: String,
        @OneToOne(mappedBy = "flow", cascade = [CascadeType.ALL], orphanRemoval = true)
        var resultConfig: ResultConfig? = null,
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
		var id: Long? = null
)
