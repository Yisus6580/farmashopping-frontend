import {
  Avatar,
  Button,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { FormikHelpers, useFormik } from 'formik';
import { ChangeEvent, Dispatch, FC, useState } from 'react';
import { UserEdit } from 'src/models/user';
import Swal from 'sweetalert2';
import * as yup from 'yup';

type UserFormEditProps = {
  initialData: UserEdit;
  onSubmit(values: UserEdit, actions: FormikHelpers<UserEdit>): void;
  handleClose: Dispatch<React.SetStateAction<boolean>>;
};

const validationSchema = yup.object({
  name: yup
    .string()
    .min(3, 'El campo nombre debe tener al menos 3 caracteres')
    .required('Se requiere el campo nombre'),
  lastName: yup
    .string()
    .min(3, 'El campo apellido debe tener al menos 3 caracteres')
    .required('Se requiere el campo apellido'),
  email: yup
    .string()
    .email('El campo dirección de correo electrónico es invalido')
    .required('Se requiere el campo dirección de correo electrónico')
});

const UserFormEdit: FC<UserFormEditProps> = ({
  initialData,
  onSubmit,
  handleClose
}) => {
  const [selectedImage, setSelectedImage] = useState<string>();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      let file = event.currentTarget.files[0];
      if (file) {
        if (file.type === 'image/jpeg' || file.type === 'image/png') {
          const reader = new FileReader();
          reader.onload = () => {
            setSelectedImage(reader.result as string);
          };
          reader.readAsDataURL(file);
          formik.setFieldValue('image', event.currentTarget.files?.[0]);
        } else {
          event.target.value = '';
          Swal.fire({
            icon: 'error',
            title: 'Formato Invalido',
            text: 'Solo se acepa los formatos de imagen .jpg y .png',
            timer: 4000,
            customClass: {
              container: 'my-swal2-container'
            }
          });
        }
      }
    }
  };

  const formik = useFormik({
    initialValues: initialData,
    validationSchema: validationSchema,
    onSubmit: onSubmit
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              id="name"
              name="name"
              label="Nombre"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="lastName"
              name="lastName"
              label="Apellidos"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="email"
              name="email"
              label="Correo Electrónico"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha de nacimiento"
                value={dayjs(formik.values.birthDate)}
                renderInput={(params) => <TextField {...params} />}
                onChange={(newValue) => {
                  formik.setFieldValue('birthDate', newValue);
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="role">Rol</InputLabel>
              <Select
                labelId="role"
                id="role"
                name="role"
                label="Rol"
                value={formik.values.role}
                onChange={formik.handleChange}
                fullWidth
              >
                <MenuItem value="admin">Administrador</MenuItem>
                <MenuItem value="grosser">T. Almacen</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            {selectedImage ? (
              <Grid item xs={12}>
                <Avatar
                  alt="Preview"
                  src={selectedImage}
                  sx={{ width: 100, height: 100, mb: 2 }}
                />
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Avatar
                  alt="Preview"
                  src={formik.values.image}
                  sx={{ width: 100, height: 100, mb: 2 }}
                />
              </Grid>
            )}
            <input
              accept=".jpg,.jpeg,.png"
              style={{ display: 'none' }}
              name="image"
              id="image"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="image">
              <Button variant="contained" color="primary" component="span">
                Cargar imagen
              </Button>
            </label>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)}>Cancelar</Button>
        <Button type="submit">Aceptar</Button>
      </DialogActions>
    </form>
  );
};

export default UserFormEdit;
