import { Typography } from '@mui/material';

function PageHeader() {
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };

  return (
    <>
      <Typography variant="h3" component="h3" gutterBottom>
        Configuraciones
      </Typography>
      <Typography variant="subtitle2">
        {user.name}, este es un panel para las configuraciones de usuario.
      </Typography>
    </>
  );
}

export default PageHeader;
