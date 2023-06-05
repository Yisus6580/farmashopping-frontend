import { Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';
import UserTable from './UsersTable';

function OrderRecorderPage() {
  return (
    <>
      <Helmet>
        <title>Usuarios</title>
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
            <UserTable />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default OrderRecorderPage;
