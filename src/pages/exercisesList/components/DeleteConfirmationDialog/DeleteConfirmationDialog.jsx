import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import Button from 'components/Button' ;


function DeleteConfirmationDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Підтвердження видалення</DialogTitle>
      <DialogContent>
        Ви впевнені, що хочете видалити цю сутність?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Скасувати
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          Видалити
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmationDialog;
