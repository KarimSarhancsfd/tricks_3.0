import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
// import { UserService } from 'src/users/user.service';
import { ReviewsService } from '../reviews/reviews.service';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// type Products = {
//   id: number;
//   title: string;
//   price: number;
// };

// important note thhere is a two tips of relationships
// first:
// class person{}
//Is-A Realationship
//Student is  a person
// class student extends Person{}

// class SendEmail{}
//Has-A Relationship
//Account has sendEmail
// class Account {
//   private sendEmail: SendEmail = new SendEmail();
// }

// second:
/* What is a circular dependency?
A circular dependency happens when Module A imports Module B, and Module B also imports Module A. NestJS can't resolve this loop on its own because it doesn't know which module to initialize first
 */

@Injectable() // this is a decorator that makes  the class injectable
//this called inner dependency injection
export class ProductsService {
  // getOneBy: any;
  // constructor(private readonly usersService:UserService) {}
  //this is outer dependency injection

  // constructor(
  //   private readonly ReviewsService:ReviewsService,
  //   // private readonly userService: UserService
  // ){}

  // private products: Products[] = [
  //   { id: 1, title: 'book', price: 10 },
  //   { id: 2, title: 'pen', price: 5 },
  //   { id: 3, title: 'laptop', price: 400 },
  // ];

  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>){}

  // public getAllProducts() {
  //   // return this.products;
  //   const products = this.products;
  //   // const users = this.usersService.getAllUsers(); // Assuming getAllUsers is a method in UserService
  //   // return {products,users}
  // }

  public async getAllProducts() {
   
  const products =  await this.productsRepository.find();
  console.log('Fetched products:', products);
  return products;


  }

  // public async createProduct(body: CreateProductDto) {
  //   //whitelist: true
  //   // this will remove any property that is not defined in the dto
  //   // forbidNonWhitelisted: true
  //   // this will throw an error if any property is not defined in the dto
  //   //and the controller will not be excuted or working
  //   //###########################
  //   //    console.log(body);
  //   //    return body;
  //   // const newProduct: Products = {
  //   //   id: this.products.length + 1,
  //   //   title: body.title,
  //   //   price: body.price,
  //   // };

  //   // if (body.price < 0) {
  //   //   throw new NotFoundException('price must be greater than 0', {
  //   //     cause: 'must not negative',
  //   //   });
  //   // }
  //   // console.log(body);
  //   // this.products.push(newProduct);
  //   // return newProduct;  
  // }

  public async createProduct(dto: CreateProductDto) {
    const newProduct = this.productsRepository.create(dto);
    return await this.productsRepository.save(newProduct);
      console.log("created product ", newProduct);

  }

  // // GET: ~/api/products
  // @Get('/api/products/:id')
  // public getsingleProducts(@Param() param:any) {
  //   console.log(param);
  //   return 'ok'
  // }

  //object destructuring
  // @Get('/api/products/:id')
  // public getsingleProducts(@Param('id') id: string) {
  //   console.log(id);
  //   return 'ok';
  // }

  // public getsingleProducts(id: number) {
  //   console.log(typeof id);
  //   const product = this.products.find((p) => p.id);
  //   if (!product)
  //     throw new NotFoundException(`product not found ${id}`, {
  //       description: 'this is description',
  //     });
  //   return product;
  // }

  public async getsingleProducts(id: number) {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product)
      throw new NotFoundException(`product not found ${id}`, {
        description: 'this is description',
      });
    return product;
  }
  
  //PUT :~/api/product/:id

  // public updateProduct(id: number, body: UpdateProductDto) {
  //   const index = this.products.findIndex((p) => p.id === id);

  //   if (index < 0) {
  //     throw new NotFoundException('Review not found', {
  //       description: 'no reviews found',
  //     });
  //   }
  //   console.log(index);

  //   // Update the existing review in-place
  //   this.products[index] = {
  //     ...this.products[index],
  //     ...body,
  //   };

  //   // - this.products[index]: gets the original object at that index (e.g. { id: 2, name: 'pen', rating: 4 })
  //   // - ...this.products[index]: spreads its existing properties into a new object
  //   // - ...body: then spreads the new update values (e.g. { rating: 9 })
  //   // - The final result replaces the original object at that index with the updated version

  //   //   The ... operator in JavaScript is called the spread operator, and it's one of the most versatile tools in your toolkit. It expands elements of an iterable (like an array or object) into individual elements or properties.
  //   // 🔍 What it does:
  //   // - For arrays: It spreads elements out into a new array or function call.
  //   // - For objects: It spreads key-value pairs into a new object.

  //   return this.products[index]; // Return the updated review
  // }


  public async updateProduct(id: number, UpdateProductDto: UpdateProductDto) {
    const product = await this.getsingleProducts(id);
    product.title = UpdateProductDto.title ?? product.title;
    product.description = UpdateProductDto.description ?? product.description;
    product.price = UpdateProductDto.price ?? product.price;
    return await this.productsRepository.save(product);

    //const result = a ?? b;
//     This means:
// - If a is null or undefined, result becomes b.
// - Otherwise, result becomes a.

  
  }

  // public deleteproduct(id: string) {
  //   const product = this.products.find((p) => p.id === parseInt(id));
  //   if (!product)
  //     throw new NotFoundException(`product not found ${id}`, {
  //       description: 'the product does not deleted',
  //     });

  //   return { message: 'product was deleted' };
  // }

  // public deleteproduct(id: number) {
  //   const product = this.products.find((p) => p.id);
  //   if (!product)
  //     throw new NotFoundException(`product not found ${id}`, {
  //       description: 'the product does not deleted',
  //     });

  //   return { message: 'product was deleted' };
  // }

   public async deleteproduct(id: number) {
    const product = await this.getsingleProducts(id);
    if (!product)
      throw new NotFoundException(`product not found ${id}`, {
        description: 'the product does not deleted',
      });
    await this.productsRepository.remove(product);
    return { message: 'product was deleted' };
   }


}
