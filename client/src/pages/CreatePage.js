import React from 'react'
import Box from '@mui/material/Box'
import Form from '../components/Form'

const CreatePage = () => {
  return (
    <Box 
      display={'flex'} 
      justifyContent={'center'} 
      minWidth={350}
    >
      <Form/>
    </Box>
  )
}

export default CreatePage