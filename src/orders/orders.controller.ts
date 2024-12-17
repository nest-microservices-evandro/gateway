import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { ORDERS_SERVICE } from 'src/configs/services.constant';
import { CreateOrderDto } from './dto/create-order.dto';
import { PaginationOrderDto } from './dto/pagination-order.dto';
import { OrderStatus } from './enum/status.enum';
import { ParseOrderStatusPipe } from './pipes/parse-order-status.pipe';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDERS_SERVICE)
    private readonly ordersClient: ClientProxy,
  ) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('create_order', createOrderDto);
  }

  @Get()
  findAllOrders(@Query() paginationOrderDto: PaginationOrderDto) {
    return this.ordersClient.send('find_all_orders', paginationOrderDto);
  }

  @Get(':id')
  findOneOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersClient.send('find_one_order', { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @UsePipes(ParseOrderStatusPipe)
  @Patch(':id/:status')
  changeStatusOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('status') status: OrderStatus,
  ) {
    return this.ordersClient.send('change_status_order', { id, status }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
