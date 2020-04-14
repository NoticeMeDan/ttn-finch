import React from 'react'
import FlowForm from './FlowForm'
import {postJSON} from '@acto/ajax'
import {Typography} from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import {useSnackbar} from 'notistack'
import useGetJson from '../../hooks/useGetJson'
import Loading from '../../components/Loading'
import Divider from '@material-ui/core/Divider'

function NewFlow () {
    const history = useHistory()
    const { enqueueSnackbar } = useSnackbar()

    const [results, loading] = useGetJson('/api/result/description')

    function handleSubmit (values, actions) {
        postJSON('/api/flow', values)
            .json(() => {
                enqueueSnackbar('Flow added', { variant: 'success' })
                new Promise(resolve => setTimeout(resolve, 500)).then(() => history.push('/'))
            })
            .catch(err => {
                if (err.status === 400) {
                    actions.setFieldError('schedule', 'Invalid ResultConfig or Cron Expression!')
                } else if (err.status === 409) {
                    actions.setFieldError('name', 'Name already exist!')
                } else if (err.status === 504) {
                    enqueueSnackbar('Connection error!', { variant: 'error' })
                } else {
                    console.error(err)
                }
            })
            .finally(actions.setSubmitting(false))
    }

    return (
            <div style={{ padding: 16}}>
                <Typography variant='h3' component='h5' color='textPrimary'>
                    CREATE NEW FLOW
                </Typography>
                <Divider />
                {
                    loading
                        ? <Loading />
                        : <FlowForm handleSubmit={handleSubmit} handleCancel={history.goBack} results={results} />
                }
            </div>
        )
}

export default NewFlow
