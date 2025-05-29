# Recipe API

This is a backend API for managing recipes, ingredients, and user ratings. It uses **[Bun](https://bun.sh/)**, **[TypeScript](https://www.typescriptlang.org/)**, **[Express](https://expressjs.com/)**, **[TypeORM](https://typeorm.io/)**, and **[PostgreSQL](https://www.postgresql.org/)**

The project is currently a work in progress, and more features and routes will be added over time.

---

## Requirements

- [Docker](https://www.docker.com/): For running the PostgreSQL database.
- [Bun](https://bun.sh/): To install dependencies and run the API locally.

---

## Start the PostgreSQL Database

The database runs in Docker using Docker Compose. Make sure Docker is running before proceeding.

### 1. Start the database

```bash
docker compose up --build
```

### 2. Stop the database

```bash
docker compose down
```

To remove the database volume as well to reset all data:

```bash
docker compose down -v
```

## Run the API Locally

### 1. Install needed dependencies

```bash
bun install
```

### Start the API

```bash
bun start
```

Once the server is running the API is available at [http://localhost:3000/api/recipes](http://localhost:3000/api/recipes).

## API Endpoints

These are the available endpoints in the recipe-api. There is also a Postman collection available: [recipe-api.postman_collection.json](https://github.com/shinisou-dev/recipe-api/blob/main/recipe-api.postman_collection.json)

### GET Endpoints

#### Get All Recipes

**Endpoint:** `GET /api/recipes`

**Description:** Retrieves a list of all recipes.

#### Get Recipe by ID

**Endpoint:** `GET /api/recipes/{id}`

**Description:** Retrieves a specific recipe by its ID.

### POST Endpoints

#### Create a Recipe

**Endpoint:** `POST /api/recipes`

**Description:** Creates a new recipe.

**Example Request Body:**

```json
{
  "name": "Pancakes",
  "difficulty": "easy",
  "description": "Fluffy pancakes perfect for breakfast.",
  "instructions": "Mix all ingredients, cook on a griddle until golden brown.",
  "notes": "Serve with honey or fresh fruit.",
  "user": {
    "discordUsername": "testuser#1234"
  },
  "recipeIngredients": [
    {
      "ingredient": {
        "name": "Milk"
      },
      "quantity": 350,
      "unit": "ml"
    },
    {
      "ingredient": {
        "name": "Flour"
      },
      "quantity": 150,
      "unit": "g"
    },
    {
      "ingredient": {
        "name": "Egg"
      },
      "quantity": 1,
      "unit": "large"
    }
  ]
}
```

#### Rate a Recipe

**Endpoint:** `POST /api/recipes/{id}/rate`

**Description:** Allows a user to rate a recipe.

**Example Request Body:**

```json
{
  "user": {
    "discordUsername": "testuser#1234"
  },
  "rating": 5
}
```

### PUT Endpoints

#### Update a Recipe

**Endpoint:** `PUT /api/recipes/{id}`

**Description:** Updates an existing recipe.

**Example Request Body:**

```json
{
  "difficulty": "medium"
}
```

### DELETE Endpoints

#### Delete a Recipe

**Endpoint:** `DELETE /api/recipes/{id}`

**Description:** Deletes a recipe by its ID.
