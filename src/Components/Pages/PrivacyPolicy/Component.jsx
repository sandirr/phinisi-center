import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Heading,
} from '@chakra-ui/react';
import { callFunc } from '../../../Configs/firebase';
import Elements from '../../Elements';

export default function Component() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPolicy = async () => {
    const callable = callFunc('getPolicy');
    setLoading(true);

    await callable()
      .then((res) => {
        setContent(res.data.content);
      })
      .catch(() => {
        // console.log('anjing', err);
      }).finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getPolicy();
  }, []);

  return (
    <Box py={['8', '10', '12', '14']}>
      <Elements.Loading loading={loading} />
      <Container maxW="4xl">
        <Box textAlign="center">
          <Heading size={['sm', 'md', 'lg']}>Privacy Policy</Heading>
        </Box>
        <Box allowToggle mt={['4', '6', '8', '10']} dangerouslySetInnerHTML={{ __html: content }} />
      </Container>
    </Box>
  );
}
