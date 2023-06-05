import { Box, Button, Grid, TextField } from '@mui/material';
import { FormikHelpers, useFormik } from 'formik';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from 'src/assets/Logo.jpg';
import { Credentials } from 'src/models/user';
import * as yup from 'yup';

type LoginFormProps = {
  initialData: Credentials;
  onSubmit(values: Credentials, actions: FormikHelpers<Credentials>): void;
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email('El campo dirección de correo electrónico es invalido')
    .required('Se requiere el campo dirección de correo electrónico'),
  password: yup.string().required('Se requiere el campo contraseña')
});

const LoginForm: FC<LoginFormProps> = ({ initialData, onSubmit }) => {
  const formik = useFormik({
    initialValues: initialData,
    validationSchema: validationSchema,
    onSubmit: onSubmit
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <Box component="img" src={Logo} width={80} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="email"
            id="email"
            label="Correo Electrónico"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="password"
            id="password"
            type="password"
            label="Contraseña"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit" fullWidth>
            Iniciar Sesión
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            component={NavLink}
            to="/restablecer-password"
            color="secondary"
          >
            ¿Olvidaste tu contraseña?
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;
