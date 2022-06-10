import { Box, Button,  } from '@mui/material'
import React, {ChangeEvent, useState} from 'react'

import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const [number, setNumber] = useState<string>('')
  // const [randomData, setRandomData] = useState<any[]>([])
  //console.log('asteroid-data',randomData)

  const changeHandler = (event : ChangeEvent<HTMLInputElement>) : void => {
    setNumber(event.target.value)
  }

  const navigation = useNavigate();

  const getRandomAsteroidId = async () => {

  // axios.get('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=Ximney5WB5uZ3i91efKSEIBovbUqLM0QfHqgzfD2').then(
  //     response => console.log(response.data.near_earth_objects)
  // ).then(resp => {
  //     navigation('/random', {
  //         state: resp
  //       })
  // })

      const randomDetails = await axios.get('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=Ximney5WB5uZ3i91efKSEIBovbUqLM0QfHqgzfD2');
      console.log('Random Details ', randomDetails)
      //setRandomData(randomDetails?.data?.near_earth_objects)
      let randomNumber = Math.floor((Math.random() * 20) + 1)
    const asteroidId = randomDetails?.data?.near_earth_objects[randomNumber].id
    console.log('Asteroid Id===>', asteroidId)
    onClickHandle(asteroidId)

    // // // // navigation('/random', {
    // // // //           state: randomDetails.data
    // // // //      })
  }

//   useEffect(() => {
//       getRandomAsteroidId()
//   }, [])


  const onClickHandle = async (asteroidId: string) => {
    const getRandomData =await axios.get(`https://api.nasa.gov/neo/rest/v1/neo/${asteroidId}?api_key=Ximney5WB5uZ3i91efKSEIBovbUqLM0QfHqgzfD2`);
    console.log('gettingradom Details ', getRandomData)
    await navigation('/random', {
            state: getRandomData?.data
      })
  }

  return (
    <Box sx={{display: 'flex', alignItems: "center", justifyContent: 'center', flexDirection: 'column', mt: 15 }}>
      <label htmlFor='number'>Number:</label>
      <input id='number' type='text' 
      value={number} name='number' 
      data-testid='number-input'
      onChange={changeHandler} 
      style={{width: 300}} />
      <Box sx={{mt: 4}}>
      <Button data-testid='number-button'  onClick={() => {onClickHandle(number)}} disabled={number.length < 1} sx={{border: '1px solid black', padding: 1, width: 125, borderRadius: 4, color: 'lightgreen', mr: 2}} title='changeButton'  >Submit</Button>
      <Button onClick={getRandomAsteroidId} sx={{border: '1px solid black', padding: 1, width: 125, borderRadius: 4, color: 'lightskyblue'}} data-testid='random-button'>Random</Button>
      </Box>
    </Box>
  )
}


export default Home
