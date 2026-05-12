import feedReducer, { fetchFeed } from '../feedSlice';
import { TOrder } from '@utils-types';

const mockOrders: TOrder[] = [
  {
    _id: 'order-id-1',
    ingredients: ['ingredient-id-1', 'ingredient-id-2'],
    status: 'done',
    name: 'Краторный бургер',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
    number: 1
  },
  {
    _id: 'order-id-2',
    ingredients: ['ingredient-id-3', 'ingredient-id-4'],
    status: 'pending',
    name: 'Марсианский бургер',
    createdAt: '2025-01-02T00:00:00.000Z',
    updatedAt: '2025-01-02T00:00:00.000Z',
    number: 2
  }
];

describe('feedSlice', () => {
  test('обработка экшена начала запроса', () => {
    const state = feedReducer(undefined, fetchFeed.pending('requestId'));

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('обработка экшена успешного выполнения запроса', () => {
    const previousState = {
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: true,
      error: null
    };

    const payload = {
      success: true,
      orders: mockOrders,
      total: 100,
      totalToday: 10
    };

    const state = feedReducer(
      previousState,
      fetchFeed.fulfilled(payload, 'requestId')
    );

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(10);
    expect(state.error).toBeNull();
  });

  test('обработка экшена ошибки запроса', () => {
    const previousState = {
      orders: mockOrders,
      total: 100,
      totalToday: 10,
      isLoading: true,
      error: null
    };

    const error = new Error('Ошибка загрузки');

    const state = feedReducer(
      previousState,
      fetchFeed.rejected(error, 'requestId')
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});