package com.noticemedan.finch.dao

import com.noticemedan.finch.entity.ActivityLogLine
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.querydsl.QuerydslPredicateExecutor
import org.springframework.transaction.annotation.Propagation
import org.springframework.transaction.annotation.Transactional

@Transactional(propagation = Propagation.MANDATORY)
interface ActivityLogLineDao : JpaRepository<ActivityLogLine, Long>, QuerydslPredicateExecutor<ActivityLogLine>
