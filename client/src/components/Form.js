import React, {useRef, useState} from 'react'
import { createHero, updateHero } from '../redux/slices/heroes'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import { styled } from '@mui/system';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {storage} from '../firebase'

const StyledImg = styled('img')(({theme}) => ({
  width: '100%',
  height: '100%',
  [theme.breakpoints.down('md')]: {
    width: '50%',
  }
}))

const StyledGallery = styled(Box)(({theme}) => ({
  display: 'grid',
  width: '800px',
  gridAutoRows: '150px',
  gridTemplateColumns: '1fr',
  gridGap: '10px',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(5, 160px)',
    gridAutoRows: '100px',
  },
}))

const Form = ({editHero}) => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const inputFile = useRef(null)

  const [images, setImages] = useState(editHero ? editHero.images : [])

  const [values, setValues] = useState({
		nickname: editHero ? editHero.nickname : '',
		real_name: editHero ? editHero.real_name : '',
    origin_description: editHero ? editHero.origin_description : '',
    superpowers: editHero ? editHero.superpowers : '',
    catch_phrase: editHero ? editHero.catch_phrase : ''
	})

  const handleInput = (e) => {
    const {name, value} = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleChange = async (e) => {
    const [img] = e.target.files

    // Upload Image to Firebase Storage
    // Random string
    let randomString = (Math.random() + 1).toString(36).substring(7);
    const imgRef = ref(storage, `heroes/${img.name + randomString}`)

    const snapshot = await uploadBytes(imgRef, img)
    const url = await getDownloadURL(snapshot.ref)
    setImages([...images, `${url}`])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(images.length === 0) return
    if(editHero) {
      dispatch(updateHero([{id: editHero._id}, {...values, images}]))
    } else {
      dispatch(createHero({...values, images}))
    }
    navigate('/')
  }

  const handleImagePick = (index) => {
    if(!images[index]) {
      inputFile.current.click()
    } else {
      const link = images[index]
      setImages(images.filter(item => item !== link))
    }
  }

  const pics = []

  for(let i = 1; i < 7; i++) {
    pics.push(
      <Box 
        key={i}
        onClick={() => handleImagePick(i)} 
        sx={{
          backgroundColor: '#EFEFEF',
        }}
      >
        {images[i] ? (
          <StyledImg src={images[i]} alt={i}/>
        ) : (null)}
      </Box>
    )
  }

  return (
    <Container sx={{marginTop: 4, minWidth: 300}}>
      <Box sx={{textAlign: 'center'}}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={12}>
              <Box display='flex' justifyContent={'center'}>
                <StyledGallery>
                  <Box 
                    onClick={() => handleImagePick(0)} 
                    sx={{
                      backgroundColor: '#EFEFEF', 
                      gridRow: {
                        xs: '1/1', 
                        sm: '1/3'
                      }, 
                      gridColumn: {
                        xs: '1/1', 
                        sm: '1/3'
                      },
                    }}
                  >
                    {images[0] ? (
                      <StyledImg src={images[0]} alt={0}/>
                    ) : (null)}
                  </Box>

                  {pics}
                  <input 
                    type={'file'} 
                    onChange={handleChange}
                    ref={inputFile}
                    style={{display: 'none'}}
                  />
                </StyledGallery>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl variant="standard">
                <InputLabel>Name</InputLabel>
                <Input sx={{
                  width: {
                    xs: 200, 
                    sm: 300
                  }}} 
                  required 
                  type='text' 
                  value={values.nickname} 
                  onChange={handleInput} 
                  name='nickname'/>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl variant="standard">
                <InputLabel>Real Name</InputLabel>
                <Input sx={{
                  width: {
                    xs: 200, 
                    sm: 300
                  }}} 
                  required 
                  type='text' 
                  value={values.real_name} 
                  onChange={handleInput} 
                  name='real_name'/>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl variant="standard">
                <InputLabel>Description</InputLabel>
                <Input sx={{
                  width: {
                    xs: 200, 
                    sm: 300
                  }}} 
                  required 
                  type='text' 
                  value={values.origin_description} 
                  onChange={handleInput} 
                  name='origin_description'/>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl variant="standard">
                <InputLabel>Superpowers</InputLabel>
                <Input sx={{
                  width: {
                    xs: 200, 
                    sm: 300
                  }}} 
                  required 
                  type='text' 
                  value={values.superpowers} 
                  onChange={handleInput} 
                  name='superpowers'/>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl variant="standard">
                <InputLabel>Catch Phrase</InputLabel>
                <Input sx={{
                  width: {
                    xs: 200, 
                    sm: 300
                  }}} 
                  required 
                  type='text' 
                  value={values.catch_phrase} 
                  onChange={handleInput} 
                  name='catch_phrase'/>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} sx={{marginBottom: 5}}>
              <Button type='submit' sx={{paddingX: 5}} variant='contained' color='success'>Save</Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  )
}

export default Form