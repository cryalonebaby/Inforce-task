const {Router} = require('express')
const productsControllers = require('../controllers/products')

const router = Router()

router.get('/products', productsControllers.fetchAllProducts)

router.get('/products/:id', productsControllers.findOneProduct)

router.post('/products', productsControllers.createNewProduct)

router.patch('/products/:id', productsControllers.updateOneProduct)

router.delete('/products/:id', productsControllers.deleteOneProduct)

module.exports = router