package com.noticemedan.finch.controller

import com.noticemedan.finch.dto.ttn.EventDataInfo
import com.noticemedan.finch.service.WebhookService
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("webhook")
class WebhookController (private val webhookService: WebhookService) {
	@PostMapping(consumes = [MediaType.APPLICATION_JSON_VALUE])
	fun createMessage (@RequestBody event: EventDataInfo): String {
		webhookService.addEventData(event)
		return "Ok."
	}
}
