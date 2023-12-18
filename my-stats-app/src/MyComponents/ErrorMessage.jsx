import React from 'react';
import { Alert } from '@chakra-ui/react';

const ErrorMessage = ({ error }) => (
  <Alert status="error" mt={4}>
    {error}
  </Alert>
);

export default ErrorMessage;
