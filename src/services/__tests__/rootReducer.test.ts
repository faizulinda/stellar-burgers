import { rootReducer } from '../store';
import ingredientsReducer from '../slices/ingredientsSlice';
import constructorReducer from '../slices/constructorSlice';
import orderReducer from '../slices/orderSlice';
import feedReducer from '../slices/feedSlice';
import authReducer from '../slices/authSlice';
import profileOrdersReducer from '../slices/profileOrdersSlice';

describe('rootReducer', () => {
  it('корректная инициализация начального состояния', () => {
    const initAction = { type: '@@INIT' };
    const state = rootReducer(undefined, initAction);

    expect(state).toEqual({
      ingredients: ingredientsReducer(undefined, initAction),
      constructorBurger: constructorReducer(undefined, initAction),
      order: orderReducer(undefined, initAction),
      feed: feedReducer(undefined, initAction),
      auth: authReducer(undefined, initAction),
      profileOrders: profileOrdersReducer(undefined, initAction)
    });
  });

  it('корректная обработка неизвестного экшена', () => {
    const fakeAction = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, fakeAction);

    expect(state).toEqual({
      ingredients: ingredientsReducer(undefined, fakeAction),
      constructorBurger: constructorReducer(undefined, fakeAction),
      order: orderReducer(undefined, fakeAction),
      feed: feedReducer(undefined, fakeAction),
      auth: authReducer(undefined, fakeAction),
      profileOrders: profileOrdersReducer(undefined, fakeAction)
    });
  });
});
