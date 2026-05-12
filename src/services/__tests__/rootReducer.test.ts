import { rootReducer } from '../store';

describe('rootReducer', () => {
  test('корректная инициализация rootReducer', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('constructorBurger');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('auth');
    expect(state).toHaveProperty('profileOrders');
  });
});
