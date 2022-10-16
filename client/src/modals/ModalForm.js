import {
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, 
  Button,
  FormControl,
  FormLabel,
  Image,
  FormHelperText,
  Input,
} from '@chakra-ui/react'
import {useState, useRef} from 'react'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createProduct, fetchProducts, updateProduct } from '../redux/slices/products'
import { SmallAddIcon } from '@chakra-ui/icons'
import { storage } from '../firebase'

const ModalForm = ({isOpen, onClose, product}) => {

  // INITIAL STATE
  const [size, setSize] = useState({
    width: product ? product.size.width : '',
    height: product ? product.size.height : ''
  })

  const [form, setForm] = useState({
    name: product ? product.name : '',
    count: product ? product.count : '',
    weight: product ? product.weight : ''
  })

  const [img, setImg] = useState(product ? product.imageUrl : '')

  const [isUploading, setIsUploading] = useState(false)

  // CONSTS

  const inputFile = useRef(null)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const anyFieldEmpty = 
    Object.values(form).some(val => val === '') || 
    Object.values(size).some(val => val === '') || 
    img === ''
  
  // FUNCTIONS
  const handleChange = (e) => {
    const {name, value} = e.target

    setForm({...form, [name]: value})
  }

  const handleSize = (e) => {
    const {name, value} = e.target

    setSize({...size, [name]: value})
  }

  const uploadImage = async (img) => {
    const randomString = (Math.random() + 1).toString(36).substring(7)
    const imgRef = ref(storage, `products/${img.name}-${randomString}`)

    const snapshot = await uploadBytes(imgRef, img)
    const url = await getDownloadURL(snapshot.ref)

    setImg(url)
    setIsUploading(false)
  }

  const handleImage = (e) => {
    const [img] = e.target.files

    setIsUploading(true)
    uploadImage(img)
  }

  const handlePick = () => {
    inputFile.current.click()
  }


  const handleSubmit = (e) => {
    e.preventDefault()

    const productObject = {...form, size, imageUrl: img}
    
    if(anyFieldEmpty) return

    if(product) {
      const toEdit = [product._id, productObject]
      dispatch(updateProduct(toEdit))
    } else {
      dispatch(createProduct(productObject))
    }

    onClose()
    navigate('/')
    dispatch(fetchProducts())
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay minW={370}/>
      <ModalContent>
        <ModalHeader>Add Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isUploading ? 
            <Flex 
              onClick={handlePick} 
              w={'100%'} 
              h={200} 
              bgColor={'gray'} 
              justifyContent={'center'} 
              alignItems={'center'}
            >
              <Text color={'white'} fontSize={'26px'} fontWeight={'bold'}>Uploading...</Text>
            </Flex> :
            <Flex 
              onClick={handlePick} 
              w={'100%'} 
              h={200} 
              bgColor={'gray'} 
              justifyContent={'center'} 
              alignItems={'center'}
            >
              {img ? 
                <Image boxSize={'100%'} src={img} alt={'preview'} objectFit={'cover'}/> :
                <SmallAddIcon w={20} h={20} color={'white'}/>
              }
            </Flex>
          }
          <input 
            type={'file'} 
            onChange={handleImage}
            ref={inputFile}
            style={{display: 'none'}}
          />
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input value={form.name} onChange={handleChange} type='text' name='name'/>

            <FormLabel>Count</FormLabel>
            <Input value={form.count} onChange={handleChange} type='number' name='count'/>

            <FormLabel>Width</FormLabel>
            <Input value={size.width} onChange={handleSize} type='number' name='width'/>

            <FormLabel>Height</FormLabel>
            <Input value={size.height} onChange={handleSize} type='number' name='height'/>

            <FormLabel>Weidth</FormLabel>
            <Input value={form.weight} onChange={handleChange} type='text' name='weight'/>

            {anyFieldEmpty && <FormHelperText color={'red'}>All Fiels are required.</FormHelperText>}
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant='ghost' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme='blue' onClick={handleSubmit}>Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalForm