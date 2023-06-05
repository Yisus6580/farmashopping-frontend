import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import CreateIcon from '@mui/icons-material/Create';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography
} from '@mui/material';
import { DataGrid, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import axios, { AxiosResponse } from 'axios';
import { FC, useEffect, useState } from 'react';
import { urlShippingRecorder } from 'src/end-points';
import {
  ShippingRecorder,
  ShippingRecorderCreate
} from 'src/models/shippingRecorder';
import { useAppSelector } from 'src/redux/hook';
import Swal from 'sweetalert2';
import ShippingRecorderForm from './ShippingRecorderForm';

type ShippingRecorderTableProps = {};

const ShippingRecorderTable: FC<ShippingRecorderTableProps> = () => {
  const columns = [
    {
      field: 'numberNotes',
      headerName: 'Num. Documentos',
      flex: 1,
      minWidth: 150,
      height: 300,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap'
            }}
          >
            {params.value.map((numerNote, index) => (
              <Typography key={numerNote}>
                {index === params.value.length - 1
                  ? numerNote
                  : `${numerNote} - `}
              </Typography>
            ))}
          </Box>
        );
      }
    },
    {
      field: 'namePharmacy',
      headerName: 'Cliente',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>
    },
    {
      field: 'date',
      headerName: 'Fecha',
      flex: 1,
      minWidth: 100,
      renderCell: (params: GridRenderCellParams) => {
        const fechaCompleta = params.value;
        const [fechaParte1] = fechaCompleta.split('T');
        const [año, mes, dia] = fechaParte1.split('-');

        const fechaFormateada = `${dia}-${mes}-${año}`;
        return <>{fechaFormateada}</>;
      }
    },
    {
      field: 'typeBox',
      headerName: 'Tipo',
      flex: 1,
      minWidth: 100,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>
    },
    {
      field: 'boxNumber',
      headerName: 'Cantidad',
      flex: 1,
      minWidth: 100,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>
    },
    {
      field: 'shippingCompany',
      headerName: 'Empresa',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>
    },
    {
      field: 'numberGuide',
      headerName: 'Num. Guia',
      flex: 1,
      minWidth: 100,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>
    },
    {
      field: 'state',
      headerName: 'Estado',
      flex: 1,
      minWidth: 100,
      renderCell: (params: GridRenderCellParams) => {
        if (params.value) {
          return <Chip label="Activado" color="success" />;
        } else {
          return <Chip label="Desactivado" color="warning" />;
        }
      }
    },
    {
      field: '_id',
      headerName: 'Opciones',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <>
            {params.row.state ? (
              <>
                <IconButton
                  aria-label="Desactivar"
                  color="inherit"
                  onClick={() => updateState(params.row._id, false)}
                >
                  <ClearIcon />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton
                  aria-label="Activar"
                  color="inherit"
                  onClick={() => updateState(params.row._id, true)}
                >
                  <CheckIcon />
                </IconButton>
              </>
            )}
            <IconButton
              aria-label="Editar"
              color="inherit"
              onClick={async () => {
                setIsEdit(true);
                await getById(params.row._id);
              }}
            >
              <CreateIcon />
            </IconButton>
          </>
        );
      }
    }
  ];

  const [shippingRecorders, setShippingRecorders] = useState<
    ShippingRecorder[]
  >([]);
  const [shippingRecorder, setShippingRecorder] =
    useState<ShippingRecorderCreate>();
  const { sessionData } = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [id, setId] = useState<string>('');

  const handleClickOpen = () => {
    setIsEdit(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const create = async (shippingRecorder: ShippingRecorderCreate) => {
    await axios
      .post(`${urlShippingRecorder}/create`, shippingRecorder, {
        headers: {
          Authorization: `Bearer ${sessionData.token}`
        }
      })
      .then((response: AxiosResponse) => {
        getAll();
        handleClose();
        Swal.fire({
          icon: 'success',
          title: 'Creado',
          text: 'Registrado correctamente',
          timer: 4000
        });
      })
      .catch((error) => {
        setOpen(false);

        if (error.response.data.code === 500) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ya existe un registro del envio',
            timer: 4000
          });
        }
      });
  };

  const getAll = async () => {
    await axios
      .get(`${urlShippingRecorder}/`, {
        headers: {
          Authorization: `Bearer ${sessionData.token}`
        }
      })
      .then((response: AxiosResponse) => {
        setShippingRecorders(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getById = async (id: string) => {
    setId(id);

    await axios
      .get(`${urlShippingRecorder}/list/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionData.token}`
        }
      })
      .then((response: AxiosResponse) => {
        const shippingRecorder = shippingRecorderMap(response.data.data);
        setShippingRecorder(shippingRecorder);
      })
      .catch((error) => {
        console.log(error);
      });

    setOpen(true);
  };

  const shippingRecorderMap = (
    shippingRecorder: ShippingRecorder
  ): ShippingRecorderCreate => {
    return {
      date: shippingRecorder.date,
      namePharmacy: shippingRecorder.namePharmacy,
      boxNumber: shippingRecorder.boxNumber,
      typeBox: shippingRecorder.typeBox,
      numberNotes: shippingRecorder.numberNotes,
      destiny: shippingRecorder.destiny,
      shippingCompany: shippingRecorder.shippingCompany,
      numberGuide: shippingRecorder.numberGuide,
      state: shippingRecorder.state,
      user: shippingRecorder.user._id
    };
  };

  const updateState = async (id: string, state: boolean) => {
    Swal.fire({
      title: state
        ? '¿Estas seguro de activar el registro?'
        : '¿Estas seguro de desactivar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .patch(
            `${urlShippingRecorder}/updateState/${id}`,
            { state: state },
            {
              headers: {
                Authorization: `Bearer ${sessionData.token}`
              }
            }
          )
          .then((response: AxiosResponse) => {
            getAll();
            Swal.fire(
              state ? 'Activado' : 'Desactivado',
              state
                ? 'La nota ha sido activada'
                : 'La nota ha sido desactivada',
              'success'
            );
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const update = async (shippingRecorder: ShippingRecorderCreate) => {
    await axios
      .put(`${urlShippingRecorder}/update/${id}`, shippingRecorder, {
        headers: {
          Authorization: `Bearer ${sessionData.token}`
        }
      })
      .then((response: AxiosResponse) => {
        getAll();
        handleClose();
        Swal.fire('Actualizado', 'El registro ha sido actualizado', 'success');
      })
      .catch((error) => {
        handleClose();
        Swal.fire('Error', 'No se pudo actualizar el registro', 'error');
      });
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <Card>
        <CardContent>
          <Button
            onClick={() => {
              setIsEdit(false);
              handleClickOpen();
            }}
            variant="contained"
            color="success"
            sx={{ mb: 2 }}
          >
            Registrar
          </Button>
          <DataGrid
            rows={shippingRecorders}
            columns={columns}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            autoHeight
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 }
              }
            }}
            hideFooter
            getRowId={(row) => row._id}
          />
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? 'Editar Envio' : 'Registrar Envio'}</DialogTitle>
        <DialogContent>
          {isEdit ? (
            <ShippingRecorderForm
              initialData={shippingRecorder}
              onSubmit={async (values) => {
                update(values);
              }}
              onClose={handleClose}
              isEdit={true}
            />
          ) : (
            <ShippingRecorderForm
              initialData={{
                date: new Date(),
                namePharmacy: '',
                typeBox: 'Caja',
                boxNumber: '',
                numberNotes: [],
                destiny: '',
                numberGuide: '',
                shippingCompany: '',
                state: true,
                user: sessionData.userId
              }}
              onSubmit={async (values) => {
                create(values);
              }}
              onClose={handleClose}
              isEdit={false}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShippingRecorderTable;
