import React from 'react';
import { Dialog, DialogContent, DialogActions } from '@material-ui/core';
import Button from 'components/Button';
import CustomCircularProgress from '../CustomCircularProgress';
import CustomTypography from '../CustomTypography';

function DeleteConfirmationDialog({ open, onClose, onConfirm, loading, errorMessage }) {
  return (
    <Dialog open={open} onClose={loading ? null : onClose}>
      <DialogContent>
        {errorMessage ? (
          <CustomTypography color="error">{errorMessage}</CustomTypography>
        ) : (
          'Ви впевнені, що хочете видалити?'
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={loading}>
          Скасувати
        </Button>
        {!errorMessage && (
          <Button onClick={onConfirm} color="primary" autoFocus disabled={loading}>
            {loading ? <CustomCircularProgress size={24} /> : 'Видалити'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmationDialog;
