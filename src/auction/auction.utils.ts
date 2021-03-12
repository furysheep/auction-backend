import { Auction } from './schemas/auction.schema';

export function getMaxPrice(auction: Auction): number {
  return Math.max(...auction.bids.map((bid) => bid.currentPrice));
}

export function getMinPrice(auction: Auction): number {
  return Math.min(...auction.bids.map((bid) => bid.currentPrice));
}
