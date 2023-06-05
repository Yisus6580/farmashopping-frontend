import NumbersIcon from '@mui/icons-material/Numbers';
import PlaceIcon from '@mui/icons-material/Place';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography
} from '@mui/material';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { OrderModel } from 'src/models/order';

type OrderCardProps = {
  order: OrderModel;
};

const OrderCard: FC<OrderCardProps> = ({ order }) => {
  return (
    <Card>
      <CardHeader title={order.NombreCompletoCliente} />
      <Divider />
      <CardContent>
        <Typography
          alignItems="center"
          display="flex"
          variant="subtitle1"
          component="div"
          mb={1}
        >
          <NumbersIcon sx={{ mr: 1 }} />
          {order.NumDocumento}
        </Typography>
        <Typography
          alignItems="center"
          display="flex"
          variant="subtitle1"
          component="div"
          mb={1}
        >
          <PlaceIcon sx={{ mr: 1 }} />
          {`${order.LugarCliente} / ${order.ZonaCliente}`}
        </Typography>

        <br />
        <Button
          component={NavLink}
          to={`${order.NumDocumento}`}
          variant="contained"
          color="primary"
        >
          Ver Nota
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
