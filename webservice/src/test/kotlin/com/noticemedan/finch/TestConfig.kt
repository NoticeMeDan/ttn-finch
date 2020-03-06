package com.noticemedan.finch

import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import

@Configuration
@Import(FinchApplication::class)
class TestConfig
