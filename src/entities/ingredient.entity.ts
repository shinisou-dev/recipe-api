import { Column, Entity, OneToMany, type Relation } from 'typeorm';

import { RecipeIngredient } from './recipe-ingredient.entity';

@Entity()
export class Ingredient {
  @Column('varchar', {name: 'name', nullable: false, length: 100, primary: true })
  name!: string;

  @OneToMany(() => RecipeIngredient, recipeIngredient => recipeIngredient.ingredient)
  recipeIngredients!: Relation<RecipeIngredient[]>;
}
