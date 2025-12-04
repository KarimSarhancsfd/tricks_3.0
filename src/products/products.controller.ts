import { UserType } from './../utils/enum';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Put,
  Delete,
  Req,
  Res,
  Header,
  Headers,
  UseGuards,
  ParseIntPipe,
  ValidationPipe,
  Query
} from '@nestjs/common';

import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductsService } from './products.service';
// import {ConfigService} from '@nestjs/config';
import {AuthRolesGuard} from '../users/guards/auth.roles.guard'
import {CurrentUser} from "../users/decorators/current-user.decorator"
import type {JWTPayloadType} from "../utils/types"
import {Roles} from "../users/decorators/user-role.decorator"
import { User } from 'src/users/user.entity';


@Controller('api/products')
export class ProductsController {
  // GET: http://localhost:5000/api/products
  // GET: ~/api/products
  //@ Important Note: this considered as bad practice, we will fix
  // private ProductsService: ProductsService;
  // contstructor(ProductsService: ProductsService){
  //   this.ProductsService = ProductsService;
  // }

  constructor(private readonly ProductsService: ProductsService,
              // private readonly configService: ConfigService
  ) {}

  /**
   *  Create new product
   */
  @Post()
  @UseGuards(AuthRolesGuard)
  @Roles(UserType.ADMIN)
  public createProduct(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) body: CreateProductDto, @CurrentUser() payload:JWTPayloadType) {
    //whitelist: true
    // this will remove any property that is not defined in the dto
    // forbidNonWhitelisted: true
    // this will throw an error if any property is not defined in the dto
    //and the controller will not be excuted or working
    //###########################
    //    console.log(body);
    //    return body;

    return this.ProductsService.createProduct(body,payload.id);
  }

  /**
   *  Get all product
   */
  @Get()
  public getAllProducts(@Query('title') title: string) {
    // const sampleEnvVariable = this.configService.get<string>('SAMPLE_ENV_VARIABLE');
    // This will log the value of SAMPLE_ENV_VARIABLE from the .env file
    // You can also use it in your service or anywhere else in your application
    const sample1 = process.env.SAMPLE_ENV_VARIABLE;
    // console.log(sampleEnvVariable, sample1);
    console.log(title)
    return this.ProductsService.getAllProducts();
  }

  /**
   * Get single product by id
   */
  @Get('/:id')
  public getsingleProducts(@Param('id', ParseIntPipe) id: number) {
    return this.ProductsService.getsingleProducts(id);
  }

  /**
   * Update product by id
   */
  @Put(':id')
    @UseGuards(AuthRolesGuard)
  @Roles(UserType.ADMIN)
  public updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) body: UpdateProductDto,
  ) {
    // - this.products[index]: gets the original object at that index (e.g. { id: 2, name: 'pen', rating: 4 })
    // - ...this.products[index]: spreads its existing properties into a new object
    // - ...body: then spreads the new update values (e.g. { rating: 9 })
    // - The final result replaces the original object at that index with the updated version

    //   The ... operator in JavaScript is called the spread operator, and it's one of the most versatile tools in your toolkit. It expands elements of an iterable (like an array or object) into individual elements or properties.
    // 🔍 What it does:
    // - For arrays: It spreads elements out into a new array or function call.
    // - For objects: It spreads key-value pairs into a new object.

    // Return the updated review
    return this.ProductsService.updateProduct(id, body);
  }

  /**
   * Delete product by id
   */
  @Delete(':id')
    @UseGuards(AuthRolesGuard)
  @Roles(UserType.ADMIN)
  public deleteproduct(@Param('id', ParseIntPipe) id: number) {
    return this.ProductsService.deleteproduct(id);
  }
}
