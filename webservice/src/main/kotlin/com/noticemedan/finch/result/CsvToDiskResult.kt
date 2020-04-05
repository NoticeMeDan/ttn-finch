package com.noticemedan.finch.result

import com.noticemedan.finch.dto.ResultDescription
import com.noticemedan.finch.dto.ResultKind
import com.noticemedan.finch.entity.Flow
import com.noticemedan.finch.result.schema.CsvToDiskSchema
import com.noticemedan.finch.util.JsonSchemaUtil
import org.springframework.stereotype.Component

@Component
class CsvToDiskResult : Result {
    override fun run(flow: Flow) {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun getDescription(): ResultDescription {
        return ResultDescription(
                ResultKind.CSV_TO_DISK,
                "To Disk as CSV",
                "Writes device name, time and data to a CSV file",
                JsonSchemaUtil.getJsonSchema(CsvToDiskSchema::class)
        )
    }
}
