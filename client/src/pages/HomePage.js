import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react';
import { fetchProducts } from '../redux/slices/products';
import { Text } from '@chakra-ui/react'

const HomePage = () => {

  const dispatch = useDispatch()
  const {products} = useSelector(state => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  console.log(products.items);

  return (
    <Text fontSize='50px' color='tomato'>Hello {products.status}</Text>
  )
}

export default HomePage