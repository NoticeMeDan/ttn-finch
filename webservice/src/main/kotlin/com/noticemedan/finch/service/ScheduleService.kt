package com.noticemedan.finch.service

import com.noticemedan.finch.dao.FlowDao
import com.noticemedan.finch.entity.Flow
import com.noticemedan.finch.result.TestResult
import com.noticemedan.finch.util.ActivityLogHelper
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.event.ContextRefreshedEvent
import org.springframework.context.event.EventListener
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler
import org.springframework.scheduling.support.CronTrigger
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.concurrent.ScheduledFuture

@Service
class ScheduleService (
	private val scheduler: ThreadPoolTaskScheduler,
	private val flowDao: FlowDao,
	private val testResult: TestResult,
	@Value("\${SCHEDULER_POOL_SIZE:1}") private val poolSize: Int
) {
	private val jobs: MutableMap<Long, ScheduledFuture<*>> = HashMap()

	@EventListener
	@Transactional
	fun initializeSchedules (event: ContextRefreshedEvent) {
		println("Starting scheduler with pool size of ${poolSize}...")

		scheduler.poolSize = poolSize
		flowDao.findAll().forEach { addFlowToScheduler(it) }

		println("Added all flow schedules to scheduler...")
	}

	fun addFlowToScheduler (flow: Flow) {
		val scheduledTask = scheduler.schedule(Runnable { testResult.run(flow.id!!) }, CronTrigger(flow.schedule))
		jobs[flow.id!!] = scheduledTask!!
	}

	fun removeResultFromScheduler (flowId: Long) {
		jobs[flowId]?.let {
			it.cancel(true)
			jobs.remove(flowId)
		}
	}
}
