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
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PRODUCT_SERVICE } from 'src/configs/services.constant';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

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
  findOneProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsClient.send({ cmd: 'find_one_product' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsClient
      .send({ cmd: 'update_product' }, { id, ...updateProductDto })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Delete(':id')
  removeProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsClient.send({ cmd: 'remove_product' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
