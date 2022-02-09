// const {validationResult} = require('express-validator');
// const path = require('path');
// const fs = require('fs');

const RincianPesanan = require("../models/rincianPesanan");

exports.tambahRincianPesanan = (req, res, next) => {

  const rincianPesanan = req.body.dataRincianPesanan

  const alamatPembeli = rincianPesanan.alamatPembeli;
  const harga = rincianPesanan.harga;
  const jumlah = rincianPesanan.jumlah;
  const metodePembayaran = rincianPesanan.metodePembayaran;
  const namaProduk = rincianPesanan.namaProduk;
  const rincian = rincianPesanan.rincian;
  const statusPenerima = rincianPesanan.statusPenerima;
  const statusPengiriman = rincianPesanan.statusPengiriman;
  const userNamePenjual = rincianPesanan.userNamePenjual;
  const usernamePembeli = rincianPesanan.usernamePembeli;
  const namaPembeli = rincianPesanan.namaPembeli;
  const noHp = rincianPesanan.noHp;

  console.log(`namaProduk => ${JSON.stringify(namaProduk)}`);
  console.log(`userNamePenjual => ${JSON.stringify(userNamePenjual)}`);

  const dataRincianPesanan = new RincianPesanan({
    alamatPembeli,
    harga,
    jumlah,
    metodePembayaran,
    namaProduk,
    rincian,
    statusPenerima,
    statusPengiriman,
    usernamePenjual: userNamePenjual,
    usernamePembeli,
  });

  dataRincianPesanan
    .save()
    .then((result) => {
      res.status(200).json({
        message: "Data Rincian Tersimpan",
        data: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.getRincianPesanan = (req, res, next) => {
  let totalItems;
  const username = req.body.username;
  const jenisAkun = req.body.jenisAkun;

  let query = jenisAkun === "Konsumen" ? "usernamePembeli" : "usernamePenjual";

  console.log(`query => ${query}`);

  RincianPesanan.find({
    [query]: username,
  })
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return RincianPesanan.find({ [query]: username });
    })
    .then((result) => {
      console.log(`result => ${result}`);
      res.status(200).json({
        message: "Data produk berhasil di get",
        data: result,
        totalData: totalItems,
      });
    })
    .catch((err) => next(err));
};

exports.updateRincianPesanan = (req, res, next) => {
  const id = req.params.id;

  const { message, jenisAkun } = req.body.data;

  if (jenisAkun === "Konsumen") {
    RincianPesanan.findById(id)
      .then((rincian) => {
        if (!rincian) {
          const err = new Error("Produk tidak ditemukan");
          err.status = 404;
          err.data = null;
          throw err;
        }

        rincian.statusPenerima = message;
        return rincian.save();
      })
      .then((result) => {
        res.status(200).json({
          message: "Update berhasil",
          data: result,
        });
      })
      .catch((err) => next(err));
  } else {
    RincianPesanan.findById(id)
      .then((rincian) => {
        if (!rincian) {
          const err = new Error("Produk tidak ditemukan");
          err.status = 404;
          err.data = null;
          throw err;
        }

        rincian.statusPengiriman = message;
        return rincian.save();
      })
      .then((result) => {
        res.status(200).json({
          message: "Update berhasil",
          data: result,
        });
      })
      .catch((err) => next(err));
  }
};

exports.deleteRincianPesanan = (req, res, next) => {
  const id = req.params.id;

  RincianPesanan.findById(id)
    .then((pesanan) => {
      if (!pesanan) {
        const err = new Error("Produk tidak ditemukan");
        err.status = 404;
        err.data = null;
        throw err;
      }

      return RincianPesanan.findByIdAndRemove(id);
    })
    .then((result) => {
      res.status(200).json({
        message: "Hapus berhasil",
        data: result,
      });
    })
    .catch((err) => next(err));
};
