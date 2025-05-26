import { Column, Entity, OneToMany, PrimaryGeneratedColumn, type Relation } from 'typeorm';

import { Rating } from './rating.entity';
import { Recipe } from './recipe.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Recipe, recipe => recipe.creator)
  createdRecipes!: Relation<Recipe[]>;

  @OneToMany(() => Rating, rating => rating.user)
  recipeRatings!: Relation<Rating[]>;

  @Column({ unique: true })
  discordUsername!: string;
}
