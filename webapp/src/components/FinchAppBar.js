import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import logo from '../svg/Cardinal.svg'
import { Link } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginBottom: 8
    },
    title: {
        fontWeight: 'bold'
    },
    logo: {
        height: 80,
        marginRight: 16
    }
}))

function FinchAppBar () {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <AppBar position='static' style={{ backgroundColor: '#f0f0f0' }}>
                <Toolbar variant='regular'>
                    <Link href='/' underline='none' style={{ display: 'flex' }}>
                        <img src={logo} className={classes.logo} alt='logo' />
                        <Grid container direction='column' justify='center'>
                            <Grid item>
                                <Typography display='block' variant='subtitle2' color='textPrimary' className={classes.title}>
                                    THE THINGS
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography display='block' variant='h5' color='textPrimary' className={classes.title}>
                                    F I N C H
                                </Typography>
                            </Grid>
                        </Grid>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default FinchAppBar
