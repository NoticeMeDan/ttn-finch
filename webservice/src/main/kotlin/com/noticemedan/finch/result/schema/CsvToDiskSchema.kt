package com.noticemedan.finch.result.schema

import com.github.imifou.jsonschema.module.addon.annotation.JsonSchema

data class CsvToDiskSchema (
        @JsonSchema(
                title = "Filename",
                description = "The identifier to be prepended to the generated files name",
                required = true)
        var fileName: String
)
