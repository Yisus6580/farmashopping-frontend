import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  alpha,
  styled
} from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { urlConsults } from 'src/end-points';
import { IDataHome } from 'src/models/consults';
import { useAppSelector } from 'src/redux/hook';

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    margin: ${theme.spacing(2, 0, 1, -0.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
    padding: ${theme.spacing(0.5)};
    border-radius: 60px;
    height: ${theme.spacing(5.5)};
    width: ${theme.spacing(5.5)};
    background: ${
      theme.palette.mode === 'dark'
        ? theme.colors.alpha.trueWhite[30]
        : alpha(theme.colors.alpha.black[100], 0.07)
    };
  
    img {
      background: ${theme.colors.alpha.trueWhite[100]};
      padding: ${theme.spacing(0.5)};
      display: block;
      border-radius: inherit;
      height: ${theme.spacing(4.5)};
      width: ${theme.spacing(4.5)};
    }
`
);

function CardsInformation() {
  const [dataHome, setDataHome] = useState<IDataHome>({
    ordersToday: 0,
    totalNotesSalesRegisters: 0,
    totalSendsRegisters: 0,
    totalUsers: 0
  });
  const { sessionData } = useAppSelector((state) => state.auth);

  const getData = async () => {
    await axios
      .get(`${urlConsults}/`, {
        headers: {
          Authorization: `Bearer ${sessionData.token}`
        }
      })
      .then((response: AxiosResponse) => {
        setDataHome(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3} item>
          <Card
            sx={{
              px: 1
            }}
          >
            <CardContent>
              <AvatarWrapper>
                <MonetizationOnIcon color="primary" sx={{ fontSize: 35 }} />
              </AvatarWrapper>
              <Typography variant="h4" noWrap>
                Notas de Ventas
              </Typography>
              <Typography variant="subtitle1" noWrap>
                (Del día)
              </Typography>
              <Box
                sx={{
                  pt: 1
                }}
              >
                <Typography variant="h1" gutterBottom noWrap>
                  {dataHome.ordersToday}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={3} item>
          <Card
            sx={{
              px: 1
            }}
          >
            <CardContent>
              <AvatarWrapper>
                <RequestPageIcon color="primary" sx={{ fontSize: 35 }} />
              </AvatarWrapper>
              <Typography variant="h4" noWrap>
                NV Registradas
              </Typography>
              <Typography variant="subtitle1" noWrap>
                (Total)
              </Typography>
              <Box
                sx={{
                  pt: 1
                }}
              >
                <Typography variant="h1" gutterBottom noWrap>
                  {dataHome.totalNotesSalesRegisters}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={3} item>
          <Card
            sx={{
              px: 1
            }}
          >
            <CardContent>
              <AvatarWrapper>
                <LocalShippingIcon color="primary" sx={{ fontSize: 35 }} />
              </AvatarWrapper>
              <Typography variant="h4" noWrap>
                NV Envios
              </Typography>
              <Typography variant="subtitle1" noWrap>
                (Total)
              </Typography>
              <Box
                sx={{
                  pt: 1
                }}
              >
                <Typography variant="h1" gutterBottom noWrap>
                  {dataHome.totalSendsRegisters}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={3} item>
          <Card
            sx={{
              px: 1
            }}
          >
            <CardContent>
              <AvatarWrapper>
                <PeopleAltIcon color="primary" sx={{ fontSize: 35 }} />
              </AvatarWrapper>
              <Typography variant="h4" noWrap>
                Usuarios
              </Typography>
              <Typography variant="subtitle1" noWrap>
                (Total)
              </Typography>
              <Box
                sx={{
                  pt: 1
                }}
              >
                <Typography variant="h1" gutterBottom noWrap>
                  {dataHome.totalUsers}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default CardsInformation;
