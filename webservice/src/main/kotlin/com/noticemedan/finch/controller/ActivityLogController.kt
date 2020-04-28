package com.noticemedan.finch.controller

import com.noticemedan.finch.dto.ActivityLogLineInfo
import com.noticemedan.finch.dto.Slice
import com.noticemedan.finch.service.ActivityLogService
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.Instant

@RestController
@RequestMapping("log")
class ActivityLogController(private val activityLogService: ActivityLogService) {
    @GetMapping(value = ["{flowId}/{from:[0-9]+}/{to:[0-9]+}/{page:[0-9]+}"], produces = [MediaType.APPLICATION_JSON_VALUE])
    fun getLogForPeriod(@PathVariable flowId: Long, @PathVariable from: Long, @PathVariable to: Long,
                        @PathVariable page: Int): Slice<ActivityLogLineInfo> {
        return activityLogService.getLogForPeriod(Instant.ofEpochSecond(from), Instant.ofEpochSecond(to), flowId, page)
    }
}
