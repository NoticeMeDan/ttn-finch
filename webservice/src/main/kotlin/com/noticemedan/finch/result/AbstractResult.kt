package com.noticemedan.finch.result

import com.noticemedan.finch.util.ActivityLogHelper

abstract class AbstractResult (
	val logger: ActivityLogHelper,
	val flowId: Long
) : Runnable
