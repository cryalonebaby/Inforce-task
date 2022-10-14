import {Box, Typography} from '@mui/material'
import { useEffect } from 'react'
import CardHero from '../../components/CardHero'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHeroes } from '../../redux/slices/heroes'
import PaginationComponent from '../../components/Pagination/PaginationComponent'

const Home = () => {
  const dispatch = useDispatch()
  const {heroes} = useSelector(state => state.heroes)

  const isLoading = heroes.status === 'loading'

  useEffect(() => {
    dispatch(fetchHeroes(heroes.currentPage))
  }, [])

  return (
    <Box width={'100%'} height={'100%'} display={'flex'} flexDirection={'column'} alignItems={'center'} minWidth={350} px={3} my={2} gap={2}>
      <PaginationComponent/>
      <Box display={'flex'} flexWrap={'wrap'} gap={2} justifyContent={'center'} maxWidth={935}>
        {(isLoading ? [...Array(1)] : heroes.items).map((hero, index) => 
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
    </Box>
  )
}

export default Home