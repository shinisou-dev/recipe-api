import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, type Relation } from 'typeorm';

import { Rating } from './rating.entity';
import { RecipeIngredient } from './recipe-ingredient.entity';
import { User } from './user.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, user => user.createdRecipes)
  creator!: Relation<User>;

  @OneToMany(() => RecipeIngredient, recipeIngredient => recipeIngredient.recipe, { cascade: true })
  recipeIngredients!: Relation<RecipeIngredient[]>;

  @OneToMany(() => Rating, rating => rating.recipe, { cascade: true })
  recipeRatings!: Relation<Rating[]>;

  @Column('varchar', { length: 100 })
  name!: string;

  @Column('text')
  instructions!: string;

  @Column('text', { nullable: true })
  notes?: string;
}
