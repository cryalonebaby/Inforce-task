import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Box} from '@mui/material'
import CardHero from '../components/CardHero'
import { fetchHeroes } from '../redux/slices/heroes.js'
import PaginationComponent from '../components/PaginationComponent'
import { styled } from '@mui/system';

const StyledBox = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minWidth: 350,
  paddingLeft: 30,
  paddingRight: 30,
  marginTop: 20,
  marginBottom: 20,
  gap: 20,
  width: '100%',
  height: '100%'
}))

const HomePage = () => {
  const dispatch = useDispatch()
  const {heroes} = useSelector(state => state.heroes)

  const isLoading = heroes.status === 'loading'

  useEffect(() => {
    dispatch(fetchHeroes(heroes.currentPage))
  }, [])

  return (
    <StyledBox>
      <PaginationComponent/>
      <Box 
        display={'flex'} 
        flexWrap={'wrap'} 
        gap={2} 
        justifyContent={'center'} 
        maxWidth={935}
      >
        {(isLoading ? 
          [...Array(1)] : 
          heroes.items).map((hero, index) => 
            isLoading ? (
              <CardHero 
                key={index} 
                isLoading={true}
              />
            ) : (
              <CardHero
                key={index}
                hero={hero}
              />
            )
        )}
      </Box>
    </StyledBox>
  )
}

export default HomePage