import authReducer, {
  checkUserAuth,
  clearAuthError,
  loginUser,
  logoutUser,
  registerUser,
  setAuthChecked,
  updateUser
} from '../authSlice';
import { TUser } from '@utils-types';

const mockUser: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};

describe('authSlice', () => {
  test('обработка экшена начала регистрации пользователя', () => {
    const state = authReducer(
      undefined,
      registerUser.pending('requestId', {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password'
      })
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('обработка экшена успешной регистрации пользователя', () => {
    const previousState = {
      user: null,
      isAuthChecked: false,
      isLoading: true,
      error: null,
      updateUserError: null
    };

    const state = authReducer(
      previousState,
      registerUser.fulfilled(mockUser, 'requestId', {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password'
      })
    );

    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toEqual(mockUser);
    expect(state.error).toBeNull();
  });

  test('обработка экшена ошибки регистрации пользователя', () => {
    const previousState = {
      user: null,
      isAuthChecked: false,
      isLoading: true,
      error: null,
      updateUserError: null
    };

    const error = new Error('Ошибка регистрации');

    const state = authReducer(
      previousState,
      registerUser.rejected(error, 'requestId', {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password'
      })
    );

    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.error).toBe('Ошибка регистрации');
  });

  test('обработка экшена начала входа пользователя', () => {
    const state = authReducer(
      undefined,
      loginUser.pending('requestId', {
        email: 'test@example.com',
        password: 'password'
      })
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('обработка экшена успешного входа пользователя', () => {
    const previousState = {
      user: null,
      isAuthChecked: false,
      isLoading: true,
      error: null,
      updateUserError: null
    };

    const state = authReducer(
      previousState,
      loginUser.fulfilled(mockUser, 'requestId', {
        email: 'test@example.com',
        password: 'password'
      })
    );

    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toEqual(mockUser);
    expect(state.error).toBeNull();
  });

  test('обработка экшена ошибки входа пользователя', () => {
    const previousState = {
      user: null,
      isAuthChecked: false,
      isLoading: true,
      error: null,
      updateUserError: null
    };

    const error = new Error('Ошибка входа');

    const state = authReducer(
      previousState,
      loginUser.rejected(error, 'requestId', {
        email: 'test@example.com',
        password: 'password'
      })
    );

    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.error).toBe('Ошибка входа');
  });

  test('обработка экшена успешного выхода пользователя', () => {
    const previousState = {
      user: mockUser,
      isAuthChecked: false,
      isLoading: true,
      error: null,
      updateUserError: null
    };

    const state = authReducer(
      previousState,
      logoutUser.fulfilled(undefined, 'requestId', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });

  test('обработка экшена успешной проверки авторизации пользователя', () => {
    const previousState = {
      user: null,
      isAuthChecked: false,
      isLoading: true,
      error: null,
      updateUserError: null
    };

    const state = authReducer(
      previousState,
      checkUserAuth.fulfilled(mockUser, 'requestId')
    );

    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toEqual(mockUser);
  });

  test('обработка экшена ошибки проверки авторизации пользователя', () => {
    const previousState = {
      user: mockUser,
      isAuthChecked: false,
      isLoading: true,
      error: null,
      updateUserError: null
    };

    const state = authReducer(
      previousState,
      checkUserAuth.rejected(new Error('Ошибка авторизации'), 'requestId')
    );

    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toBeNull();
  });

  test('обработка экшена успешного обновления пользователя', () => {
    const previousState = {
      user: mockUser,
      isAuthChecked: true,
      isLoading: true,
      error: null,
      updateUserError: null
    };

    const updatedUser: TUser = {
      email: 'updated@example.com',
      name: 'Updated User'
    };

    const state = authReducer(
      previousState,
      updateUser.fulfilled(updatedUser, 'requestId', {
        name: 'Updated User'
      })
    );

    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(updatedUser);
    expect(state.updateUserError).toBeNull();
  });

  test('обработка экшена ошибки обновления пользователя', () => {
    const previousState = {
      user: mockUser,
      isAuthChecked: true,
      isLoading: true,
      error: null,
      updateUserError: null
    };

    const error = new Error('Ошибка обновления пользователя');

    const state = authReducer(
      previousState,
      updateUser.rejected(error, 'requestId', {
        name: 'Updated User'
      })
    );

    expect(state.isLoading).toBe(false);
    expect(state.updateUserError).toBe('Ошибка обновления пользователя');
  });

  test('обработка экшена setAuthChecked', () => {
    const previousState = {
      user: null,
      isAuthChecked: false,
      isLoading: false,
      error: null,
      updateUserError: null
    };

    const state = authReducer(previousState, setAuthChecked());

    expect(state.isAuthChecked).toBe(true);
  });

  test('обработка экшена clearAuthError', () => {
    const previousState = {
      user: null,
      isAuthChecked: true,
      isLoading: false,
      error: 'Ошибка авторизации',
      updateUserError: 'Ошибка обновления пользователя'
    };

    const state = authReducer(previousState, clearAuthError());

    expect(state.error).toBeNull();
    expect(state.updateUserError).toBeNull();
  });
});
