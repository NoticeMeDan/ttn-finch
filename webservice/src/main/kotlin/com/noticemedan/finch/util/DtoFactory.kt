package com.noticemedan.finch.util

import com.noticemedan.finch.dto.ActivityLogLineInfo
import com.noticemedan.finch.dto.FlowInfo
import com.noticemedan.finch.dto.ResultConfigInfo
import com.noticemedan.finch.dto.ttn.*
import com.noticemedan.finch.entity.ActivityLogLine
import com.noticemedan.finch.entity.Flow
import com.noticemedan.finch.entity.ResultConfig
import com.noticemedan.finch.entity.ttn.EventData
import org.springframework.stereotype.Component

@Component
object DtoFactory {
	fun toInfo (source: Flow): FlowInfo =
            FlowInfo(
                source.name,
                source.applicationId,
                source.schedule,
                source.resultConfig?.let(::toInfo),
                source.activityLogEnabled,
                source.id)

	fun toInfo (source: ActivityLogLine): ActivityLogLineInfo =
            ActivityLogLineInfo(source.message, source.time.epochSecond)

    fun toInfo (source: ResultConfig): ResultConfigInfo =
            ResultConfigInfo(source.kind, source.config, source.id)

    fun toInfo (source: EventData): EventDataInfo =
            EventDataInfo(
                    EndDeviceIdInfo(source.deviceId, ApplicationIdInfo(source.applicationId), source.deviceAddress),
                    source.correlationIds.map { it.correlation },
                    source.receivedAt,
                    UplinkMessageInfo(
                            source.fPort,
                            source.frameCount,
                            source.framePayload,
                            source.metadata.map { RxMetadataInfo(GatewayIdInfo(
                                    it.gatewayId),
                                    it.time,
                                    it.timestamp,
                                    it.uplinkToken
                            ) },
                            SettingsInfo(
                                    DataRateInfo(LoraInfo(source.settingsBandwidth, source.settingsSpreadingFactor)),
                                    source.settingsCodingRate,
                                    source.settingsFrequency,
                                    source.settingsTimestamp,
                                    source.settingsTime
                            ),
                            source.receivedAt
                    )
            )
}
