import { Flex, Image, Text, useDisclosure } from '@chakra-ui/react'
import { useParams, useNavigate } from 'react-router-dom'
import { EditIcon } from '@chakra-ui/icons'
import ModalForm from '../modals/ModalForm'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const ProductPage = () => {
  const {id} = useParams()

  const navigate = useNavigate()

  const {products} = useSelector(state => state.products)

  const currentProduct = products.items.find(item => item._id === id)

  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if(!currentProduct) {
      navigate('/')
    }
  }, [])

  return (
    <Flex justifyContent={'center'} minW={370}>
      <Flex p={5} gap={10} flexDirection={{base: 'column', md: 'row'}}>
        <Image 
          boxSize={'370px'}
          objectFit={'cover'}
          src={currentProduct?.imageUrl}
          alt='product'
        />
        <Flex minW={200} maxW={400} flexDirection={'column'} gap={3}>
          <Flex onClick={onOpen} _hover={{cursor: 'pointer'}} w={90} alignItems={'center'} justifyContent={'center'} gap={1} bgColor={'#D4DAE1'} p={3} borderRadius={15}>
            <EditIcon w={5} h={5} color={'blue.400'}/>
            <Text fontSize={'12px'} fontWeight={'bold'} color={'blue.600'}>Edit</Text>
          </Flex>
          <Flex flexDirection={'column'}>
            <Text fontSize={'14px'} fontWeight={'bold'} color={'gray'}>Name</Text>
            <Text wordBreak={'break-all'} fontSize={'20px'} fontWeight={'bold'}>{currentProduct?.name}</Text>
          </Flex>
          <Flex flexDirection={'column'}>
            <Text fontSize={'14px'} fontWeight={'bold'} color={'gray'}>Count</Text>
            <Text wordBreak={'break-all'} fontSize={'20px'} fontWeight={'bold'}>{currentProduct?.count}</Text>
          </Flex>
          <Flex flexDirection={'column'}>
            <Text fontSize={'14px'} fontWeight={'bold'} color={'gray'}>Width</Text>
            <Text wordBreak={'break-all'} fontSize={'20px'} fontWeight={'bold'}>{currentProduct?.size.width}</Text>
          </Flex>
          <Flex flexDirection={'column'}>
            <Text fontSize={'14px'} fontWeight={'bold'} color={'gray'}>Height</Text>
            <Text wordBreak={'break-all'} fontSize={'20px'} fontWeight={'bold'}>{currentProduct?.size.height}</Text>
          </Flex>
          <Flex flexDirection={'column'}>
            <Text fontSize={'14px'} fontWeight={'bold'} color={'gray'}>Weight</Text>
            <Text wordBreak={'break-all'} fontSize={'20px'} fontWeight={'bold'}>{currentProduct?.weight}</Text>
          </Flex>
        </Flex>
      </Flex>

      <ModalForm isOpen={isOpen} onClose={onClose} product={currentProduct}/>
    </Flex>
  )
}

export default ProductPage