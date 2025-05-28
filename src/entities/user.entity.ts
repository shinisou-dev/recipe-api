import { Column, Entity, OneToMany, type Relation } from 'typeorm';

import { Rating } from './rating.entity';
import { Recipe } from './recipe.entity';

@Entity()
export class User {
  @Column({ name: 'discord_username', unique: true, nullable: false, primary: true })
  discordUsername!: string;

  @OneToMany(() => Recipe, recipe => recipe.user)
  createdRecipes!: Relation<Recipe[]>;

  @OneToMany(() => Rating, rating => rating.user)
  recipeRatings!: Relation<Rating[]>;
}
