import { TIngredient } from '@utils-types';
import ingredientReducer, { fetchIngredients } from '../ingredientsSlice';

const mockIngredients: TIngredient[] = [
  {
    _id: 'bun-id',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'bun-image.png',
    image_mobile: 'bun-mobile.png',
    image_large: 'bun-large.png'
  },
  {
    _id: 'main-id',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'main-image.png',
    image_mobile: 'main-mobile.png',
    image_large: 'main-large.png'
  },
  {
    _id: 'sauce-id',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'sauce-image.png',
    image_mobile: 'sauce-mobile.png',
    image_large: 'sauce-large.png'
  }
];

describe('ingredientsSlice', () => {
  test('обработка экшена начала запроса', () => {
    const state = ingredientReducer(
      undefined,
      fetchIngredients.pending('requestId')
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('обработка экшена успешного выполнения запроса', () => {
    const previousState = {
      items: [],
      isLoading: true,
      error: null
    };

    const payload = mockIngredients;

    const state = ingredientReducer(
      previousState,
      fetchIngredients.fulfilled(payload, 'requestId')
    );

    expect(state.isLoading).toBe(false);
    expect(state.items).toEqual(mockIngredients);
    expect(state.error).toBeNull();
  });

  test('обработка экшена ошибки запроса', () => {
    const previousState = {
      items: mockIngredients,
      isLoading: true,
      error: null
    };

    const error = new Error('Ошибка загрузки');

    const state = ingredientReducer(
      previousState,
      fetchIngredients.rejected(error, 'requestId')
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
