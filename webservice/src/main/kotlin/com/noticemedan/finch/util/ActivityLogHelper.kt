package com.noticemedan.finch.util

import com.noticemedan.finch.dao.ActivityLogLineDao
import com.noticemedan.finch.entity.ActivityLogLine
import com.noticemedan.finch.entity.Flow
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Propagation
import org.springframework.transaction.annotation.Transactional
import java.time.Instant

@Component
class ActivityLogHelper(private val activityLogLineDao: ActivityLogLineDao) {
    @Transactional(propagation = Propagation.MANDATORY)
    fun addLogLineToFlow(message: String, flow: Flow) {
        if (flow.activityLogEnabled) activityLogLineDao.save(ActivityLogLine(message, Instant.now(), flow))
    }
}
