import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectFeedOrders = (state: RootState) => state.feed.orders;

const selectFeedTotal = (state: RootState) => state.feed.total;

const selectFeedTotalToday = (state: RootState) => state.feed.totalToday;

export const selectFeed = createSelector(
  [selectFeedTotal, selectFeedTotalToday],
  (total, totalToday) => ({
    total,
    totalToday
  })
);

export const selectFeedLoading = (state: RootState) => state.feed.isLoading;

export const selectFeedError = (state: RootState) => state.feed.error;
