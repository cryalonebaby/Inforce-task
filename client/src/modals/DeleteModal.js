import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, 
  Button,
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { fetchProducts, deleteProduct } from '../redux/slices/products'

const DeleteModal = ({id, isOpen, onClose}) => {
  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(deleteProduct(id))
    onClose()
    dispatch(fetchProducts())
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay minW={370}/>
      <ModalContent minW={350}>
        <ModalHeader>Completely Delete?</ModalHeader>
        <ModalCloseButton />
        <ModalFooter justifyContent={'space-between'}>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme='red' variant='ghost' onClick={handleDelete}>Delete</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeleteModal