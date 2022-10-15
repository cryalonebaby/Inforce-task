const Product = require('../models/Product')

exports.fetchAllProducts = async(req, res) => {
  try {
    const sortField = req.query.sort ? {count: -1} : {name: 1}

    const result = await Product.find().sort(sortField).collation({locale: 'en', caseLevel: true})

    res.status(201).json({products: result})
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong'})
  }
}

exports.findOneProduct = async(req, res) => {
  try {
    const result = await Product.findById(req.params.id)

    res.status(201).json(result)
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong'})
  }
}

exports.updateOneProduct = async(req, res) => {
  try {
    const result = await Product.findById(req.params.id)

    Object.assign(result, req.body)

    await result.save()

    res.status(201).json(result)
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong'})
  }
}

exports.deleteOneProduct = async(req, res) => {
  try {
    const result = await Product.findByIdAndDelete(req.params.id)

    res.status(201).json(result)
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong'})
  }
}

exports.createNewProduct = async(req, res) => {
  try {
    const {imageUrl, name, count, size, weight, comments} = req.body

    const newProduct = new Product({
      imageUrl: imageUrl,
      name: name,
      count: count,
      size: size,
      weight: weight,
      comments: comments
    })

    const result = await newProduct.save()

    res.send(result)
  } catch (e) {
    res.status(500).json({ message: e})
  }
}