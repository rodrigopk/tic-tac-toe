import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from './theme';

export const UIProvider = ({ children }) => (
  <React.StrictMode>
    <ChakraProvider theme={theme}>{children}</ChakraProvider>
  </React.StrictMode>
);
