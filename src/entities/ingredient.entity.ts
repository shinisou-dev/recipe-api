import { Column, Entity, OneToMany, PrimaryGeneratedColumn, type Relation } from 'typeorm';

import { RecipeIngredient } from './recipe-ingredient.entity';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => RecipeIngredient, recipeIngredient => recipeIngredient.ingredient)
  recipeIngredients!: Relation<RecipeIngredient[]>;

  @Column('varchar', { length: 100 })
  name!: string;
}
