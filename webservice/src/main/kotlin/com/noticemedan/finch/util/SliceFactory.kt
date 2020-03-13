package com.noticemedan.finch.util

import com.noticemedan.finch.dto.Slice
import org.springframework.data.domain.Page

object SliceFactory {
	fun <T,R> toSlice(source: Page<T>, transform: (T) -> R): Slice<R> {
		return Slice(source.totalPages.toBigInteger(), source.map(transform).toList())
	}
}
