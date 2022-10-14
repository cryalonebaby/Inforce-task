import React, {useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledFlex = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap'
}))

const StyledImg = styled('img')(({theme}) => ({
  width: '100%',
  height: '100%',
  [theme.breakpoints.down('md')]: {
    height: '50%',
    marginTop: '25%',
  }
}))

const HeroPage = () => {
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
    <StyledFlex 
      flexDirection={'column'} 
      minWidth={350}
    >
      <StyledFlex 
        mt={5} gap={1} 
        sx={{
          flexDirection: {
            xs: 'column', 
            md: 'row'
          }, 
          background: '#EFEFEF'
        }}
      >
        <Box 
          minWidth={300} 
          height={300} 
          sx={{background: '#EFEFEF'}}>
          <StyledImg
            src={currentHero?.images[0]}
            alt={0}
            loading="lazy"
          />
        </Box>
        <ImageList 
          sx={{ 
            maxWidth: 500, 
            minWidth: 350, 
            paddingX: 2 
          }} 
          cols={3} 
          rowHeight={82}
        >
          {currentHero?.images.map((item, indx) => (
            <ImageListItem key={indx}>
              <img
                src={currentHero?.images[indx]}
                alt={indx}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </StyledFlex>
      <Box 
        textAlign={'left'} 
        lineHeight={2}
        mt={4}
      >
        <Box 
          maxWidth={350} 
          sx={{wordBreak: 'break-word'}}>
          <Typography 
            variant='h6' 
            fontWeight={'bold'}
          >
            Nickname: 
          </Typography>
          <Typography 
            variant='p' 
            fontWeight={'normal'} 
            textTransform={'uppercase'} 
            fontFamily={'sans-serif'}
          >
            {currentHero?.nickname}
          </Typography>
        </Box>
        <Box 
          maxWidth={350} 
          sx={{wordBreak: 'break-word'}}
        >
          <Typography 
            variant='h6' 
            fontWeight={'bold'}
          >
            Real Name: 
          </Typography>
          <Typography 
            variant='p' 
            fontWeight={'normal'} 
            textTransform={'uppercase'} 
            fontFamily={'sans-serif'}
          >
            {currentHero?.real_name}
          </Typography>
        </Box>
        <Box maxWidth={350} sx={{wordBreak: 'break-word'}}>
          <Typography 
            variant='h6' 
            fontWeight={'bold'}
          >
            Description:
          </Typography>
          <Typography 
            variant='p' 
            textTransform={'uppercase'} 
            fontFamily={'sans-serif'}
          >
            {currentHero?.origin_description}
          </Typography>
        </Box>
        <Box maxWidth={350} sx={{wordBreak: 'break-word'}}>
          <Typography 
            variant='h6' 
            fontWeight={'bold'}
          >
            Superpowers:
          </Typography>
          <Typography 
            variant='p' 
            textTransform={'uppercase'} 
            fontFamily={'sans-serif'}
          >
            {currentHero?.superpowers}
          </Typography>
        </Box>
        <Box maxWidth={350} sx={{wordBreak: 'break-word'}}>
          <Typography 
            variant='h6' 
            fontWeight={'bold'}
          >
            Catch Phrase:
          </Typography>
          <Typography 
            variant='p' 
            textTransform={'uppercase'} 
            fontFamily={'sans-serif'}
          >
            {currentHero?.catch_phrase}
          </Typography>
        </Box>
      </Box>
    </StyledFlex>
  )
}

export default HeroPage