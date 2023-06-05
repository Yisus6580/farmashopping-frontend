import { Container, Grid } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { urlShippingRecorder } from 'src/end-points';
import { ShippingRecorder } from 'src/models/shippingRecorder';
import { useAppSelector } from 'src/redux/hook';
import PageHeader from './PageHeader';
import ShippingRecorderTable from './ShippingRecorderTable';

function OrderRecorderPage() {
  return (
    <>
      <Helmet>
        <title>Notas Registradas</title>
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
            <ShippingRecorderTable />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default OrderRecorderPage;
