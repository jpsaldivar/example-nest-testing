import { Model } from 'mongoose';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Cat, createCatDto } from 'src/cats/schemas/cat.schema';

@Injectable()
export class CatsService {
  constructor(
    @Inject('CAT_MODEL')
    private readonly catModel: typeof Model,
  ) {}

  async create(createCatDto: createCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findOne(id: string): Promise<Cat> {
    return this.catModel.findById(id);
  }

  async remove(id: string): Promise<Cat> {
    return this.catModel.findByIdAndRemove(id);
  }

  async update(id: string, createCatDto: Partial<createCatDto>): Promise<Cat> {
    return this.catModel.findOneAndUpdate({ id }, createCatDto);
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }
}
