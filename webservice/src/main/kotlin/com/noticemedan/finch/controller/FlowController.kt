package com.noticemedan.finch.controller

import com.noticemedan.finch.dto.FlowInfo
import com.noticemedan.finch.dto.Slice
import com.noticemedan.finch.service.FlowService
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("flow")
class FlowController(private val flowService: FlowService) {
    @PostMapping(produces = [MediaType.APPLICATION_JSON_VALUE], consumes = [MediaType.APPLICATION_JSON_VALUE])
    fun createFlow(@RequestBody flow: FlowInfo): FlowInfo {
        return flowService.createFlow(flow)
    }

    @GetMapping(value = ["all/{page:[0-9]+}"], produces = [MediaType.APPLICATION_JSON_VALUE])
    fun getFlows(@PathVariable page: Int): Slice<FlowInfo> {
        return flowService.getFlows(page)
    }

    @GetMapping(value = ["{flowId}"], produces = [MediaType.APPLICATION_JSON_VALUE])
    fun getFlow(@PathVariable flowId: Long): FlowInfo {
        return flowService.getFlow(flowId)
    }

    @PutMapping(produces = [MediaType.APPLICATION_JSON_VALUE], consumes = [MediaType.APPLICATION_JSON_VALUE])
    fun updateFlow(@RequestBody flow: FlowInfo): FlowInfo {
        return flowService.updateFlow(flow)
    }

    @DeleteMapping("{flowId}")
    fun deleteFlow(@PathVariable flowId: Long): Long {
        return flowService.deleteFlow(flowId)
    }
}
