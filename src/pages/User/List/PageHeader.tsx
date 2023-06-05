import { Grid, Typography } from '@mui/material';
import { useAppSelector } from 'src/redux/hook';

function PageHeader() {
  const { sessionData } = useAppSelector((state) => state.auth);

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Usuarios
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
