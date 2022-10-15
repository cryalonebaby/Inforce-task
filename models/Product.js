const {Schema, model} = require('mongoose')

const CommentSchema = new Schema({
  productId: {type: String, required: true},
  description: {type: String, required: true},
  date: {type: Date, required: true},
})

const ProductSchema = new Schema({
  imageUrl: {type: String, required: true},
  name: {type: String, required: true},
  count: {type: Number, required: true},
  size: {
    width: {type: Number, required: true},
    height: {type: Number, required: true}
  },
  weight: {type: String, required: true},
  comments: [CommentSchema]
})

module.exports = model('Product', ProductSchema)