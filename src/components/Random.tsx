import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

const Random = () => {
    const randomDetails: any = useLocation()
    console.log('random-data====>>>>>>>',randomDetails)

    const navigation = useNavigate();

    const onClickBack = () => {
        navigation('/')
    }

  return (
    <Box sx={{display: 'flex', alignItems: "center", justifyContent: 'center', flexDirection: 'column', mt: 15 }}>
        <Typography variant='h5' sx={{fontFamily: 'sansSerif', color: 'lightblue', fontSize: 22, mt: 1}}>{randomDetails?.state?.name}</Typography>
        <Typography variant='h5' sx={{fontFamily: 'sansSerif', color: 'rgb(24, 24, 24)', fontSize: 22, mt: 1}}>{randomDetails?.state?.nasa_jpl_url}</Typography>
        <Typography variant='h5' sx={{fontFamily: 'sansSerif', color: 'lightgreen', fontSize: 22, mt: 1}}>{randomDetails?.state?.is_potentially_hazardous_asteroid.toString()}</Typography>
        <Button onClick={onClickBack} sx={{border: '1px solid black', padding: 1, width: 125, borderRadius: 4, color: 'lightskyblue',mt: 2}}>Back</Button>
    </Box>
  )
}

export default Random
