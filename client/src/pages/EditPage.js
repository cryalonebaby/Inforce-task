import React, {useEffect} from 'react'
import Box from '@mui/material/Box'
import Form from '../components/Form'
import {useParams, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

const EditPage = () => {
  const {id} = useParams()

  const navigate = useNavigate()

  const {heroes} = useSelector(state => state.heroes)

  const currentHero = heroes.items.find(item => item._id === id)

  useEffect(() => {
    if(!currentHero) {
      navigate('/')
    }
  }, [])

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