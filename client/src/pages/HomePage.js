import {useSelector, useDispatch} from 'react-redux'
import { useEffect, useState } from 'react';
import { fetchProducts, fetchProductsSortedByCount } from '../redux/slices/products';
import { Flex, Text, Switch  } from '@chakra-ui/react'
import Card from '../components/Card';

const HomePage = () => {

  const dispatch = useDispatch()
  const {products} = useSelector(state => state.products)

  const [isChecked, setIsChecked] = useState(false)

  const isLoading = products.status === 'loading' ? true : false

  useEffect(() => {
    isChecked ? 
    dispatch(fetchProductsSortedByCount()) :
    dispatch(fetchProducts())
  }, [isChecked])

  console.log(products.items);

  const handleCheck = (e) => {
    setIsChecked(!isChecked)
  }

  return (
    <Flex justifyContent={'center'} minW={350}>
      <Flex flexDirection={'column'} alignItems={'center'} mt={5}>
        <Flex flexDirection={'column'} alignItems={'center'} gap={2}>
          <Text fontSize={'15px'} fontWeight={'bold'}>Sorted By</Text>
          <Flex gap={2} alignItems={'center'}>
            <Text fontSize={'15px'} fontWeight={'bold'} color={'gray'}>Name</Text>
            <Switch checked={isChecked} onChange={handleCheck} size='lg'/>
            <Text fontSize={'15px'} fontWeight={'bold'} color={'gray'}>Count</Text>
          </Flex>
        </Flex>
        <Flex p={10} maxW={1020} flexWrap={'wrap'} gap={5} justifyContent={{base: 'center', lg: 'flex-start'}}>
        
          {
            isLoading ? 
            [...Array(9)].map((elem, i) => (
              <Card key={i} isLoading={true}/>
            )) :
            products.items.map((elem, i) => (
              <Card key={elem._id} product={elem}/>
            ))
          }
        </Flex>
      </Flex>
      
    </Flex>
  )
}

export default HomePage