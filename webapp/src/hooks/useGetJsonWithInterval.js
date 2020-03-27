import { useEffect, useState } from 'react'
import { getJSON } from '@acto/ajax'

export default function useGetJsonWithInterval (url, interval, deps = []) {
    const [data, setData] = useState({
        res: null,
        loading: true,
        error: null
    })

    let controller
    let timeout

    function get () {
        controller = new AbortController()
        getJSON(url, controller)
            .notFound(() => { setData({ res: null, loading: false, error: 404 }) })
            .forbidden(() => { setData({ res: null, loading: false, error: 403 }) })
            .json(data => {
                timeout = window.setTimeout(get, interval)
                setData({ res: data, loading: false, error: null })
            })
            .catch(err => { setData({ res: null, loading: false, error: err }) })
    }

    useEffect(() => {
        get()
        return cleanup
    }, deps)

    function cleanup () {
        controller.abort()
        window.clearTimeout(timeout)
    }

    function forceGet () {
        cleanup()
        get()
    }

    return [data.res, data.loading, data.error, forceGet]
}
