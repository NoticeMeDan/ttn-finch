package com.noticemedan.finch.dao

import com.noticemedan.finch.entity.Flow
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.transaction.annotation.Propagation
import org.springframework.transaction.annotation.Transactional

@Transactional(propagation = Propagation.MANDATORY)
interface FlowDao : JpaRepository<Flow, Int>
