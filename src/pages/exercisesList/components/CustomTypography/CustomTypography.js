import React from 'react';
import Typography from '@material-ui/core/Typography';

const CustomTypography = ({ color = 'initial', children }) => {
  return <Typography color={color}>{children}</Typography>;
};

export default CustomTypography;
