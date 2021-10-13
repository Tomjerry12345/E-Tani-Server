const midtransClient = require("midtrans-client");

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: "SB-Mid-server-v3SOA6yd2pYXsymdalJpmW2d",
  clientKey: "SB-Mid-client-c7Y2joxVHoZcQFsk",
});

exports.transaction = async (req, res, next) => {
  const { total } = req.body;
  let parameter = {
    transaction_details: {
      order_id: `transaction-${Date.now()}`,
      gross_amount: total,
    },
    credit_card: {
      secure: true,
    },
  };

  snap
    .createTransaction(parameter)
    .then((transaction) => {
      // transaction token
      let transactionToken = transaction.token;

      // transaction redirect url
      let transactionRedirectUrl = transaction.redirect_url;

      res.status(200).json({
        transactionToken,
        transactionRedirectUrl,
      });
    })
    .catch((e) => {
      console.log("Error occured:", e.message);
    });
};

exports.getStatus = (req, res, next) => {
  midtransClient.transaction.status().then((res) => {});
};
