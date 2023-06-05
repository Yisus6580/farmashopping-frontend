import { Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  default as OrderRecorderTable
} from './OrderRecorderTable';
import PageHeader from './PageHeader';

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
            <OrderRecorderTable />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default OrderRecorderPage;
