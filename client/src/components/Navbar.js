import { 
  Flex, 
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { SmallAddIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import ModalForm from '../modals/ModalForm'

const Navbar = () => {
  const navigate = useNavigate()

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
    <Flex 
      minW={370} 
      w={'100%'} 
      h={90} 
      bgColor={'gray.200'} 
      justifyContent={'space-between'} 
      alignItems={'center'} 
      px={5}
    >
      <Flex 
        onClick={() => navigate('/')}
        justifySelf={'flex-start'} 
      >
        <Text 
          fontSize={'22px'} 
          fontWeight={'bold'} 
          color={'red.900'} 
          _hover={{cursor: 'pointer'}}
        >
          PRODUCTS
        </Text>
      </Flex>
      <Flex 
        onClick={onOpen} 
        alignItems={'center'} 
        bgColor={'#D4DAE1'} 
        p={3} 
        borderRadius={15} 
        _hover={{cursor: 'pointer'}}
      >
        <SmallAddIcon w={10} h={10} color={'green.400'}/>
        <Text fontSize={'22px'} fontWeight={'bold'} color={'green.600'}>Add Product</Text>
      </Flex>
    </Flex>

    <ModalForm isOpen={isOpen} onClose={onClose}/>
    </>
  )
}

export default Navbar