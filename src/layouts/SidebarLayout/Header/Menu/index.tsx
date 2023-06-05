import { Box, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from 'src/redux/hook';

const ListWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTouchRipple-root {
            display: none;
        }
        
        .MuiListItem-root {
            transition: ${theme.transitions.create(['color', 'fill'])};
            
            &.MuiListItem-indicators {
                padding: ${theme.spacing(1, 2)};
            
                .MuiListItemText-root {
                    .MuiTypography-root {
                        &:before {
                            height: 4px;
                            width: 22px;
                            opacity: 0;
                            visibility: hidden;
                            display: block;
                            position: absolute;
                            bottom: -10px;
                            transition: all .2s;
                            border-radius: ${theme.general.borderRadiusLg};
                            content: "";
                            background: ${theme.colors.primary.main};
                        }
                    }
                }

                &.active,
                &:active,
                &:hover {
                
                    background: transparent;
                
                    .MuiListItemText-root {
                        .MuiTypography-root {
                            &:before {
                                opacity: 1;
                                visibility: visible;
                                bottom: 0px;
                            }
                        }
                    }
                }
            }
        }
`
);

function HeaderMenu() {
  const { sessionData } = useAppSelector((state) => state.auth);

  return (
    <>
      <ListWrapper
        sx={{
          display: {
            xs: 'none',
            md: 'block'
          }
        }}
      >
        <List disablePadding component={Box} display="flex">
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="Inicio"
            />
          </ListItem>
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/notas-de-venta"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="Notas de Venta"
            />
          </ListItem>
          {sessionData.role === 'admin' ? (
            <ListItem
              classes={{ root: 'MuiListItem-indicators' }}
              button
              component={NavLink}
              to="/usuarios"
            >
              <ListItemText
                primaryTypographyProps={{ noWrap: true }}
                primary="Usuarios"
              />
            </ListItem>
          ) : null}
        </List>
      </ListWrapper>
    </>
  );
}

export default HeaderMenu;
