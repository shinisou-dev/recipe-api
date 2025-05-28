import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation
} from 'typeorm';

import { Recipe } from './recipe.entity';
import { User } from './user.entity';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn({ name: 'id' })
  id!: number;

  @ManyToOne(() => User, user => user.recipeRatings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'discordUsername' })
  user!: Relation<User>;

  @ManyToOne(() => Recipe, recipe => recipe.recipeRatings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recipe_id' })
  recipe!: Relation<Recipe>;

  @Column('float', { name: 'rating' })
  rating!: number;

  @Column('text', { name: 'comment', nullable: true })
  comment!: string;

  @CreateDateColumn({ name: 'rated_at' })
  ratedAt!: Date;
}
