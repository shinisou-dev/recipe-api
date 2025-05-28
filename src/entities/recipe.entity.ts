import { Difficulty } from 'enums/recipe-difficulty.enum';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, type Relation } from 'typeorm';

import { Rating } from './rating.entity';
import { RecipeIngredient } from './recipe-ingredient.entity';
import { User } from './user.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @ManyToOne(() => User, (user) => user.createdRecipes, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user!: Relation<User>;

  @OneToMany(() => RecipeIngredient, recipeIngredient => recipeIngredient.recipe, { cascade: true })
  recipeIngredients!: Relation<RecipeIngredient[]>;

  @OneToMany(() => Rating, rating => rating.recipe, { cascade: true })
  recipeRatings!: Relation<Rating[]>;

  @Column('varchar', { name: 'name', length: 100})
  name!: string;

  @Column({
    name: 'difficulty',
    type: 'enum',
    enum: Difficulty,
    default: Difficulty.MEDIUM,
  })
  difficulty!: Difficulty;

  @Column('varchar', {name: 'description', length: 500 })
  description?: string;

  @Column('text', { name: 'instructions' })
  instructions!: string;

  @Column('text', { name: 'notes', nullable: true })
  notes?: string;
}
