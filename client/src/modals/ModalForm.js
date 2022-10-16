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
  const [size, setSize] = useState({
    width: product ? product.size.width : '',
    height: product ? product.size.height : ''
  })

  const [form, setForm] = useState({
    name: product ? product.name : '',
    count: product ? product.count : '',
    weight: product ? product.weight : ''
  })

  const inputFile = useRef(null)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [img, setImg] = useState(product ? product.imageUrl : '')

  const [isUploading, setIsUploading] = useState(false)

  const anyFieldEmpty = form.name === '' || form.count === '' || form.weight === '' || size.width === '' || size.height === '' || img === ''

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
      <ModalContent minW={350}>
        <ModalHeader>Add Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isUploading ? 
            <Flex w={'100%'} h={200} bgColor={'gray'} justifyContent={'center'} alignItems={'center'} onClick={handlePick}>
              <Text color={'white'} fontSize={'26px'} fontWeight={'bold'}>Uploading...</Text>
            </Flex> :
            <Flex w={'100%'} h={200} bgColor={'gray'} justifyContent={'center'} alignItems={'center'} onClick={handlePick}>
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
            <Input type='text' name='name' value={form.name} onChange={handleChange}/>

            <FormLabel>Count</FormLabel>
            <Input type='number' name='count' value={form.count} onChange={handleChange}/>

            <FormLabel>Width</FormLabel>
            <Input type='number' name='width' value={size.width} onChange={handleSize}/>

            <FormLabel>Height</FormLabel>
            <Input type='number' name='height' value={size.height} onChange={handleSize}/>

            <FormLabel>Weidth</FormLabel>
            <Input type='text' name='weight' value={form.weight} onChange={handleChange}/>
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