import { Grid, Typography } from '@mui/material';

function PageHeader() {
  return (
    <Grid container alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Notas de Venta
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
