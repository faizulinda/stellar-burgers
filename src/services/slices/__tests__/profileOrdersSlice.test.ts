import profileOrdersReducer, {
  clearProfileOrders,
  fetchProfileOrders
} from '../profileOrdersSlice';
import { TOrder } from '@utils-types';

const mockOrders: TOrder[] = [
  {
    _id: 'profile-order-id-1',
    ingredients: ['ingredient-id-1', 'ingredient-id-2'],
    status: 'done',
    name: 'Краторный бургер',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    number: 1
  },
  {
    _id: 'profile-order-id-2',
    ingredients: ['ingredient-id-3', 'ingredient-id-4'],
    status: 'pending',
    name: 'Марсианский бургер',
    createdAt: '2025-01-02T00:00:00.000Z',
    updatedAt: '2025-01-02T00:00:00.000Z',
    number: 2
  }
];

describe('profileOrdersSlice', () => {
  test('обработка экшена начала загрузки заказов профиля', () => {
    const state = profileOrdersReducer(
      undefined,
      fetchProfileOrders.pending('requestId')
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('обработка экшена успешной загрузки заказов профиля', () => {
    const previousState = {
      orders: [],
      isLoading: true,
      error: null
    };

    const state = profileOrdersReducer(
      previousState,
      fetchProfileOrders.fulfilled(mockOrders, 'requestId')
    );

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
    expect(state.error).toBeNull();
  });

  test('обработка экшена ошибки загрузки заказов профиля', () => {
    const previousState = {
      orders: mockOrders,
      isLoading: true,
      error: null
    };

    const error = new Error('Ошибка загрузки');

    const state = profileOrdersReducer(
      previousState,
      fetchProfileOrders.rejected(error, 'requestId')
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });

  test('очистка заказов профиля', () => {
    const previousState = {
      orders: mockOrders,
      isLoading: false,
      error: null
    };

    const state = profileOrdersReducer(previousState, clearProfileOrders());

    expect(state.orders).toEqual([]);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });
});
