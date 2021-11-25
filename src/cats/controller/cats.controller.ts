import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { createCatDto } from '../schemas/cat.schema';
import { CatsService } from '../services/cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly usersService: CatsService) {}

  @Post()
  create(@Body() createUserDto: createCatDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const cat = await this.usersService.findOne(id);
    if (!cat) {
      throw new NotFoundException(`user with id [${id}] not found`);
    }
    return cat;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() catUpdate: Partial<createCatDto>) {
    return this.usersService.update(id, catUpdate);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
