import {
  Box,
  Button,
  Card,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';

function SecurityTab() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <List>
            <ListItem sx={{ p: 3 }}>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1
                }}
                primary="Cambiar Contraseña"
                secondary="Puedes cambiar tu contraseña aquí"
              />
              <Button size="large" variant="outlined">
                Cambiar Contraseña
              </Button>
            </ListItem>
          </List>
        </Card>
      </Grid>
    </Grid>
  );
}

export default SecurityTab;
