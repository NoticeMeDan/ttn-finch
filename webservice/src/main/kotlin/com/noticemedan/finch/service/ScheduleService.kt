package com.noticemedan.finch.service

import com.noticemedan.finch.result.AbstractResult
import com.noticemedan.finch.result.TestResult
import com.noticemedan.finch.util.ActivityLogHelper
import org.springframework.context.event.ContextRefreshedEvent
import org.springframework.context.event.EventListener
import org.springframework.scheduling.TaskScheduler
import org.springframework.scheduling.support.CronTrigger
import org.springframework.stereotype.Service
import java.util.concurrent.ScheduledFuture

@Service
class ScheduleService (
	private val scheduler: TaskScheduler,
	private val logger: ActivityLogHelper
) {
	private val jobs: MutableMap<Long, ScheduledFuture<*>> = HashMap()

	@EventListener
	fun initializeSchedules (event: ContextRefreshedEvent) {
		println("Oh sheet starting schedules")

		addResultToScheduler(1, TestResult(logger), CronTrigger("* * * * * *"))
	}

	fun addResultToScheduler (id: Long, result: AbstractResult, trigger: CronTrigger) {
		val scheduledTask = scheduler.schedule(result, trigger)
		jobs[1] = scheduledTask!!
	}

	fun removeResultFromScheduler (id: Long) {
		jobs[id]?.let {
			it.cancel(true)
			jobs.remove(id)
		}
	}
}
