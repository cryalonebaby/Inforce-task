import React from 'react'
import Box from '@mui/material/Box'
import Form from '../components/Form'
import {useParams} from 'react-router-dom'
import { useSelector } from 'react-redux'

const EditPage = () => {
  const {id} = useParams()

  const {heroes} = useSelector(state => state.heroes)

  const currentHero = heroes.items.find(item => item._id === id)

  return (
    <Box 
      display={'flex'} 
      justifyContent={'center'} 
      minWidth={350}
    >
      <Form editHero={currentHero}/>
    </Box>
  )
}

export default EditPage