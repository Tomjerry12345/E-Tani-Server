const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Troli = new Schema({
    idProduk: {
        type: String,
        required: true
    },
    namaProduk: {
        type: String,
        required: true
    },
    deskripsiProduk: {
        type: String,
        required: true
    },
    kategori: {
        type: String,
        required: true
    },
    harga: {
        type: Number,
        required: true
    },
    stok: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    usernamePembeli: {
        type: String,
        required: true
    },
    usernamePenjual: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Troli', Troli);