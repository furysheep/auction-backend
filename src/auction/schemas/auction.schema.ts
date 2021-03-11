import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { AuctionBid } from './bid.schema';

export type AuctionDocument = Auction & mongoose.Document;

@Schema()
export class Auction {
  @Prop({ unique: true })
  auctionId: number;

  @Prop({ required: true, index: true })
  startTime: number;

  @Prop({ required: true, index: true })
  endTime: number;

  @Prop({ required: true })
  totalSupply: number;

  @Prop()
  startPrice: number;

  @Prop()
  maxBidPerWallet: number;

  @Prop({ required: true })
  paymentTokenAddress: string;

  @Prop({ required: true })
  auctionItemAddress: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'AuctionBid' })
  bids: AuctionBid[];
}

export const AuctionSchema = SchemaFactory.createForClass(Auction);
