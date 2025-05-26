import { Entity, type Relation } from 'typeorm';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Ingredient } from './ingredient.entity';
import { Recipe } from './recipe.entity';

@Entity()
export class RecipeIngredient {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Recipe, recipe => recipe.recipeIngredients)
  recipe!: Relation<Recipe>;

  @ManyToOne(() => Ingredient, ingredient => ingredient.recipeIngredients)
  ingredient!: Relation<Ingredient>;

  @Column('decimal', { precision: 10, scale: 2 })
  quantity!: number;

  @Column('varchar', { length: 50 })
  unit!: string;

  @Column('boolean', { default: false })
  optional!: boolean;
}
