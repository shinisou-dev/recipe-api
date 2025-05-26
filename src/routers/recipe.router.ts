import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  /*
  const { filter, sortBy, sortDirection } = req.query;


  let recipes: Record<string, string>[] = [];

  if (filter) {
    recipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(filter.toString().toLowerCase()));
  }

  if (sortBy === 'name') {
    recipes.sort((a, b) => (sortDirection === 'desc' ? (a.name < b.name ? 1 : 0) : a.name > b.name ? 1 : 0));
  } else if (sortBy === 'rating') {
    recipes.sort((a, b) => (sortDirection === 'desc' ? (a.rating < b.rating ? 1 : 0) : a.rating > b.rating ? 1 : 0));
  }
    */

  res.send('wohoo');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  res.send(`Hello from recipes/${id}`);
});

export default router;
