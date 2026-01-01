import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { CURRENT_TIMESTAMP } from '../utils/constants';

import { Product } from '../products/product.entity';
import { User } from '../users/user.entity';

@Entity({ name: 'reviews' })
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  rating: number;

  @Column()
  comment: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => CURRENT_TIMESTAMP,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: () => CURRENT_TIMESTAMP,
    onUpdate: CURRENT_TIMESTAMP,
  })
  updatedAt: Date;
   @ManyToOne(() => Product, (product) => product.reviews, {eager:true})
   //amany to-one relationship with Product
  // the first argument is a function that returns the Product entity or the target function
  // the second argument is a function that returns the reviews associated with the product
   product: Product;
    // Establishing a many-to-one relationship with Product
    // A reviews belongs to a single product

  @ManyToOne(() => User, (user) => user.review, {eager:true, onDelete: "CASCADE"})
    user: User;
  
}
