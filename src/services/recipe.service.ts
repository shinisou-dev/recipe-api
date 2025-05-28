import { AppDataSource } from 'data-source';

import { Ingredient, Rating, Recipe, User } from '~entities/index';

export class RecipeService {
  private recipeRepo = AppDataSource.getRepository(Recipe);
  private ingredientRepo = AppDataSource.getRepository(Ingredient);
  private userRepo = AppDataSource.getRepository(User);
  private ratingRepo = AppDataSource.getRepository(Rating);

  async getAllRecipes(): Promise<Recipe[]> {
    return this.recipeRepo.find({
      relations: ['user', 'recipeIngredients', 'recipeIngredients.ingredient', 'recipeRatings']
    });
  }

  async getRecipeById(id: number): Promise<Recipe | null> {
    return this.recipeRepo.findOne({
      where: { id },
      relations: ['user', 'recipeIngredients', 'recipeIngredients.ingredient', 'recipeRatings']
    });
  }

  async createRecipe(data: Partial<Recipe>): Promise<Recipe> {
    if (data.user?.discordUsername) {
      const existingUser = await this.userRepo.findOneBy({ discordUsername: data.user.discordUsername });

      if (!existingUser) {
        console.log(`User with discordUsername ${data.user.discordUsername} does not exist. Creating new user.`);
        const newUser = this.userRepo.create(data.user);
        await this.userRepo.save(newUser);
      }
    }

    for (const recipeIngredient of data.recipeIngredients || []) {
      const existingIngredient = await this.ingredientRepo.findOneBy({ name: recipeIngredient.ingredient.name });

      if (!existingIngredient) {
        const newIngredient = this.ingredientRepo.create(recipeIngredient.ingredient);
        await this.ingredientRepo.save(newIngredient);
      }
    }

    const newRecipe = this.recipeRepo.create(data);
    return this.recipeRepo.save(newRecipe);
  }

  async updateRecipe(id: number, data: Partial<Recipe>): Promise<Recipe | null> {
    const recipe = await this.recipeRepo.findOneBy({ id });
    if (!recipe) return null;

    Object.assign(recipe, data);
    return this.recipeRepo.save(recipe);
  }

  async deleteRecipe(id: number): Promise<boolean> {
    const result = await this.recipeRepo.delete(id);
    return result.affected !== 0;
  }

  async rateRecipe(recipeId: number, data: Partial<Rating>): Promise<Rating> {
    const existingRecipe = await this.recipeRepo.findOneBy({
      id: recipeId
    });

    if (!existingRecipe) {
      throw new Error(`Recipe with ID ${recipeId} not found`);
    }

    const existingRating = await this.ratingRepo.findOneBy({
      recipe: { id: recipeId },
      user: { discordUsername: data.user?.discordUsername }
    });

    if (existingRating) {
      return await this.ratingRepo.save({ ...existingRating, rating: data.rating });
    } else {
      const newRating = this.ratingRepo.create({
        recipe: { id: recipeId },
        user: { discordUsername: data.user?.discordUsername },
        rating: data.rating
      });
      return await this.ratingRepo.save(newRating);
    }
  }
}
