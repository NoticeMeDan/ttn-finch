package com.noticemedan.finch.dto

import java.math.BigInteger

data class Slice<T>(
        val totalPages: BigInteger,
        val pageData: List<T>
)
