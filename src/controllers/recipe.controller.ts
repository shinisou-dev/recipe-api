import type { Request, Response } from 'express';

import { RecipeService } from '~services/recipe.service';

export class RecipeController {
  private recipeService = new RecipeService();

  getAllRecipes = async (req: Request, res: Response): Promise<void> => {
    try {
      const recipes = await this.recipeService.getAllRecipes();
      res.status(recipes.length === 0 ? 204 : 200).json(recipes);
    } catch (error) {
      console.error('Failed to get recipes:', error);
      res.status(500).json({ message: 'Failed to fetch recipes', error });
    }
  };

  getRecipeById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: 'Recipe ID parameter is required' });
      return;
    }

    const recipeId = parseInt(id);
    if (isNaN(recipeId)) {
      res.status(400).json({ message: 'Invalid recipe ID format' });
      return;
    }

    try {
      const recipe = await this.recipeService.getRecipeById(recipeId);
      if (!recipe) {
        res.status(404).json({ message: 'Recipe not found' });
        return;
      }
      res.status(200).json(recipe);
    } catch (error) {
      console.error('Failed to get recipe:', error);
      res.status(500).json({ message: 'Failed to fetch recipe' });
    }
  };

  createRecipe = async (req: Request, res: Response): Promise<void> => {
    try {
      const newRecipe = await this.recipeService.createRecipe(req.body);
      res.status(201).json(newRecipe);
    } catch (error) {
      console.error('Failed to create recipe:', error);
      res.status(500).json({ message: 'Failed to create recipe' });
    }
  };

  updateRecipe = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: 'Recipe ID parameter is required' });
      return;
    }

    const recipeId = parseInt(id);
    if (isNaN(recipeId)) {
      res.status(400).json({ message: 'Invalid recipe ID format' });
      return;
    }

    try {
      const updatedRecipe = await this.recipeService.updateRecipe(recipeId, req.body);
      if (!updatedRecipe) {
        res.status(404).json({ message: 'Recipe not found' });
        return;
      }
      res.status(200).json(updatedRecipe);
    } catch (error) {
      console.error('Failed to update recipe:', error);
      res.status(500).json({ message: 'Failed to update recipe' });
    }
  };

  deleteRecipe = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: 'Recipe ID parameter is required' });
      return;
    }

    const recipeId = parseInt(id);
    if (isNaN(recipeId)) {
      res.status(400).json({ message: 'Invalid recipe ID format' });
      return;
    }

    try {
      const deleted = await this.recipeService.deleteRecipe(recipeId);
      if (!deleted) {
        res.status(404).json({ message: 'Recipe not found' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      console.error('Failed to delete recipe:', error);
      res.status(500).json({ message: 'Failed to delete recipe' });
    }
  };

  rateRecipe = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: 'Recipe ID parameter is required' });
      return;
    }

    const recipeId = parseInt(id);
    if (isNaN(recipeId)) {
      res.status(400).json({ message: 'Invalid recipe ID format' });
      return;
    }

    try {
      const rating = await this.recipeService.rateRecipe(recipeId, req.body);

      res.status(200).json(rating);
    } catch (error) {
      console.error('Failed to rate recipe:', error);
      res.status(500).json({ message: 'Failed to rate recipe' });
    }
  };
}
