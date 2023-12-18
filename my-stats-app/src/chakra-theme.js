// chakra-theme.js

import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: true,
  },
  colors: {
    brand: {
      50: '#f3faf7',
      // Add more color shades as needed
    },
  },
  fonts: {
    // Customize fonts as needed
    body: 'Inter, system-ui, sans-serif',
    heading: 'Inter, system-ui, sans-serif',
    mono: 'Menlo, monospace',
  },
  components: {
    // Customize components as needed
    Button: {
      // Example customization for the Button component
      baseStyle: {
        _focus: { boxShadow: 'none' },
      },
    },
  },
});

export default theme;
