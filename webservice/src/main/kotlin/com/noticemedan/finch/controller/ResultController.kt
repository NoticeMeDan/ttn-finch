package com.noticemedan.finch.controller

import com.noticemedan.finch.dto.ResultDescription
import com.noticemedan.finch.service.ResultService
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("result")
class ResultController(private val resultService: ResultService) {
    @GetMapping(value = ["/description"], produces = [MediaType.APPLICATION_JSON_VALUE])
    fun getResultDescriptions(): List<ResultDescription> {
        return resultService.getResultDescriptions()
    }
}
