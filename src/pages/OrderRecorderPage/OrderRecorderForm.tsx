import { Button, Grid, TextField } from '@mui/material';
import { FormikHelpers, useFormik } from 'formik';
import { FC } from 'react';
import { OrderRecorderCreate } from 'src/models/orderRecorder';
import * as yup from 'yup';

type OrderRecorderFormProps = {
  initialData: OrderRecorderCreate;
  onSubmit(
    values: OrderRecorderCreate,
    actions: FormikHelpers<OrderRecorderCreate>
  ): void;
  onClose: () => void;
  isEdit: boolean;
};

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Se requiere el nombre')
    .min(3, 'Se requiere al menos 3 caracteres'),
  numberNote: yup.string().required('Se requiere el número de documento'),
  observation: yup.string()
});

const OrderRecorderForm: FC<OrderRecorderFormProps> = ({
  initialData,
  onSubmit,
  onClose,
  isEdit
}) => {
  const formik = useFormik({
    initialValues: initialData,
    validationSchema: validationSchema,
    onSubmit: onSubmit
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} my={1}>
        <Grid item xs={12} md={6}>
          <TextField
            id="numberNote"
            name="numberNote"
            label="Número de Documento"
            value={formik.values.numberNote}
            onChange={formik.handleChange}
            error={
              formik.touched.numberNote && Boolean(formik.errors.numberNote)
            }
            helperText={formik.touched.numberNote && formik.errors.numberNote}
            disabled={true}
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="name"
            name="name"
            label="Nombre"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            disabled={isEdit ? true : false}
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            id="observation"
            name="observation"
            label="Observaciones"
            value={formik.values.observation}
            onChange={formik.handleChange}
            error={
              formik.touched.observation && Boolean(formik.errors.observation)
            }
            helperText={formik.touched.observation && formik.errors.observation}
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>
      <Button
        disabled={formik.isSubmitting}
        type="submit"
        variant="contained"
        sx={{ mr: 2 }}
      >
        Aceptar
      </Button>
      <Button
        disabled={formik.isSubmitting}
        variant="contained"
        color="error"
        onClick={onClose}
      >
        Cancelar
      </Button>
    </form>
  );
};

export default OrderRecorderForm;
