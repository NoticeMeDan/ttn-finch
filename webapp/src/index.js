import React from 'react'
import ReactDom from 'react-dom'

import App from './App'

if (process.env.NODE_ENV === 'development') {
	require('whatwg-fetch')
}

const render = Component => {
    ReactDom.render(
        <Component />,
        document.querySelector('#react-hook')
    )
}

render(App)
