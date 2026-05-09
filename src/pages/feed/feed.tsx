import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeed } from '../../services/slices/feedSlice';
import {
  selectFeedError,
  selectFeedLoading,
  selectFeedOrders
} from '@selectors';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  /** TODO: взять переменную из стора */
  const orders = useSelector(selectFeedOrders);
  const isLoading = useSelector(selectFeedLoading);
  const error = useSelector(selectFeedError);

  const handleGetFeeds = () => {
    dispatch(fetchFeed());
  };

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <p className='text text_type_main-medium pt-10'>{error}</p>;
  }

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
