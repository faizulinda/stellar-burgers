import orderReducer, {
  clearOrderModalData,
  createOrder,
  fetchOrderByNumber
} from '../orderSlice';
import { TOrder } from '@utils-types';

const mockOrder: TOrder = {
  _id: 'order-id-1',
  ingredients: ['ingredient-id-1', 'ingredient-id-2'],
  status: 'done',
  name: 'Краторный бургер',
  createdAt: '2025-01-01T00:00:00.000Z',
  updatedAt: '2025-01-01T00:00:00.000Z',
  number: 1
};

const selectedMockOrder: TOrder = {
  _id: 'order-id-2',
  ingredients: ['ingredient-id-3', 'ingredient-id-4'],
  status: 'pending',
  name: 'Марсианский бургер',
  createdAt: '2025-01-02T00:00:00.000Z',
  updatedAt: '2025-01-02T00:00:00.000Z',
  number: 2
};

const mockCreatedOrder = {
  _id: 'created-order-id-1',
  ingredients: ['ingredient-id-1', 'ingredient-id-2'],
  status: 'done',
  name: 'Краторный бургер',
  owner: {
    name: 'Test User',
    email: 'test@example.com',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z'
  },
  createdAt: '2025-01-01T00:00:00.000Z',
  updatedAt: '2025-01-01T00:00:00.000Z',
  number: 1,
  price: 1000
};

describe('orderSlice', () => {
  describe('createOrder', () => {
    test('обработка экшена начала оформления заказа', () => {
      const state = orderReducer(
        undefined,
        createOrder.pending('requestId', [])
      );

      expect(state.orderRequest).toBe(true);
      expect(state.error).toBeNull();
    });

    test('обработка экшена успешного оформления заказа', () => {
      const previousState = {
        orderRequest: true,
        orderModalData: null,
        error: null,
        selectedOrder: null,
        selectedOrderRequest: false,
        selectedOrderError: null
      };

      const state = orderReducer(
        previousState,
        createOrder.fulfilled(
          mockCreatedOrder,
          'requestId',
          mockCreatedOrder.ingredients
        )
      );

      expect(state.orderRequest).toBe(false);
      expect(state.orderModalData).toEqual(mockCreatedOrder);
      expect(state.error).toBeNull();
    });

    test('обработка экшена ошибки оформления заказа', () => {
      const previousState = {
        orderRequest: true,
        orderModalData: null,
        error: null,
        selectedOrder: null,
        selectedOrderRequest: false,
        selectedOrderError: null
      };

      const error = new Error('Ошибка оформления');

      const state = orderReducer(
        previousState,
        createOrder.rejected(error, 'requestId', mockCreatedOrder.ingredients)
      );

      expect(state.orderRequest).toBe(false);
      expect(state.error).toBe('Ошибка оформления');
    });
  });

  describe('fetchOrderByNumber', () => {
    test('обработка экшена начала загрузки заказа по номеру', () => {
      const state = orderReducer(
        undefined,
        fetchOrderByNumber.pending('requestId', 1)
      );

      expect(state.selectedOrderRequest).toBe(true);
      expect(state.selectedOrderError).toBeNull();
    });

    test('обработка экшена успешной загрузки заказа по номеру', () => {
      const previousState = {
        orderRequest: false,
        orderModalData: null,
        error: null,
        selectedOrder: null,
        selectedOrderRequest: true,
        selectedOrderError: null
      };

      const state = orderReducer(
        previousState,
        fetchOrderByNumber.fulfilled(selectedMockOrder, 'requestId', 2)
      );

      expect(state.selectedOrderRequest).toBe(false);
      expect(state.selectedOrder).toEqual(selectedMockOrder);
      expect(state.selectedOrderError).toBeNull();
    });

    test('обработка экшена ошибки загрузки заказа по номеру', () => {
      const previousState = {
        orderRequest: false,
        orderModalData: null,
        error: null,
        selectedOrder: null,
        selectedOrderRequest: true,
        selectedOrderError: null
      };

      const error = new Error('Ошибка загрузки');

      const state = orderReducer(
        previousState,
        fetchOrderByNumber.rejected(error, 'requestId', 2)
      );

      expect(state.selectedOrderRequest).toBe(false);
      expect(state.selectedOrderError).toBe('Ошибка загрузки');
    });
  });

  test('очистка данных модального окна заказа', () => {
    const previousState = {
      orderRequest: false,
      orderModalData: mockOrder,
      error: null,
      selectedOrder: null,
      selectedOrderRequest: false,
      selectedOrderError: null
    };

    const state = orderReducer(previousState, clearOrderModalData());

    expect(state.orderModalData).toBeNull();
  });
});
