package com.noticemedan.finch.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(HttpStatus.FORBIDDEN)
class ApplicationNotPartOfFlow : RuntimeException()
