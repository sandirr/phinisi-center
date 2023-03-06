import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Heading,
  Text,
} from '@chakra-ui/react';
import { callFunc } from '../../../Configs/firebase';
import Elements from '../../Elements';

export default function Component() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFaqs = async () => {
    const callable = callFunc('getFaqs');
    setLoading(true);

    await callable({ limit: 20, page: 1 })
      .then((res) => {
        const {
          data,
        } = res.data;

        setFaqs(data);
      })
      .catch(() => {
        // console.log('anjing', err);
      }).finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getFaqs();
  }, []);

  return (
    <Box bg="blue.50" minH="85vh" py={['8', '10', '12', '14']}>
      <Elements.Loading loading={loading} />
      <Container maxW="4xl">
        <Box textAlign="center">
          <Heading size={['sm', 'md', 'lg']}>FAQ</Heading>
          <Heading size={['lg', 'xl', '2xl', '3xl']} mt={['1', '2']}>Frequently Asked Questions</Heading>
        </Box>
        <Accordion allowToggle mt={['8', '12', '16', '20']}>
          {faqs.sort((a, b) => b.index - a.index).map((faq) => (
            <AccordionItem key={faq.id} borderColor="gray.300">
              <h2>
                <AccordionButton>
                  <Heading size={['md', 'lg', 'xl']} display="inline-block" flex="1" textAlign="left">
                    {faq.question}
                  </Heading>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Text fontSize={['md', 'lg', 'xl', '2xl', '3xl']} textAlign="justify">
                  {faq.answer}
                </Text>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Box>
  );
}
