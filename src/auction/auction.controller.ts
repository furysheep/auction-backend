import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Response,
  BadRequestException,
} from '@nestjs/common';
import { AuctionService } from './auction.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { Auction } from './schemas/auction.schema';

@Controller('auction')
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) {}

  @Get()
  findCurrent() {
    return this.auctionService.findCurrent();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const auction = await this.auctionService.findOne(+id);
    if (!auction) {
      throw new BadRequestException('Invalid auction');
    }
    return auction;
  }

  @Post(':id')
  create(@Param('id') id: string, @Body() createBidDto: CreateBidDto) {
    return this.auctionService.createBid(id, createBidDto);
  }
}
