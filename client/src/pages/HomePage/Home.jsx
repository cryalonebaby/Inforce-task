import {Box, Typography} from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../../components/Card'
import { fetchHeroes } from '../../redux/slices/heroes'

const Home = () => {
  const dispatch = useDispatch()
  const {heroes} = useSelector(state => state.heroes)
  console.log(heroes);

  const isLoading = heroes.status === 'loading'

  useEffect(() => {
    dispatch(fetchHeroes())
  }, [])

  return (
    <Box>
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
    </Box>
  )
}

export default Home