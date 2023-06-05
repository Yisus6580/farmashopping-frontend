import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography
} from '@mui/material';
import { DataGrid, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import axios, { AxiosResponse } from 'axios';
import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { urlOrderRecorder } from 'src/end-points';
import { OrderRecorderCreate } from 'src/models/orderRecorder';
import { useAppSelector } from 'src/redux/hook';
import Swal from 'sweetalert2';
import OrderRecorderForm from './OrderRecorderForm';
import { OrderModel } from 'src/models/order';

type OrderDetailsProps = {
  order: OrderModel;
};

const columns = [
  {
    field: 'CodigoItem',
    headerName: 'Código',
    minWidth: 100,
    flex: 1,
    renderCell: (params: GridRenderCellParams) => <>{params.value}</>
  },
  {
    field: 'NombreItem',
    headerName: 'Artículo',
    flex: 1,
    minWidth: 400,
    renderCell: (params: GridRenderCellParams) => <>{params.value}</>
  },
  {
    field: 'Lote',
    headerName: 'Lote',
    flex: 1,
    minWidth: 100,
    renderCell: (params: GridRenderCellParams) => <>{params.value}</>
  },
  {
    field: 'FechaVencimiento',
    headerName: 'F-Ven',
    flex: 1,
    minWidth: 100,
    renderCell: (params: GridRenderCellParams) => (
      <>{params.value.toString().split(' ')[0]}</>
    )
  },
  {
    field: 'Cantidad',
    headerName: 'Cantidad',
    flex: 1,
    minWidth: 100,
    renderCell: (params: GridRenderCellParams) => <>{params.value}</>
  },
  {
    field: 'PrecioVenta',
    headerName: 'Precio Unitario',
    flex: 1,
    minWidth: 100,
    renderCell: (params: GridRenderCellParams) => <>{params.value}</>
  },
  {
    field: 'Medida',
    headerName: 'Med',
    flex: 1,
    minWidth: 100,
    renderCell: (params: GridRenderCellParams) => <>{params.value}</>
  },
  {
    field: 'Descuento',
    headerName: 'Desc.',
    flex: 1,
    minWidth: 100,
    renderCell: (params: GridRenderCellParams) => <>{params.value}</>
  },
  {
    field: 'Subtotal',
    headerName: 'Total',
    flex: 1,
    minWidth: 100,
    renderCell: (params: GridRenderCellParams) => <>{params.value}</>
  }
];

const OrderDetails: FC<OrderDetailsProps> = ({ order }) => {
  const { sessionData } = useAppSelector((state) => state.auth);
  const { numberDocument } = useParams();
  const navigate = useNavigate();

  const create = async (order: OrderRecorderCreate) => {
    await axios
      .post(`${urlOrderRecorder}/create`, order, {
        headers: {
          Authorization: `Bearer ${sessionData.token}`
        }
      })
      .then((response: AxiosResponse) => {
        navigate('/notas-de-venta-registradas');
      })
      .catch((error) => {
        setOpen(false);

        if (error.response.data.code === 500) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ya existe un registro de la nota de venta',
            timer: 3000
          });
        }
      });
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const generateUniqueKey = (() => {
    let counter = 0;

    return () => {
      counter++;
      return `key-${counter}`;
    };
  })();

  return (
    <>
      <Card>
        <CardContent>
          <Box p={2}>
            <Typography variant="h3" align="center">
              Nota de Venta
            </Typography>
            <br />
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Typography variant="subtitle1" component="div" fontSize={16}>
                  <strong>Cliente: </strong> {order.NombreCompletoCliente}
                </Typography>
                <Typography variant="subtitle1" component="div" fontSize={16}>
                  <strong>Fecha: </strong>
                  {order.Fecha.toString()}
                </Typography>
                <Typography variant="subtitle1" component="div" fontSize={16}>
                  <strong>Zona: </strong>
                  {`${order.LugarCliente}/${order.ZonaCliente}`}
                </Typography>
                <Typography variant="subtitle1" component="div" fontSize={16}>
                  <strong>Dirección: </strong>
                  {order.DireccionCliente}
                </Typography>
                <Typography variant="subtitle1" component="div" fontSize={16}>
                  <strong>Glosa: </strong>
                  {order.Descripcion}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1" component="div" fontSize={16}>
                  <strong>Tag: </strong>
                  {order.Tag}
                </Typography>
                <Typography variant="subtitle1" component="div" fontSize={16}>
                  <strong>Nro. Doc: </strong>
                  {order.NumDocumento}
                </Typography>
                <Typography variant="subtitle1" component="div" fontSize={16}>
                  <strong>Factura: </strong>
                  {order.NumReferencia}
                </Typography>
                <Typography variant="subtitle1" component="div" fontSize={16}>
                  <strong>Vendedor: </strong>
                  {order.NombreCompletoResponsable}
                </Typography>
              </Box>
            </Box>
            <Button
              onClick={handleClickOpen}
              variant="contained"
              color="success"
              sx={{ my: 2 }}
            >
              Registrar
            </Button>
            <DataGrid
              rows={order.Detalle}
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
              getRowId={() => generateUniqueKey()}
            />
            <br />
            <Typography
              variant="subtitle1"
              align="right"
              component="div"
              fontSize={16}
            >
              <strong>Total: </strong>
              {order.TotalCredito}
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Registrar Factura</DialogTitle>
        <DialogContent>
          <OrderRecorderForm
            initialData={{
              date: new Date(),
              name: '',
              numberNote: numberDocument!,
              state: true,
              user: sessionData.userId,
              observation: ''
            }}
            onSubmit={async (values) => {
              create(values);
            }}
            onClose={handleClose}
            isEdit={false}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrderDetails;
