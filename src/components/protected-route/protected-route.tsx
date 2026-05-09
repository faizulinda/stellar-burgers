import { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
import { useSelector } from '../../services/store';
import { selectIsAuthChecked, selectUser } from '@selectors';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: ReactElement;
};

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  onlyUnAuth = false,
  children
}) => {
  const location = useLocation();

  const isAuthChecked = useSelector(selectIsAuthChecked);
  const user = useSelector(selectUser);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location.pathname }} replace />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || '/';

    return <Navigate to={from} replace />;
  }

  return children;
};
