import { Container, Grid } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { FC, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { urlOrder } from 'src/end-points';
import { OrderModel } from 'src/models/order';
import { useAppSelector } from 'src/redux/hook';
import PageHeader from '../Orders/PageHeader';
import OrderDetails from './OrderDetails';

const initialOrder: OrderModel = {
  PrincipalID: '',
  NumDocumento: 0,
  NumReferencia: 0,
  Descripcion: '',
  Fecha: '',
  Tag: '',
  Modalidad: '',
  Etapa: '',
  LugarCliente: '',
  ZonaCliente: '',
  NombreCompletoCliente: '',
  DireccionCliente: '',
  NombreCompletoResponsable: '',
  NombreCompletoDistribuidor: '',
  TotalCredito: 0,
  NumDeposito: 0,
  NombreDeposito: '',
  Detalle: []
};

const Order: FC = () => {
  const { sessionData } = useAppSelector((state) => state.auth);
  const { numberDocument } = useParams();
  const [order, setOrder] = useState<OrderModel>(initialOrder);

  const getOrder = async (numberDocument: string) => {
    await axios
      .get(`${urlOrder}/list/${numberDocument}`, {
        headers: {
          Authorization: `Bearer ${sessionData.token}`
        }
      })
      .then((response: AxiosResponse) => {
        const { data } = response;
        const order = JSON.parse(data.data.response);

        setOrder({
          ...order.Cabecera,
          Detalle: order.Detalle
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getOrder(numberDocument);
  }, []);

  return (
    <>
      <Helmet>
        <title>Nota de Venta</title>
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
            <OrderDetails order={order} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Order;
