package com.noticemedan.finch.controller

import com.fasterxml.jackson.databind.JsonNode
import com.noticemedan.finch.dto.ResultDescription
import com.noticemedan.finch.dto.ResultKind
import com.noticemedan.finch.service.ResultService
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("result")
class ResultController (private val resultService: ResultService) {
	@GetMapping(value= ["/description"], produces = [MediaType.APPLICATION_JSON_VALUE])
	fun getResultDescriptions (): List<ResultDescription> {
		return resultService.getResultDescriptions()
	}

    @PostMapping(value = ["/validate/{kind}"], consumes = [MediaType.APPLICATION_JSON_VALUE])
    fun validate (@PathVariable kind: ResultKind, @RequestBody data: JsonNode): Boolean {
        return resultService.validateResultConfig(kind, data)
    }
}
