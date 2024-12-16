import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateProductDto } from 'src/common/dto/create-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateProductDto } from 'src/common/dto/update-product.dto';
import { PRODUCT_SERVICE } from 'src/configs/services.constant';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE)
    private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsClient.send(
      { cmd: 'create_product' },
      createProductDto,
    );
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send(
      { cmd: 'find_all_products' },
      paginationDto,
    );
  }

  @Get(':id')
  async findOneProduct(@Param('id', ParseIntPipe) id: number) {
    try {
      const product = await firstValueFrom(
        this.productsClient.send({ cmd: 'find_one_product' }, { id }),
      );

      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const product = await firstValueFrom(
        this.productsClient.send(
          { cmd: 'update_product' },
          { id, ...updateProductDto },
        ),
      );

      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async removeProduct(@Param('id', ParseIntPipe) id: number) {
    try {
      const product = await firstValueFrom(
        this.productsClient.send({ cmd: 'remove_product' }, { id }),
      );

      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
