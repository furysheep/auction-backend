var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var auctionBidSchema = new Schema({
  currentPrice: Number,
  bidder: String,
});

var auctionBidModel = mongoose.model("AuctionBid", auctionBidSchema);

module.exports = auctionBidModel;