package com.noticemedan.finch.service

import com.noticemedan.finch.TestConfig
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit4.SpringRunner
import org.assertj.core.api.Assertions.assertThat

@RunWith(SpringRunner::class)
@SpringBootTest(classes = [TestConfig::class])
class ResultServiceTest {
    @Autowired
    private lateinit var resultService: ResultService

    @Test
    fun getResultDescriptions () {
        val results = resultService.getResultDescriptions()

        assertThat(results).isNotNull
        assertThat(results.size).isNotEqualTo(0)
    }
}
