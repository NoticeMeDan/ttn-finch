package com.noticemedan.finch.controller

import com.noticemedan.finch.dto.ActivityLogLineInfo
import com.noticemedan.finch.dto.FlowInfo
import com.noticemedan.finch.dto.Slice
import com.noticemedan.finch.service.FlowService
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import java.time.Instant

@RestController
@RequestMapping("flow")
class FlowController (private val flowService: FlowService) {
	@PostMapping(produces = [MediaType.APPLICATION_JSON_VALUE], consumes = [MediaType.APPLICATION_JSON_VALUE])
	fun createFlow (@RequestBody flow: FlowInfo): FlowInfo {
		return flowService.createFlow(flow)
	}

	@GetMapping(produces = [MediaType.APPLICATION_JSON_VALUE])
	fun getAllFlows (): List<FlowInfo> {
		return flowService.getFlows();
	}
}
