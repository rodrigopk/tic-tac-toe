import React from 'react';
import { Flex, SimpleGrid } from '@chakra-ui/react';

import { Icons } from './icons';

export const Square = () => (
  <Flex
    align="center"
    justify="center"
    w="16"
    h="16"
    borderWidth="1px"
    borderColor="black"
  >
    <Icons.Circle />
  </Flex>
);

export const Grid = () => (
  <SimpleGrid columns={3} spacing={0} width={16 * 3}>
    <Square />
    <Square />
    <Square />
    <Square />
    <Square />
    <Square />
    <Square />
    <Square />
    <Square />
  </SimpleGrid>
);
