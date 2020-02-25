package com.noticemedan.finch.controller

import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("webhook")
class WebhookController {
	@PostMapping
	fun createMessage (@RequestBody message: String): String {
		println("Received message: $message")
		return "Ok."
	}

	@GetMapping
	fun hello (): String {
		return "Hello world"
	}
}
