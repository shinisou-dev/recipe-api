import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, type Relation } from 'typeorm';

import { Recipe } from './recipe.entity';
import { User } from './user.entity';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, user => user.recipeRatings)
  user!: Relation<User>;

  @ManyToOne(() => Recipe, recipe => recipe.recipeRatings)
  recipe!: Relation<Recipe>;

  @Column('float')
  rating!: number;

  @Column('text', { nullable: true })
  comment!: string;

  @CreateDateColumn()
  ratedAt!: Date;
}
