import * as mongoose from 'mongoose';

import { Document } from 'mongoose';

export interface createCatDto {
  name: string;
  age: number;
  breed: string;
}

export class Cat extends Document {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}

export const CatSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
});
