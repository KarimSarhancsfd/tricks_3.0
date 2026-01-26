import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';

import { CURRENT_TIMESTAMP } from '../utils/constants';
import { Product } from '../products/product.entity';
import { Review } from '../reviews/review.entity';
import { UserType} from '../utils/enum'; // Import the UserType enum
import {Exclude} from "class-transformer"





@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150, nullable: true })
  username: string;

  @Column({type: 'varchar', length: 250, unique: true })
  email: string;


   @Column()
   @Exclude() //if we want to remove email we need then to add exclude decoratore to email or password
  password: string;

    @Column({type: 'enum', enum: UserType, default: UserType.NORMAL_USER })
  userType: UserType;

     @Column({default: false})
  isAccountVerified: boolean;

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

  profileImage:string;




  @OneToMany(() => Product, (product) => product.user)
  // Establishing a one-to-many relationship with Product
  products: Product[];
    // A user can have multiple products associated with it


    @OneToMany(() => Review, (review) => review.user)
    review:Review[];



  
}
