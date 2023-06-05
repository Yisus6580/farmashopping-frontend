import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hook';

type ProtectedRouteProps = {
  children: ReactNode;
  roles: string[];
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, roles }) => {
  const { sessionData } = useAppSelector((state) => state.auth);

  return sessionData && roles.includes(sessionData.role) ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
