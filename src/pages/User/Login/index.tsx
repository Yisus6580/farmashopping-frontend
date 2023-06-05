import { Box, Card, CardContent, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FC, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { Credentials } from 'src/models/user';
import login from 'src/redux/auth/authActions';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import LoginForm from './LoginForm';

const MainContent = styled(Box)(
  () => `
      height: 100%;
      display: flex;
      flex: 1;
      overflow: auto;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  `
);

const Login: FC = () => {
  const { sessionData } = useAppSelector((state) => state.auth);
  const [credentials, setCredential] = useState<Credentials>({
    email: '',
    password: ''
  });
  const dispath = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = (credential: Credentials) => {
    dispath(login(credential));
  };

  useEffect(() => {
    if (sessionData) {
      navigate('/');
    }
  }, [sessionData]);

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="xs">
          <Card>
            <CardContent>
              <LoginForm
                initialData={credentials}
                onSubmit={async (values) => {
                  handleLogin(values);
                }}
              />
            </CardContent>
          </Card>
        </Container>
      </MainContent>
    </>
  );
};

export default Login;
