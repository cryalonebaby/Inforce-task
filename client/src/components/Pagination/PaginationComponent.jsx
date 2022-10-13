import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { useDispatch, useSelector } from 'react-redux'
import { fetchHeroes } from '../../redux/slices/heroes'

const PaginationComponent = () => {

  const dispatch = useDispatch()
  const {heroes} = useSelector(state => state.heroes)

  return (
    <Pagination 
      onChange={(event, page) => dispatch(fetchHeroes(page))}
      count={heroes?.pagesAmount} 
      variant="outlined" 
      shape="rounded" 
      renderItem={(item) => (
        <PaginationItem {...item}/>
      )}
    />
  )
}

export default PaginationComponent