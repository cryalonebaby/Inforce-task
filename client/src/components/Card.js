import { 
  Text, 
  Flex, 
  Image, 
  IconButton,
  useDisclosure
} from '@chakra-ui/react'
import { TimeIcon, DeleteIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchProducts, deleteProduct } from '../redux/slices/products'
import DeleteModal from '../modals/DeleteModal'

const Card = ({product, isLoading}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const navigate = useNavigate()

  return (
    <>
    <Flex bgColor={'gray.200'} flexDirection={'column'} minW={300} maxW={300} border={'5px solid white'} borderRadius={15} boxShadow={'1px 2px 2px rgba(0,0,0,0.2)'}>
      <Flex maxH={50} w={'100%'} justifyContent={'flex-end'} alignItems={'center'} px={5}>
        <IconButton onClick={onOpen} bgColor={'gray.200'} icon={<DeleteIcon w={5} h={5} color={'red.800'}/>}/>
      </Flex>
      {isLoading ? 
        <Flex w={'100%'} h={'300px'} justifyContent={'center'} alignItems={'center'} bgColor={'gray.300'}>
          <TimeIcon w={70} h={70} color={'white'}/>
        </Flex> :
        <Image 
          _hover={{cursor: 'pointer'}}
          onClick={() => navigate(`/product:${product._id}`)}
          boxSize={'300px'}
          src={product?.imageUrl}
          objectFit={'cover'}
          alt={'Card'}
        />
      }
       
      <Flex minH={50} w={'100%'} justifyContent={'center'} alignItems={'center'} px={5} py={2}>
        <Text wordBreak={'break-all'} fontSize={'25px'} fontWeight={'bold'}>{isLoading ? '...' : product.name}</Text>
      </Flex>
    </Flex>

    <DeleteModal 
      id={product?._id}
      onClose={onClose}
      isOpen={isOpen}
    />
    </>
  )
}

export default Card