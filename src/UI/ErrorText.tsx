import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import { OverridableStringUnion } from '@mui/types';
import { Variant } from '@mui/material/styles/createTypography';
import { TypographyPropsVariantOverrides } from '@mui/material/Typography/Typography';

interface ErrorTextProps {
  text: string;
  variant?: OverridableStringUnion<
    Variant | 'inherit',
    TypographyPropsVariantOverrides
  >;
}

const ErrorText: FC<ErrorTextProps> = ({ text, variant }) => {
  return (
    <Typography variant={variant ?? 'h3'} color="error">
      {text}
    </Typography>
  );
};

export default ErrorText;
