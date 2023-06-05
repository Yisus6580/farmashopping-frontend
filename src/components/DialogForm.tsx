import { Dialog, DialogTitle, Divider } from '@mui/material';
import { FC, ReactNode } from 'react';

type DialogProps = {
  title: string;
  children: ReactNode;
  open: boolean;
  handleClose: () => void;
};

const DialogForm: FC<DialogProps> = ({
  title,
  children,
  open,
  handleClose,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <Divider />
      {children}
    </Dialog>
  );
};

export default DialogForm;
