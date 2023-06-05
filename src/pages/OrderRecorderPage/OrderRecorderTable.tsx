import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import CreateIcon from '@mui/icons-material/Create';
import {
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton
} from '@mui/material';
import { DataGrid, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import axios, { AxiosResponse } from 'axios';
import { FC, useEffect, useState } from 'react';
import { urlOrderRecorder } from 'src/end-points';
import { OrderRecorder, OrderRecorderCreate } from 'src/models/orderRecorder';
import { useAppSelector } from 'src/redux/hook';
import Swal from 'sweetalert2';
import OrderRecorderForm from './OrderRecorderForm';

type OrderRecorderProps = {};

const OrderRecorderTable: FC<OrderRecorderProps> = () => {
  const columns = [
    {
      field: 'numberNote',
      headerName: 'Número de Documento',
      flex: 1,
      minWidth: 100,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>
    },
    {
      field: 'user',
      headerName: 'Usuario',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) =>
        `${params.value.name} ${params.value.lastName}`
    },
    {
      field: 'name',
      headerName: 'Nombre',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>
    },
    {
      field: 'date',
      headerName: 'Fecha',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => {
        const fechaCompleta = params.value;
        const [fechaParte1] = fechaCompleta.split('T');
        const [año, mes, dia] = fechaParte1.split('-');

        const fechaFormateada = `${dia}-${mes}-${año}`;
        return <>{fechaFormateada}</>;
      }
    },
    {
      field: 'observation',
      headerName: 'Observaciones',
      flex: 1,
      minWidth: 200,
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
        return params.row.state ? (
          <>
            <IconButton
              aria-label="Editar"
              color="inherit"
              onClick={() => getById(params.row._id)}
            >
              <CreateIcon />
            </IconButton>
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
              aria-label="Editar"
              color="inherit"
              onClick={() => getById(params.row._id)}
            >
              <CreateIcon />
            </IconButton>
            <IconButton
              aria-label="Activar"
              color="inherit"
              onClick={() => updateState(params.row._id, true)}
            >
              <CheckIcon />
            </IconButton>
          </>
        );
      }
    }
  ];

  const [orderRecorders, setOrderRecorders] = useState<OrderRecorder[]>([]);
  const { sessionData } = useAppSelector((state) => state.auth);
  const [orderRecorder, setOrderRecorder] = useState<OrderRecorderCreate>();
  const [idOrder, setIdOrder] = useState<string>('');
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getAll = async () => {
    await axios
      .get(`${urlOrderRecorder}/`, {
        headers: {
          Authorization: `Bearer ${sessionData.token}`
        }
      })
      .then((response: AxiosResponse) => {
        setOrderRecorders(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getById = async (id: string) => {
    setIdOrder(id);

    await axios
      .get(`${urlOrderRecorder}/list/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionData.token}`
        }
      })
      .then((response: AxiosResponse) => {
        const orderRecorder = orderRecorderMap(response.data.data);
        setOrderRecorder(orderRecorder);
      })
      .catch((error) => {
        console.log(error);
      });

    handleClickOpen();
  };

  const orderRecorderMap = (
    orderRecorder: OrderRecorder
  ): OrderRecorderCreate => {
    return {
      date: orderRecorder.date,
      name: orderRecorder.name,
      numberNote: orderRecorder.numberNote,
      state: orderRecorder.state,
      user: orderRecorder.user._id,
      observation: orderRecorder.observation || ''
    };
  };

  const update = async (orderRecorder: OrderRecorderCreate) => {
    await axios
      .put(`${urlOrderRecorder}/update/${idOrder}`, orderRecorder, {
        headers: {
          Authorization: `Bearer ${sessionData.token}`
        }
      })
      .then((response: AxiosResponse) => {
        getAll();
        handleClose();
        Swal.fire('Actualizado', 'La nota ha sido actualizada', 'success');
      })
      .catch((error) => {
        handleClose();
        console.log(error);
        Swal.fire('Error', 'No se pudo actualizar la nota', 'error');
      });
  };

  const updateState = async (id: string, state: boolean) => {
    Swal.fire({
      title: state
        ? '¿Estas seguro de activar la nota?'
        : '¿Estas seguro de desactivar la nota?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .patch(
            `${urlOrderRecorder}/updateState/${id}`,
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

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <Card>
        <CardContent>
          <DataGrid
            rows={orderRecorders}
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
        <DialogTitle>Editar Nota</DialogTitle>
        <DialogContent>
          <OrderRecorderForm
            initialData={orderRecorder!}
            onSubmit={async (values) => {
              update(values);
            }}
            onClose={handleClose}
            isEdit={true}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrderRecorderTable;
