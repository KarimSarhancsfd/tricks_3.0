import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
// import { UserService } from 'src/users/user.service';
import { ReviewsService } from '../reviews/reviews.service';
import { Product } from './product.entity';
import { Repository , Like} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/user.service';

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
    private readonly productsRepository: Repository<Product>,
    private readonly userService: UsersService
  ){}

  // public getAllProducts() {
  //   // return this.products;
  //   const products = this.products;
  //   // const users = this.usersService.getAllUsers(); // Assuming getAllUsers is a method in UserService
  //   // return {products,users}
  // }

  public async getAllProducts(title?: string) {
   
  // const products =  await this.productsRepository.find();
  // console.log('Fetched products:', products);
  // return products;


   return this.productsRepository.find({where: {title: Like(`%${title}%`)}});

  // return this.productsRepository.find({relations: {user: true, reviews: true}})


  }



  /**
   * 
   * @param dto 
   * @param userId 
   * @returns 
   */

  public async createProduct(dto: CreateProductDto, userId:number) {
 const user = await this.userService.getCurrentUser(userId)
 const newProduct = this.productsRepository.create({
  ...dto,//BOOK -> book
  title: dto.title.toLowerCase(),
  user
 });
 return this.productsRepository.save(newProduct)

  }




  /**
   * get one product by id
   * @param id id of the product
   * @returns product from database
   */


  public async getsingleProducts(id: number) {
    const product = await this.productsRepository.findOne(  { where: {id}  });
    if (!product)
      throw new NotFoundException(`product not found ${id}`, {
        description: 'this is description',
      });
    return product;
  }






  /**
   * Update prouct
   * @param id id of the product
   * @param UpdateProductDto 
   * @param dto data for updating the existing product
   * @returns the updated product
   */
  



  public async updateProduct(id: number, UpdateProductDto: UpdateProductDto) {
    const product = await this.getsingleProducts(id);
    product.title = UpdateProductDto.title ?? product.title;
    product.description = UpdateProductDto.description ?? product.description;
    product.price = UpdateProductDto.price ?? product.price;
    return await this.productsRepository.save(product);



  
  }


  /**
   * Delete product
   * @param id id of the product
   * @returns a success message
   */


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
