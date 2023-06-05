import {
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { FormikHelpers, useFormik } from 'formik';
import { FC, useEffect, useState } from 'react';
import { ShippingRecorderCreate } from 'src/models/shippingRecorder';
import * as yup from 'yup';

type ShippingRecorderFormProps = {
  initialData: ShippingRecorderCreate;
  onSubmit(
    values: ShippingRecorderCreate,
    actions: FormikHelpers<ShippingRecorderCreate>
  ): void;
  onClose: () => void;
  isEdit: boolean;
};

const validationSchema = yup.object({
  namePharmacy: yup
    .string()
    .required('Se requiere el cliente')
    .min(3, 'Se requiere al menos 3 caracteres'),
  boxNumber: yup.string().required('Se requiere la cantidad'),
  destiny: yup.string().required('Se requiere el destino'),
  numberNotes: yup.array().required('Se requiere los números de documentos')
});

const ShippingRecorderForm: FC<ShippingRecorderFormProps> = ({
  initialData,
  onSubmit,
  onClose,
  isEdit
}) => {
  const [numberDocs, setNumberDocs] = useState<string[]>([]);
  const [numberDoc, setNumberDoc] = useState<string>('');

  const formik = useFormik({
    initialValues: initialData,
    validationSchema: validationSchema,
    onSubmit: onSubmit
  });

  const handleAdd = () => {
    if (numberDoc) {
      setNumberDocs([...numberDocs, numberDoc]);
      formik.setFieldValue('numberNotes', numberDoc);
    }
  };

  const handleDelete = (value: string) => {
    const updatedDocs = numberDocs.filter((doc) => doc !== value);
    setNumberDocs(updatedDocs);
    formik.setFieldValue('numberNotes', updatedDocs);
  };

  useEffect(() => {
    if (isEdit) {
      formik.setFieldValue('numberNotes', formik.values.numberNotes);
    } else {
      formik.setFieldValue('numberNotes', numberDocs);
    }
  }, [numberDocs]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} my={1}>
        <Grid item xs={12}>
          <TextField
            id="namePharmacy"
            name="namePharmacy"
            label="Cliente"
            value={formik.values.namePharmacy}
            onChange={formik.handleChange}
            error={
              formik.touched.namePharmacy && Boolean(formik.errors.namePharmacy)
            }
            helperText={
              formik.touched.namePharmacy && formik.errors.namePharmacy
            }
            fullWidth
            disabled={isEdit}
            sx={{ mb: 2 }}
          />
        </Grid>

        {isEdit ? null : (
          <Grid item xs={12}>
            <TextField
              id="numberNotes"
              name="numberNotes"
              label="Número de Documentos"
              value={numberDoc}
              onChange={(event) => setNumberDoc(event.target.value)}
              error={
                formik.touched.numberNotes && Boolean(formik.errors.numberNotes)
              }
              helperText={
                formik.touched.numberNotes && formik.errors.numberNotes
              }
              fullWidth
              disabled={isEdit}
              sx={{ mb: 2 }}
            />
          </Grid>
        )}

        {isEdit ? null : (
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleAdd}>
              Agregar Número
            </Button>
          </Grid>
        )}

        {isEdit ? (
          <Grid item xs={12}>
            {initialData.numberNotes.map((numberDoc, index) => (
              <Chip key={index} label={numberDoc} />
            ))}
          </Grid>
        ) : (
          <Grid item xs={12}>
            {numberDocs.map((numberDoc, index) => (
              <Chip
                key={index}
                label={numberDoc}
                onDelete={() => handleDelete(numberDoc)}
              />
            ))}
          </Grid>
        )}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="typeBox">Tipo</InputLabel>
            <Select
              labelId="typeBox"
              id="typeBox"
              name="typeBox"
              label="Tipo"
              value={formik.values.typeBox}
              onChange={formik.handleChange}
              fullWidth
            >
              <MenuItem value="Caja">Caja</MenuItem>
              <MenuItem value="Sobre">Sobre</MenuItem>
              <MenuItem value="Otro">Otro</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="boxNumber"
            name="boxNumber"
            label="Cantidad"
            type="number"
            value={formik.values.boxNumber}
            onChange={formik.handleChange}
            error={formik.touched.boxNumber && Boolean(formik.errors.boxNumber)}
            helperText={formik.touched.boxNumber && formik.errors.boxNumber}
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="destiny"
            name="destiny"
            label="Destino"
            value={formik.values.destiny}
            onChange={formik.handleChange}
            error={formik.touched.destiny && Boolean(formik.errors.destiny)}
            helperText={formik.touched.destiny && formik.errors.destiny}
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="shippingCompany"
            name="shippingCompany"
            label="Empresa de Envio"
            value={formik.values.shippingCompany}
            onChange={formik.handleChange}
            error={
              formik.touched.shippingCompany &&
              Boolean(formik.errors.shippingCompany)
            }
            helperText={
              formik.touched.shippingCompany && formik.errors.shippingCompany
            }
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="numberGuide"
            name="numberGuide"
            label="Numero de Guía"
            value={formik.values.numberGuide}
            onChange={formik.handleChange}
            error={
              formik.touched.numberGuide && Boolean(formik.errors.numberGuide)
            }
            helperText={formik.touched.numberGuide && formik.errors.numberGuide}
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

export default ShippingRecorderForm;
