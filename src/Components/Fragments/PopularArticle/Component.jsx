import React from 'react';
import {
  Box, Button, Container, Grid, GridItem, Heading,
} from '@chakra-ui/react';

export default function Component() {
  return (
    <Box my={10}>
      <Container maxW="3xl">
        <Heading color="blackAlpha.900" size="md" ml={2.5}>Artikel Populer</Heading>
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={6} mt={2}>
          {[1, 2, 3].map((i) => (
            <GridItem key={i} rowSpan={i === 1 ? 2 : 1} height={i === 1 ? 450 : 'auto'}>
              <Box
                style={{
                  backgroundSize: 'cover',
                  borderRadius: 24,
                  background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 59.36%), url("https://images.unsplash.com/photo-1653404786584-2166b81a5b3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80")',
                }}
                height="100%"
                pl={{ base: '6', md: '8', lg: '12' }}
                py="12"
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
              >
                <Heading size="xs" color="white" fontWeight="700">FUN FACT</Heading>
                <Heading size={{ base: 'xs', lg: 'md' }} color="white" fontWeight="700" width={175} lineHeight="120%" mt={1}>
                  5 Phinisi termahal
                  Sepanjang Masa
                </Heading>
                <Button mt={4} py="1.5" px="3" fontWeight="semibold" bg="gray.100" color="gray.800" alignSelf="flex-start" size="sm">Baca Artikel</Button>
              </Box>
            </GridItem>
          ))}

        </Grid>
      </Container>
    </Box>
  );
}
