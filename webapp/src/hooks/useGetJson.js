import { useState, useEffect } from 'react'
import { getJSON } from '@acto/ajax'

export default function useGetJson (url, deps = []) {
    const [data, setData] = useState({
        res: null,
        loading: true,
        error: null
    })

    useEffect(() => {
        getJSON(url)
            .notFound(() => { setData({ res: null, loading: false, error: 404 }) })
            .forbidden(() => { setData({ res: null, loading: false, error: 403 }) })
            .json(data => { setData({ res: data, loading: false, error: null }) })
            .catch(err => { setData({ res: null, loading: false, error: err }) })
    }, deps)

    return [data.res, data.loading, data.error]
}
