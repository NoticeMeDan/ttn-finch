import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import pajarito from '../../../svg/Pajarito.svg'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
    row: {
        width: '100%'
    },
    logo: {
        height: 300,
        margin: 16
    }
}))

function EmptyState () {
    const classes = useStyles()

    return (
        <Grid container justify='center' alignItems='center' className={classes.row}>
            <Grid item>
                <Grid container direction='column' justify='center' alignItems='center'>
                    <Grid item>
                        <img src={pajarito} className={classes.logo} alt='empty-state-img' />
                    </Grid>
                    <Grid item>
                        <Typography variant='h2'>No Flows Found...</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='subtitle1'>Try to add a flow by clicking the <Link href='/newflow'><Button id='empty-state-button' variant='contained' color='primary' size='small'>CREATE NEW FLOW</Button></Link> button in the top right corner.</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default EmptyState
