package com.noticemedan.finch.config

import okhttp3.OkHttpClient
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class OkHttpClientBean {
    @Bean
    fun okHttpClient (): OkHttpClient = OkHttpClient()
}
