import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import Button from 'components/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

function DeleteConfirmationDialog({ open, onClose, onConfirm, loading, errorMessage }) {
  return (
    <Dialog open={open} onClose={loading ? null : onClose}>
      <DialogContent>
        {errorMessage ? (
          <Typography color="error">{errorMessage}</Typography>
        ) : (
          'Ви впевнені, що хочете видалити?'
        )}
      </DialogContent>
      <DialogActions>
        {errorMessage ? (
          <Button onClick={onClose} color="primary" autoFocus>
            Закрити
          </Button>
        ) : (
          <>
            <Button onClick={onClose} color="primary" disabled={loading}>
              Скасувати
            </Button>
            <Button onClick={onConfirm} color="primary" autoFocus disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Видалити'}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmationDialog;
