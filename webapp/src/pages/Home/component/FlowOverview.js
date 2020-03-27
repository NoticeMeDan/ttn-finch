import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Button } from '@material-ui/core'
import FlowTable from './FlowTable'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    container: {
        padding: 24
    }
})

const FlowOverview = () => {
    const classes = useStyles()

    return (
        <Grid container direction='column' spacing={2} className={classes.container}>
            <Grid container justify='flex-end'>
                <Grid item>
                    <Button variant='contained' color='primary' href='/newflow'>
                        Create New Flow
                    </Button>
                </Grid>
            </Grid>
            <Grid item>
                <FlowTable />
            </Grid>
        </Grid>)
}

export default FlowOverview
