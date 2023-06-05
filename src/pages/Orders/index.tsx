import { CalendarPicker, LocalizationProvider } from '@mui/lab';
import { Container, Grid } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios, { AxiosResponse } from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import esLocale from 'dayjs/locale/es';
import { FC, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from '../Orders/PageHeader';
import OrderList from './OrderList';
import { urlOrder } from 'src/end-points';
import { useAppSelector } from 'src/redux/hook';
import { OrderModel } from 'src/models/order';

const Orders: FC = () => {
  const { sessionData } = useAppSelector((state) => state.auth);
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [dateCalendary, setDateCalendary] = useState<Dayjs | null>(dayjs());

  const getOrders = async (date: Dayjs | null) => {
    setDateCalendary(date);
    const currentDateSelect = date?.format('YYYY-MM-DD');

    await axios
      .get(`${urlOrder}/${currentDateSelect}`, {
        headers: {
          Authorization: `Bearer ${sessionData.token}`
        }
      })
      .then((response: AxiosResponse) => {
        const { data } = response;

        const sortOrders = data.data.sort((a, b) => {
          const dateA = new Date(a.Fecha);
          const dateB = new Date(b.Fecha);
          return dateB.getTime() - dateA.getTime();
        });

        setOrders(sortOrders);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getOrders(dateCalendary);
  }, []);
  return (
    <>
      <Helmet>
        <title>Notas de Venta</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
              <CalendarPicker
                date={dateCalendary}
                onChange={(newDate) => getOrders(newDate)}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <OrderList orders={orders} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Orders;
