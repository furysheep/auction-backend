var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var auctionSchema = new Schema({
  startTime: Number,
  endTime: Number,
  totalSupply: Number,
  startPrice: Number,
  maxBidPerWallet: Number,
  paymentTokenAddress: String,  // ERC20
  auctionItemAddress: String,   // ERC1155
  auctionItemTokenId: Number,    // ERC1155
  bids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AuctionBid"
    }
  ]
});

var auctionModel = mongoose.model("Auction", auctionSchema);

module.exports = auctionModel;