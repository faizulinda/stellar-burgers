import { RootState } from '../store';

export const selectOrderRequest = (state: RootState) =>
  state.order.orderRequest;

export const selectOrderModalData = (state: RootState) =>
  state.order.orderModalData;

export const selectOrderError = (state: RootState) => state.order.error;

export const selectSelectedOrder = (state: RootState) =>
  state.order.selectedOrder;

export const selectSelectedOrderRequest = (state: RootState) =>
  state.order.selectedOrderRequest;

export const selectSelectedOrderError = (state: RootState) =>
  state.order.selectedOrderError;
