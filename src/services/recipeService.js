import { ref } from 'vue';

const initialRecipes = [
  {
    id: 1,
    title: 'Pasta Carbonara Tradicional',
    category: 'Pasta',
    time: 25,
    difficulty: 'Fácil',
    description: 'Auténtica receta italiana de pasta carbonara con guanciale, huevo y queso pecorino.',
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
      'Verter la mezcla de huevo y queso revolviendo rápidamente para crear una crema sin cuajar el huevo.'
    ]
  },
  {
    id: 2,
    title: 'Tacos al Pastor Caseros',
    category: 'Mexicana',
    time: 45,
    difficulty: 'Media',
    description: 'Machihembrado de carne de cerdo marinada en adobo de achiote con piña, cilantro y cebolla.',
    ingredients: [
      '500g de Filete de cerdo',
      '2 cdas de Pasta de achiote',
      '3 Chiles guajillo hidratados',
      '1/2 taza de Jugo de naranja',
      'Tortillas de maíz, piña, cebolla y cilantro'
    ],
    steps: [
      'Licuar los chiles, achiote, jugo de naranja y especias para crear el adobo.',
      'Marinar la carne cortada en tiras delgadas durante al menos 30 minutos.',
      'Cocer la carne a fuego alto en una sartén bien caliente.',
      'Servir sobre tortillas calientes con piña asada, cebolla picada y cilantro.'
    ]
  },
  {
    id: 3,
    title: 'Ensalada César con Pollo',
    category: 'Ensaladas',
    time: 15,
    difficulty: 'Fácil',
    description: 'Ensalada fresca con lechuga orejona, pechuga de pollo a la plancha, crutones y aderezo César.',
    ingredients: [
      '1 Lechuga orejona lavada y troceada',
      '1 Pechuga de pollo asada y fileteada',
      '1/2 taza de Crutones de pan',
      'Queso parmesano rallado',
      'Aderezo César'
    ],
    steps: [
      'Sazonar y asar la pechuga de pollo hasta que esté bien cocida.',
      'Mezclar la lechuga en un tazón amplio con los crutones.',
      'Agregar el pollo fileteado arriba y espolvorear el queso parmesano.',
      'Bañar con el aderezo César justo antes de servir.'
    ]
  }
];

const recipes = ref([...initialRecipes]);

export const recipeService = {
  getAll() {
    return recipes.value;
  },
  getById(id) {
    return recipes.value.find((r) => r.id === Number(id));
  },
  create(newRecipe) {
    const created = {
      ...newRecipe,
      id: Date.now(),
      time: Number(newRecipe.time)
    };
    recipes.value.unshift(created);
    return Promise.resolve(created);
  }
};