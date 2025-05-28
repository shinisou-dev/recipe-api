import { Entity, JoinColumn, type Relation } from 'typeorm';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Ingredient } from './ingredient.entity';
import { Recipe } from './recipe.entity';

@Entity()
export class RecipeIngredient {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.recipeIngredients, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recipe_id' })
  recipe!: Relation<Recipe>;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipeIngredients, { eager: true })
  @JoinColumn({ name: 'ingredient_name', referencedColumnName: 'name' })
  ingredient!: Relation<Ingredient>;

  @Column('decimal', { name: 'quantity', precision: 10, scale: 2 })
  quantity!: number;

  @Column('varchar', { name: 'unit', length: 50 })
  unit!: string;
}