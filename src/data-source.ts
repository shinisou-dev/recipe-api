import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { Ingredient, Rating, Recipe, RecipeIngredient, User } from '~entities/index';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USER || 'admin',
  password: process.env.POSTGRES_PASSWORD || 'admin',
  database: process.env.POSTGRES_DB || 'recipe_db',
  synchronize: true,
  logging: true,
  entities: [User, Recipe, Ingredient, RecipeIngredient, Rating]
});
