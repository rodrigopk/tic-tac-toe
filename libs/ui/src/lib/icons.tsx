import React from 'react';
import { Icon } from '@chakra-ui/react';
import { FaRegCircle, FaTimes } from 'react-icons/fa';

const Circle = () => <Icon as={FaRegCircle} w={8} h={8} />;
const Cross = () => <Icon as={FaTimes} w={8} h={8} />;

export const Icons = {
  Circle,
  Cross,
};
