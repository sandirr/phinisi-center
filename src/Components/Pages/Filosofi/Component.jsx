import React from 'react';
import {
  Text,
  Box,
  Heading,
  Container,
  SimpleGrid,
  Image,
} from '@chakra-ui/react';
import Images from '../../../Configs/images';

export default function Component() {
  return (
    <Box>
      <Box
        bg={`radial-gradient(15.16% 64.64% at 48.47% 50.07%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%), url(${Images.Hero1})`}
        h={['30vh', '45vh', '60vh', '80vh']}
        w="full"
        bgSize="cover"
        bgRepeat="no-repeat"
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Container maxW="5xl" textAlign="center">
          <Heading size={['lg', 'xl', '2xl', '3xl']}>Filosofi Phinisi</Heading>
          <Text fontSize={['lg', '2xl', '4xl', '6xl']} fontStyle="italic">“Tepu memangmi lopia ri borong, nampa nipatongrangi  ri bantilang”</Text>
          <Text fontSize={['xx-small', 'sm', 'md', '2xl']} mt={2}>“Perahu telah rampung di dalam hutan kemudian mulai dikerjakan di galangan”</Text>
        </Container>
      </Box>

      <Container textAlign="center" maxW="6xl" py={['8', '10', '12']}>
        <Text fontSize={['md', 'lg', 'xl', '3xl']}>
          Keahlian masyarakat Bulukumba dalam pembuatan perahu
          ataupun kapal kayu tradisional telah mengakar jauh dalam
          kehidupan mereka. Mereka percaya bahwa keahlian dan kemampuan
          dalam membuat perahu/kapal diwariskan dari nenek moyang mereka
          yang dengan kemurahan hati membantu memperbaiki kapal Sawerigading
          yang karam setelah di hantam gelombang yang besar.
        </Text>
        <Text cursor="pointer" color="blue.700" mt="4" fontSize={['md', 'lg', 'xl', '3xl']} fontWeight="400">Lebih lanjut &gt;</Text>
      </Container>

      <Box bg="blue.50" py={['10', '12', '14']}>
        <Container maxW="6xl" textAlign="center">
          <Heading size={['md', 'lg']}>Filosofi</Heading>
          <Heading size={['xl', '2xl', '3xl', '4xl']} mt="2">Ritual-Ritual</Heading>
          <Text fontSize={['lg', 'xl', '2xl', '3xl']} mt={['4', '6', '8']}>
            Pada proses pembuatan kapal Phinisi, punggawa beserta
            para pekerjanya melakukan beberapa ritual adat yang telah
            diwariskan sejak dahulu kala, ritual itu masih terjaga
            sampai sekarang, dan merupakan suatu kewajiban yang harus
            dilaksanakan ketika membuat phinisi.
          </Text>
        </Container>
        <Container maxW="7xl">
          <SimpleGrid mt={['8', '10', '12']} columns={[2, 3, 5]} gap={[4, 5, 6]}>
            {new Array(5).fill(0).map((k, i) => (
              <Box
                key={i}
                borderRadius={24}
                bg="white"
                overflow="hidden"
                textAlign="center"
                pb={['4', '6', '8']}
                boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
              >
                <Image src={Images.Hero2} w="full" height={[160, 180, 225, 225]} objectFit="cover" />
                <Box px={2} mt={4}>
                  <Heading fontSize={['lg', 'xl', '2xl']}>
                    Upacara
                    Annakbang Kalibiseang
                  </Heading>
                  <Text fontSize={['sm', 'md', 'lg']}>(menebang lunas)</Text>
                  <Text cursor="pointer" color="blue.700" fontSize={['sm', 'md', 'lg', 'xl']} mt={[4, 5, 6]}>Lebih lanjut &gt;</Text>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
}
