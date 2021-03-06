var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var StockItemSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },

  quantity: {
    type: Number,
    required: true
  },

  price: {
    type: Number,
    required: false
  },

  isFrozen: {
    type: Boolean,
    required: true,
    default: false
  },

  isSpoiled: {
    type: Boolean,
    required: true,
    default: false
  },

  open: {
    type: Boolean,
    required: true,
    default: false
  },

  opened_date: {
    type: Date,
    required: false
  },

  best_before_date: {
    type: Date,
    required: false
  },

  purchase_date: {
    type: Date,
    required: true,
    default: new Date()
  },

  consumed_date: {
    type: Date,
    required: false
  }
});

module.exports = mongoose.model('Stock', StockItemSchema);
