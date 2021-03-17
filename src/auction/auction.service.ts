import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { CreateBidDto } from './dto/create-bid.dto';
import { Auction, AuctionDocument } from './schemas/auction.schema';
import { getMinPrice } from './auction.utils';
import { AuctionBid, AuctionBidDocument } from './schemas/bid.schema';
import { UpdateBidDto } from './dto/update-bid.dto';

@Injectable()
export class AuctionService {
  constructor(
    @InjectModel(Auction.name) private auctionModel: Model<AuctionDocument>,
    @InjectModel(AuctionBid.name)
    private auctionBidModel: Model<AuctionBidDocument>,
  ) {}

  create(createAuctionDto: CreateAuctionDto) {
    return 'This action adds a new auction';
  }

  async createBid(
    auctionId: number,
    createBidDto: CreateBidDto,
  ): Promise<boolean> {
    const auction = await this.findOne(auctionId);

    const minPrice = getMinPrice(auction);
    const { address, bidPrice } = createBidDto;

    if (bidPrice < auction.startPrice || bidPrice < minPrice) {
      throw new BadRequestException('Cannot bid at low price');
    }

    if (
      auction.bids.filter((bid) => bid.bidder == address).length >=
      auction.maxBidPerWallet
    ) {
      throw new BadRequestException('Bid limit reached');
    }

    // check start and end time
    const now = Math.floor(new Date().getTime() / 1000);
    if (now < auction.startTime || now >= auction.endTime) {
      throw new BadRequestException('Auction not started or ended already');
    }

    if (auction.bids.length < auction.totalSupply) {
      const createdBid = new this.auctionBidModel(createBidDto);
      const doc = await createdBid.save();
      await auction.update({
        $push: { bids: { $each: [doc.id] } },
      });
    } else {
      // replace with the minimum bid
      const minBid = auction.bids.reduce((res, bid) =>
        bid.currentPrice < res.currentPrice ? bid : res,
      );
      await minBid.update({
        $set: { currentPrice: bidPrice, bidder: address },
      });
    }

    return true;
  }

  async updateBid(
    auctionId: number,
    updateBidDto: UpdateBidDto,
  ): Promise<boolean> {
    const auction = await this.findOne(auctionId);

    const { id, bidPrice } = updateBidDto;

    if (bidPrice <= 0) {
      throw new BadRequestException('You can only raise');
    }

    // check start and end time
    const now = Math.floor(new Date().getTime() / 1000);
    if (now < auction.startTime || now >= auction.endTime) {
      throw new BadRequestException('Auction not started or ended already');
    }

    let found = false;
    auction.bids.forEach((bid) => {
      if (bid.id == id) {
        bid.update({ currentPrice: bid.currentPrice + bidPrice });
        found = true;
      }
    });

    if (!found) {
      throw new BadRequestException("Bid doesn't exist");
    }

    return true;
  }

  async findAll(): Promise<Auction[]> {
    return this.auctionModel.find().exec();
  }

  findCurrent() {
    return `This action returns current auction`;
  }

  async findOne(id: number) {
    const auction = await this.auctionModel.findOne({ auctionId: id }).exec();
    if (!auction) {
      throw new BadRequestException('Invalid auction');
    }

    return auction;
  }

  update(id: number, updateAuctionDto: UpdateAuctionDto) {
    return `This action updates a #${id} auction`;
  }

  remove(id: number) {
    return `This action removes a #${id} auction`;
  }
}
