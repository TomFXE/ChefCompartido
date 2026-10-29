import { ref } from 'vue';
import { authService } from './authService';

const STORAGE_KEY = 'chefcompartido_recipes';

const initialRecipes = [
  {
    id: 1,
    title: 'Pasta Carbonara Tradicional',
    category: 'Pasta',
    time: 25,
    difficulty: 'Fácil',
    description:
      'Auténtica receta italiana de pasta carbonara con guanciale, huevo y queso pecorino.',
    ingredients: [
      '200g de Spaghetti',
      '100g de Guanciale o Panceta',
      '2 Huevos enteros + 1 yema',
      '50g de Queso Pecorino Romano',
      'Pimienta negra recién molida'
    ],
    steps: [
      'Poner a hervir abundante agua con sal y cocinar la pasta.',
      'Dorar el guanciale en una sartén a fuego medio hasta que esté crujiente.',
      'Batir los huevos con el queso pecorino y abundante pimienta negra.',
      'Mezclar la pasta al dente con el guanciale y retirar del fuego.',
      'Verter la mezcla de huevo y queso revolviendo rápidamente.'
    ],
    comments: [],
    ratings: []
  },
  {
    id: 2,
    title: 'Tacos al Pastor Caseros',
    category: 'Mexicana',
    time: 45,
    difficulty: 'Media',
    description:
      'Carne de cerdo marinada en adobo de achiote con piña, cilantro y cebolla.',
    ingredients: [
      '500g de Filete de cerdo',
      '2 cdas de Pasta de achiote',
      '3 Chiles guajillo hidratados',
      '1/2 taza de Jugo de naranja',
      'Tortillas de maíz, piña, cebolla y cilantro'
    ],
    steps: [
      'Licuar los chiles, achiote, jugo de naranja y especias.',
      'Marinar la carne durante al menos 30 minutos.',
      'Cocer la carne en una sartén caliente.',
      'Servir con piña, cebolla y cilantro.'
    ],
    comments: [],
    ratings: []
  },
  {
    id: 3,
    title: 'Ensalada César con Pollo',
    category: 'Ensaladas',
    time: 15,
    difficulty: 'Fácil',
    description:
      'Ensalada fresca con lechuga, pollo a la plancha, crutones y aderezo César.',
    ingredients: [
      '1 Lechuga orejona',
      '1 Pechuga de pollo',
      '1/2 taza de Crutones',
      'Queso parmesano',
      'Aderezo César'
    ],
    steps: [
      'Sazonar y asar la pechuga.',
      'Mezclar la lechuga con los crutones.',
      'Agregar el pollo y el queso.',
      'Añadir el aderezo antes de servir.'
    ],
    comments: [],
    ratings: []
  }
];

const normalizeRecipe = (recipe) => ({
  ...recipe,
  comments: Array.isArray(recipe.comments) ? recipe.comments : [],
  ratings: Array.isArray(recipe.ratings) ? recipe.ratings : []
});

const loadRecipes = () => {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return initialRecipes.map(normalizeRecipe);
  }

  try {
    return JSON.parse(saved).map(normalizeRecipe);
  } catch {
    return initialRecipes.map(normalizeRecipe);
  }
};

const recipes = ref(loadRecipes());

const saveRecipes = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes.value));
};

const findRecipe = (recipeId) => {
  const recipe = recipes.value.find(
    (item) => item.id === Number(recipeId)
  );

  if (!recipe) {
    throw new Error('No se encontró la receta.');
  }

  return recipe;
};

export const recipeService = {
  recipes,

  getAll() {
    return recipes.value;
  },

  getById(id) {
    return recipes.value.find(
      (recipe) => recipe.id === Number(id)
    );
  },

  create(newRecipe) {
    const user = authService.requireAuth();

    const created = normalizeRecipe({
      ...newRecipe,
      id: Date.now(),
      time: Number(newRecipe.time),
      authorId: user.id,
      author: user.name
    });

    recipes.value.unshift(created);
    saveRecipes();

    return Promise.resolve(created);
  },

  addComment(recipeId, text) {
    const user = authService.requireAuth();
    const cleanText = text.trim();

    if (cleanText.length < 3) {
      throw new Error(
        'El comentario debe contener al menos 3 caracteres.'
      );
    }

    if (cleanText.length > 500) {
      throw new Error(
        'El comentario no puede superar los 500 caracteres.'
      );
    }

    const recipe = findRecipe(recipeId);

    const comment = {
      id: Date.now(),
      userId: user.id,
      userName: user.name,
      text: cleanText,
      createdAt: new Date().toISOString()
    };

    recipe.comments.unshift(comment);
    saveRecipes();

    return comment;
  },

  deleteComment(recipeId, commentId) {
    const user = authService.requireAuth();
    const recipe = findRecipe(recipeId);

    const comment = recipe.comments.find(
      (item) => item.id === Number(commentId)
    );

    if (!comment) {
      throw new Error('No se encontró el comentario.');
    }

    if (comment.userId !== user.id) {
      throw new Error(
        'Solo puedes eliminar tus propios comentarios.'
      );
    }

    recipe.comments = recipe.comments.filter(
      (item) => item.id !== Number(commentId)
    );

    saveRecipes();
  },

  rateRecipe(recipeId, score) {
    const user = authService.requireAuth();
    const numericScore = Number(score);

    if (
      !Number.isInteger(numericScore) ||
      numericScore < 1 ||
      numericScore > 5
    ) {
      throw new Error(
        'La calificación debe estar entre 1 y 5 estrellas.'
      );
    }

    const recipe = findRecipe(recipeId);

    const existingRating = recipe.ratings.find(
      (rating) => rating.userId === user.id
    );

    if (existingRating) {
      existingRating.score = numericScore;
      existingRating.updatedAt = new Date().toISOString();
    } else {
      recipe.ratings.push({
        userId: user.id,
        userName: user.name,
        score: numericScore,
        createdAt: new Date().toISOString()
      });
    }

    saveRecipes();

    return this.getRatingSummary(recipeId);
  },

  getUserRating(recipeId) {
    if (!authService.currentUser.value) {
      return 0;
    }

    const recipe = findRecipe(recipeId);

    return (
      recipe.ratings.find(
        (rating) =>
          rating.userId === authService.currentUser.value.id
      )?.score || 0
    );
  },

  getRatingSummary(recipeId) {
    const recipe = findRecipe(recipeId);
    const total = recipe.ratings.length;

    if (total === 0) {
      return {
        average: 0,
        total: 0
      };
    }

    const sum = recipe.ratings.reduce(
      (accumulator, rating) =>
        accumulator + Number(rating.score),
      0
    );

    return {
      average: Number((sum / total).toFixed(1)),
      total
    };
  }
};