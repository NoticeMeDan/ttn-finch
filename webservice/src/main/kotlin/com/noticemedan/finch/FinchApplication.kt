package com.noticemedan.finch

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.scheduling.annotation.EnableScheduling

@SpringBootApplication
@EnableScheduling
class FinchApplication

fun main(args: Array<String>) {
    runApplication<FinchApplication>(*args)
}
