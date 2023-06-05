import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import CreateIcon from '@mui/icons-material/Create';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton
} from '@mui/material';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import axios, { AxiosResponse } from 'axios';
import { FC, useEffect, useState } from 'react';
import DialogForm from 'src/components/DialogForm';
import { urlUser } from 'src/end-points';
import { User, UserCreate, UserEdit } from 'src/models/user';
import { useAppSelector } from 'src/redux/hook';
import { convertUserEditToFormData, convertUserToFormData } from 'src/utils';
import Swal from 'sweetalert2';
import UserFormCreate from './UserFormCreate';
import UserFormEdit from './UserFormEdit';

const UserTable: FC = () => {
  const columns = [
    {
      field: 'name',
      headerName: 'Nombre',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>
    },
    {
      field: 'lastName',
      headerName: 'Apellidos',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>
    },
    {
      field: 'role',
      headerName: 'Rol',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <>{params.value === 'admin' ? 'Administrador' : 'T. Almacen'}</>
      )
    },
    {
      field: 'image',
      headerName: 'Imagen',
      flex: 1,
      renderCell: (params: GridRenderCellParams<User>) => (
        <Avatar src={params.value ? params.value.url : null} />
      )
    },
    {
      field: 'state',
      headerName: 'Estado',
      flex: 1,
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
      renderCell: (params: GridRenderCellParams) => {
        return (
          <>
            <IconButton
              aria-label="Editar"
              color="inherit"
              onClick={async () => {
                setIsEdit(true);
                setUserId(params.value);
                await handleGetById(params.value);
                setOpen(true);
              }}
            >
              <CreateIcon />
            </IconButton>

            {params.row.state ? (
              <IconButton
                aria-label="Desactivar"
                color="inherit"
                onClick={() => handleUpdateState(params.row._id, false)}
              >
                <ClearIcon />
              </IconButton>
            ) : (
              <IconButton
                aria-label="Activar"
                color="inherit"
                onClick={() => handleUpdateState(params.row._id, true)}
              >
                <CheckIcon />
              </IconButton>
            )}
          </>
        );
      }
    }
  ];

  const { sessionData } = useAppSelector((state) => state.auth);
  const [user, setUser] = useState<UserCreate>({
    name: '',
    lastName: '',
    email: '',
    password: '',
    role: 'admin',
    state: true
  });
  const [userEdit, setUserEdit] = useState<UserEdit>({
    name: '',
    lastName: '',
    email: '',
    role: 'admin'
  });
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleClean = () => {
    setUser({
      name: '',
      lastName: '',
      email: '',
      password: '',
      birthDate: null,
      role: 'admin',
      state: true
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleClean();
  };

  const handleGet = async () => {
    await axios
      .get(`${urlUser}/`, {
        headers: {
          Authorization: `Bearer ${sessionData.token}`
        }
      })
      .then((response: AxiosResponse) => {
        setUsers(response.data.data);
      });
  };

  const handleCreate = async (user: UserCreate) => {
    const userMap = convertUserToFormData(user);

    await axios
      .post(`${urlUser}/create`, userMap, {
        headers: {
          Authorization: `Bearer ${sessionData.token}`
        }
      })
      .then(() => {
        handleGet();
        handleClose();
        Swal.fire({
          icon: 'success',
          title: 'Creado',
          text: 'Usuario creado correctamente',
          timer: 4000
        });
      })
      .catch((error) => {
        handleClose();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
          timer: 4000
        });
      });
  };

  const handleEdit = async (id: string, user: UserEdit) => {
    if (typeof user.image === 'string') {
      user.image = undefined;
    }

    console.log(user);
    const userMap = convertUserEditToFormData(user);

    await axios
      .put(`${urlUser}/update/${id}`, userMap, {
        headers: {
          Authorization: `Bearer ${sessionData.token}`
        }
      })
      .then(() => {
        handleGet();
        handleClose();
        Swal.fire({
          icon: 'success',
          title: 'Actualizado',
          text: 'Usuario actualizado correctamente',
          timer: 4000
        });
      })
      .catch((error) => {
        handleClose();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
          timer: 4000
        });
      });
  };

  const handleGetById = async (id: string) => {
    await axios
      .get(`${urlUser}/list/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionData.token}`
        }
      })
      .then((response: AxiosResponse) => {
        const { data } = response.data;

        setUserEdit({
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          image: data.image.url,
          birthDate: data.birthDate,
          role: data.role
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateState = async (id: string, state: boolean) => {
    Swal.fire({
      title: state
        ? '¿Estás seguro de activar el usuario?'
        : '¿Estás seguro de desactivar el usuario?',
      text: state
        ? 'El usuario podra iniciar sesión'
        : 'El usuario no podra iniciar sesión',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .patch(
            `${urlUser}/updateState/${id}`,
            { state: state },
            {
              headers: {
                Authorization: `Bearer ${sessionData.token}`
              }
            }
          )
          .then(() => {
            handleGet();
            Swal.fire(
              state ? 'Activado' : 'Desactivado',
              state ? 'Usuario activado' : 'Usuario desactivado',
              'success'
            );
          });
      }
    });
  };

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <Card>
      <CardContent>
        <Button
          onClick={() => {
            setIsEdit(false);
            handleClickOpen();
          }}
          startIcon={<AddIcon />}
          variant="contained"
          color="success"
          sx={{ mb: 2 }}
        >
          Agregar
        </Button>
        <DataGrid columns={columns} rows={users} getRowId={(row) => row._id} />
        <DialogForm
          title={isEdit ? 'Editar Usuario' : 'Registrar Usuario'}
          open={open}
          handleClose={handleClose}
        >
          {isEdit ? (
            <UserFormEdit
              initialData={userEdit!}
              onSubmit={async (values) => {
                handleEdit(userId!, values);
              }}
              handleClose={setOpen}
            />
          ) : (
            <UserFormCreate
              initialData={user!}
              onSubmit={async (values) => {
                handleCreate(values);
              }}
              handleClose={setOpen}
            />
          )}
        </DialogForm>
      </CardContent>
    </Card>
  );
};

export default UserTable;
