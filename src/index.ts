import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import 'reflect-metadata';

import { AppDataSource } from './data-source';
import recipeRouter from '~routers/recipe.router';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/recipes', recipeRouter);

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');

    app.listen(3000, () => {
      console.log('Server is running at http://localhost:3000');
    });
  })
  .catch(error => {
    console.error('Error during Data Source initialization:', error);
  });
