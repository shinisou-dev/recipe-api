import { Router } from 'express';

import { RecipeController } from '~controllers/recipe.controller';

const router = Router();
const recipeController = new RecipeController();

router.get('/', recipeController.getAllRecipes);
router.get('/:id', recipeController.getRecipeById);
router.post('/', recipeController.createRecipe);
router.put('/:id', recipeController.updateRecipe);
router.delete('/:id', recipeController.deleteRecipe);

router.post('/:id/rate', recipeController.rateRecipe);

export default router;
