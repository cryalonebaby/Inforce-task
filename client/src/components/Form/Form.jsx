import {useRef, useState} from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import { styled } from '@mui/system';
import { useDispatch } from 'react-redux'
import { createHero, updateHero } from '../../redux/slices/heroes'
import { useNavigate } from 'react-router-dom';

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {storage} from '../../firebase'

const StyledImg = styled('img')(({theme}) => ({
  width: '100%',
  height: '100%',
  [theme.breakpoints.down('md')]: {
    width: '50%',
  }
}))

const Form = ({editHero}) => {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [images, setImages] = useState(editHero ? editHero.images : [])

  console.log(editHero);

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

  const inputFile = useRef(null)

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
      const updateResult = dispatch(updateHero([{id: editHero._id}, {...values, images}]))
      console.log(updateResult);
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
                <Box sx={{display: 'grid', gridTemplateColumns: {xs: '1fr',sm: 'repeat(2, 1fr)', md: 'repeat(5, 160px)'}, width: '800px', gridAutoRows: {xs: '150px', md: '100px'}, gridGap: '10px'}}>
                  <Box 
                    onClick={() => handleImagePick(0)} 
                    sx={{
                    backgroundColor: '#EFEFEF', 
                    gridRow: {xs: '1/1', sm: '1/3'}, 
                    gridColumn: {xs: '1/1', sm: '1/3'},
                    
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
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl variant="standard">
                <InputLabel>Name</InputLabel>
                <Input sx={{width: {xs: 200, sm: 300}}} required type='text' value={values.nickname} onChange={handleInput} name='nickname'/>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl variant="standard">
                <InputLabel>Real Name</InputLabel>
                <Input sx={{width: {xs: 200, sm: 300}}} required type='text' value={values.real_name} onChange={handleInput} name='real_name'/>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl variant="standard">
                <InputLabel>Description</InputLabel>
                <Input sx={{width: {xs: 200, sm: 300}}} required type='text' value={values.origin_description} onChange={handleInput} name='origin_description'/>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl variant="standard">
                <InputLabel>Superpowers</InputLabel>
                <Input sx={{width: {xs: 200, sm: 300}}} required type='text' value={values.superpowers} onChange={handleInput} name='superpowers'/>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl variant="standard">
                <InputLabel>Catch Phrase</InputLabel>
                <Input sx={{width: {xs: 200, sm: 300}}} required type='text' value={values.catch_phrase} onChange={handleInput} name='catch_phrase'/>
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

{/* <Box width={100} height={100} bgcolor={'#000'} onClick={handleImagePick}></Box>
      <Avatar sx={{width: 160, height: 160}} src={images[0]}/>
      <input 
        type={'file'} 
        onChange={handleChange}
        ref={inputFile}
        style={{display: 'none'}}
      /> */}

export default Form