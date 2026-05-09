import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectFeedOrders,
  selectIngredients,
  selectProfileOrders,
  selectSelectedOrder
} from '@selectors';
import { fetchOrderByNumber } from '../../services/slices/orderSlice';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams();

  const orderNumber = Number(number);

  /** TODO: взять переменные orderData и ingredients из стора */
  const orders = useSelector(selectFeedOrders);
  const profileOrders = useSelector(selectProfileOrders);
  const selectedOrder = useSelector(selectSelectedOrder);

  const orderFromFeed = orders.find((order) => order.number === orderNumber);
  const orderFromProfile = profileOrders.find(
    (order) => order.number === orderNumber
  );

  const orderData = orderFromFeed || orderFromProfile || selectedOrder;
  const ingredients: TIngredient[] = useSelector(selectIngredients);

  useEffect(() => {
    if (
      !Number.isNaN(orderNumber) &&
      !orderFromFeed &&
      !orderFromProfile &&
      !selectedOrder
    ) {
      dispatch(fetchOrderByNumber(orderNumber));
    }
  }, [dispatch, orderFromFeed, orderFromProfile, selectedOrder, orderNumber]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
