import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { FaGithubAlt } from 'react-icons/fa';

import styles from '../styles/Fonts.module.css';

const Sidebar = () => {
  return (
    <Flex w='100%' h='3em' alignItems='center' color='gray.50'>
      <Heading fontSize='1.4em' m={2} className={styles.title}>
        lyrify
      </Heading>

      <Flex justifyContent='center' w='100vw' pos='absolute'>
        <Text className={styles.header}>Know your lyrics</Text>
      </Flex>

      <Box ml='auto' mr={5}>
        <a href='https://github.com/0xfffcf'>
          <FaGithubAlt size={20} />
        </a>
      </Box>
    </Flex>
  );
};

export default Sidebar;
