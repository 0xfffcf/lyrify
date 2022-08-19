import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import Image from 'next/image';

import styles from '../styles/Fonts.module.css';
import Sidebar from './Sidebar';

const AUTH_URL =
  'https://accounts.spotify.com/authorize?client_id=452c9463380b48d8974e7e3778c4f2ff&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';

const Login = () => {
  return (
    <Box w='100vw' h='100vh' bgColor='blackAlpha.900'>
      <Sidebar />
      <Flex mt='5em' ml='20em' color='white'>
        <Heading className={styles.chill} mt={10} fontSize={'15em'}>
          lyrify
        </Heading>

        <Box
          w='30em'
          h='40em'
          ml='20em'
          borderRadius='1em'
          border='2px'
          borderColor='blue.400'
          overflow='hidden'
        >
          <Image
            src='/lyrify.png'
            width='30em'
            height='40em'
            layout='responsive'
          />
        </Box>
      </Flex>

      <Flex justifyContent='center'>
        <Flex
          bgColor='blackAlpha.400'
          w='15%'
          h='5em'
          borderRadius={10}
          justifyContent='center'
          alignItems='center'
          pos='absolute'
          bottom={0}
          mb='2em'
        >
          <a href={AUTH_URL}>
            <Button colorScheme={'messenger'} w={125}>
              Login
            </Button>
          </a>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Login;
