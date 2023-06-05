import { Box, Grid, Pagination } from '@mui/material';
import { FC, useState } from 'react';
import { OrderModel } from 'src/models/order';
import OrderCard from './OrderCard';

type OrderListProps = {
  orders: OrderModel[];
};

const OrderList: FC<OrderListProps> = ({ orders }) => {
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 9;

  const getPageOrders = (): OrderModel[] => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return orders.slice(startIndex, endIndex);
  };

  return (
    <>
      <Grid container spacing={3}>
        {getPageOrders().map((order) => (
          <Grid item key={order.PrincipalID} xs={12} md={4}>
            <OrderCard order={order} />
          </Grid>
        ))}
      </Grid>
      <br />
      <Box display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(orders.length / itemsPerPage)}
          color="primary"
          size="large"
          onChange={(_event, value) => setPage(value)}
        />
      </Box>
    </>
  );
};

export default OrderList;
