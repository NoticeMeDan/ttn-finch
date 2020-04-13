package com.noticemedan.finch.result.schema

import com.github.imifou.jsonschema.module.addon.annotation.JsonSchema

data class HttpSchema (
        @JsonSchema(
                title = "URL",
                description = "The URL for the HTTP resource to POST the data to",
                required = true)
        var url: String,
        @JsonSchema(
                title = "Payload size",
                description = "The amount of data packages to send at a time",
                required = true
        )
        var size: Int
)
