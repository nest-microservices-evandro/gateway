import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  createProduct(@Body() body: any) {
    console.log(body);
    return 'Product created';
  }

  @Get()
  findAllProducts() {
    return 'All products';
  }

  @Get(':id')
  findOneProduct(@Param('id', ParseIntPipe) id: number) {
    return `Find product with id: ${id}`;
  }

  @Patch(':id')
  updateProduct(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    console.log(body);
    return `Update product with id: ${id}`;
  }

  @Delete(':id')
  removeProduct(@Param('id', ParseIntPipe) id: number) {
    return `Update product with id: ${id}`;
  }
}
