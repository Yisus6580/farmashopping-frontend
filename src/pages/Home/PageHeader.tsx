import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAppSelector } from 'src/redux/hook';

function PageHeader() {
  const { sessionData } = useAppSelector((state) => state.auth);
  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant="rounded"
          alt={`${sessionData.name} ${sessionData.lastName}`}
          src={sessionData.imageUrl}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Bienvenido, {`${sessionData.name} ${sessionData.lastName}`}!
        </Typography>
        <Typography variant="subtitle2">
          Hoy es un buen día para empezar.
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
