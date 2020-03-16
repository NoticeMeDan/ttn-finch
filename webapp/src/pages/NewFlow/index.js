import React from 'react'
import LazyLoad from '../../components/LazyLoad'

export default (props) => <LazyLoad component={import('./NewFlow.js')} {...props} />
