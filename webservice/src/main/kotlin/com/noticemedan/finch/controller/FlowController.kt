package com.noticemedan.finch.controller

import com.noticemedan.finch.dto.FlowInfo
import com.noticemedan.finch.service.FlowService
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("flow")
class FlowController (private val flowService: FlowService) {
	@PostMapping(produces = [MediaType.APPLICATION_JSON_VALUE], consumes = [MediaType.APPLICATION_JSON_VALUE])
	fun createFlow (@RequestBody flow: FlowInfo): FlowInfo {
		return flowService.createFlow(flow)
	}
}
