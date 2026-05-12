import constructorReducer, {
  addIngredient,
  clearConstructor,
  moveIngredientDown,
  moveIngredientUp,
  removeIngredient
} from '../constructorSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';

const bun: TIngredient = {
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
};

const mainIngredient: TIngredient = {
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
};

const sauceIngredient: TIngredient = {
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
};

const mainConstructorIngredient: TConstructorIngredient = {
  ...mainIngredient,
  id: 'main-constructor-id'
};

const sauceConstructorIngredient: TConstructorIngredient = {
  ...sauceIngredient,
  id: 'sauce-constructor-id'
};

describe('constructorSlice', () => {
  test('добавление булки', () => {
    const state = constructorReducer(undefined, addIngredient(bun));

    expect(state.bun).toEqual(bun);
    expect(state.ingredients).toEqual([]);
  });

  test('добавление главного ингредиента', () => {
    const state = constructorReducer(undefined, addIngredient(mainIngredient));

    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toMatchObject(mainIngredient);
    expect(state.ingredients[0].id).toBeDefined();
  });

  test('добавление соуса', () => {
    const state = constructorReducer(undefined, addIngredient(sauceIngredient));

    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toMatchObject(sauceIngredient);
    expect(state.ingredients[0].id).toBeDefined();
  });

  test('поднятие соуса вверх делает соус первым ингредиентом', () => {
    const initialState = {
      bun,
      ingredients: [mainConstructorIngredient, sauceConstructorIngredient]
    };

    const state = constructorReducer(initialState, moveIngredientUp(1));

    expect(state.ingredients[0]).toEqual(sauceConstructorIngredient);
    expect(state.ingredients[1]).toEqual(mainConstructorIngredient);
  });

  test('повторное поднятие соуса вверх оставляет соус первым ингредиентом', () => {
    const initialState = {
      bun,
      ingredients: [sauceConstructorIngredient, mainConstructorIngredient]
    };

    const state = constructorReducer(initialState, moveIngredientUp(0));

    expect(state.ingredients[0]).toEqual(sauceConstructorIngredient);
    expect(state.ingredients[1]).toEqual(mainConstructorIngredient);
  });

  test('опускание соуса вниз делает соус вторым ингредиентом', () => {
    const initialState = {
      bun,
      ingredients: [sauceConstructorIngredient, mainConstructorIngredient]
    };

    const state = constructorReducer(initialState, moveIngredientDown(0));

    expect(state.ingredients[0]).toEqual(mainConstructorIngredient);
    expect(state.ingredients[1]).toEqual(sauceConstructorIngredient);
  });

  test('удаление главного ингредиента', () => {
    const initialState = {
      bun,
      ingredients: [mainConstructorIngredient, sauceConstructorIngredient]
    };

    const state = constructorReducer(
      initialState,
      removeIngredient(mainConstructorIngredient.id)
    );

    expect(state.bun).toEqual(bun);
    expect(state.ingredients).toEqual([sauceConstructorIngredient]);
  });

  test('удаление соуса', () => {
    const initialState = {
      bun,
      ingredients: [mainConstructorIngredient, sauceConstructorIngredient]
    };

    const state = constructorReducer(
      initialState,
      removeIngredient(sauceConstructorIngredient.id)
    );

    expect(state.bun).toEqual(bun);
    expect(state.ingredients).toEqual([mainConstructorIngredient]);
  });

  test('очистка конструктора', () => {
    const initialState = {
      bun,
      ingredients: [mainConstructorIngredient, sauceConstructorIngredient]
    };

    const state = constructorReducer(initialState, clearConstructor());

    expect(state).toEqual({
      bun: null,
      ingredients: []
    });
  });
});
