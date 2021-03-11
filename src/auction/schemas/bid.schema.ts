import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuctionBidDocument = AuctionBid & Document;

@Schema()
export class AuctionBid {
  @Prop({ required: true })
  currentPrice: number;

  @Prop({ required: true, index: true })
  bidder: string;
}

export const AuctionBidSchema = SchemaFactory.createForClass(AuctionBid);
