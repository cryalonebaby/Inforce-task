import {Box, Typography} from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../../components/Card'
import { fetchHeroes } from '../../redux/slices/heroes'

const Home = () => {
  const dispatch = useDispatch()
  const {heroes} = useSelector(state => state.heroes)

  const isLoading = heroes.status === 'loading'

  useEffect(() => {
    dispatch(fetchHeroes())
  }, [])

  let pageNumbers = []

  for(let i = 0; i < heroes.pagesAmount; i++) {
    pageNumbers.push(<Typography key={i}>{i + 1}</Typography>)
  }

  return (
    <Box>
      <Typography variant='h6'>{heroes.currentPage}</Typography>
      {(isLoading ? [...Array(5)] : heroes.items).map((hero, index) => 
        isLoading ? (
          <Card 
            key={index} 
            isLoading={true}
          />
        ) : (
          <Card
            key={index}
            nickname={hero.nickname}
          />
        )
      )}
      <Box display={'flex'}>
        {pageNumbers}
      </Box>
    </Box>
  )
}

export default Home