import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { CreateBidDto } from './dto/create-bid.dto';
import { Auction, AuctionDocument } from './schemas/auction.schema';

@Injectable()
export class AuctionService {
  constructor(
    @InjectModel(Auction.name) private auctionModel: Model<AuctionDocument>,
  ) {}

  create(createAuctionDto: CreateAuctionDto) {
    return 'This action adds a new auction';
  }

  createBid(auctionId: string, createBidDto: CreateBidDto) {}

  async findAll(): Promise<Auction[]> {
    return this.auctionModel.find().exec();
  }

  findCurrent() {
    return `This action returns current auction`;
  }

  async findOne(id: number): Promise<Auction> {
    return this.auctionModel.findOne({ auctionId: id }).exec();
  }

  update(id: number, updateAuctionDto: UpdateAuctionDto) {
    return `This action updates a #${id} auction`;
  }

  remove(id: number) {
    return `This action removes a #${id} auction`;
  }
}
