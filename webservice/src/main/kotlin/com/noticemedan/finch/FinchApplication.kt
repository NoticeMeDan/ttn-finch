package com.noticemedan.finch

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class FinchApplication {}

fun main(args: Array<String>) {
	runApplication<FinchApplication>(*args)
}
