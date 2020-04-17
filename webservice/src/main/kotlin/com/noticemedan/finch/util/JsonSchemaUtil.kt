package com.noticemedan.finch.util

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper
import com.github.fge.jsonschema.main.JsonSchemaFactory
import com.github.imifou.jsonschema.module.addon.AddonModule
import com.github.victools.jsonschema.generator.OptionPreset
import com.github.victools.jsonschema.generator.SchemaGenerator
import com.github.victools.jsonschema.generator.SchemaGeneratorConfigBuilder
import com.github.victools.jsonschema.generator.SchemaVersion
import kotlin.reflect.KClass

object JsonSchemaUtil {
    fun <T: Any> generateJsonSchema(clazz: KClass<T>): JsonNode {
        val config = SchemaGeneratorConfigBuilder(ObjectMapper(), SchemaVersion.DRAFT_2019_09, OptionPreset.PLAIN_JSON)
                .with(AddonModule())
                .build()
        val generator = SchemaGenerator(config)

        return generator.generateSchema(clazz.java)
    }

    fun validateJsonSchema(schema: JsonNode, data: JsonNode): Boolean {
        val schemaFactory = JsonSchemaFactory.byDefault()
        val jsonSchema = schemaFactory.getJsonSchema(schema)
        return jsonSchema.validate(data).isSuccess
    }
}
