import { Container, Grid } from '@mui/material';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import CardsInformation from './CardsInformation';
import PageHeader from './PageHeader';

const Home: FC = () => {
  return (
    <>
      <Helmet>
        <title>Inicio</title>
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
            <CardsInformation />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
