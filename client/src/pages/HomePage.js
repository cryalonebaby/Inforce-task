import {useSelector, useDispatch} from 'react-redux'
import { useEffect, useState } from 'react';
import { fetchProducts, fetchProductsSortedByCount } from '../redux/slices/products';
import { Flex, Text, Switch  } from '@chakra-ui/react'
import Card from '../components/Card';

const HomePage = () => {

  const [isChecked, setIsChecked] = useState(false)

  const {products} = useSelector(state => state.products)

  const dispatch = useDispatch()

  const isLoading = products.status === 'loading' ? true : false

  useEffect(() => {
    isChecked ? 
    dispatch(fetchProductsSortedByCount()) :
    dispatch(fetchProducts())
  }, [isChecked])

  const handleCheck = (e) => {
    setIsChecked(!isChecked)
  }

  return (
    <Flex 
      justifyContent={'center'} 
      minW={350}
    >
      <Flex 
        flexDirection={'column'} 
        alignItems={'center'} 
        mt={5}
      >
        <Flex 
          flexDirection={'column'} 
          alignItems={'center'} 
          gap={2}
        >
          <Text 
            fontSize={'15px'} 
            fontWeight={'bold'}
          >
            Sorted By
          </Text>
          <Flex 
            gap={2} 
            alignItems={'center'}
          >
            <Text 
              fontSize={'15px'} 
              fontWeight={'bold'} 
              color={'gray'}
            >
              Name
            </Text>
            <Switch 
              checked={isChecked} 
              onChange={handleCheck} 
              size='lg'
            />
            <Text 
              fontSize={'15px'} 
              fontWeight={'bold'} 
              color={'gray'}
            >
              Count
            </Text>
          </Flex>
        </Flex>
        <Flex 
          maxW={1020} 
          flexWrap={'wrap'} 
          justifyContent={{
            base: 'center', 
            lg: 'flex-start'
          }}
          gap={5} 
          p={10} 
        >
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