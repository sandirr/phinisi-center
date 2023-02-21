/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import {
  Text, Box, Container, Heading, Button, Image, SimpleGrid,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ExampleVideo from '../../../Assets/videoplayback.mp4';
import Images from '../../../Configs/images';
import { LocationIcon, PhinisiIcon } from '../../../Assets/icons/icons';

export default function Component() {
  const videoRef = useRef(null);
  const [play, setPlay] = useState(false);
  const [showBtn, setShowBtn] = useState(true);

  const handleStartVideo = async () => {
    await videoRef.current.play();
    setPlay(true);
  };

  const handlePauseVideo = async () => {
    await videoRef.current.pause();
    setPlay(false);
  };

  const handleStopVideo = async () => {
    await videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setPlay(false);
  };

  const [timer, setTimer] = useState(null);
  const handleBtnVisibility = () => {
    setShowBtn(true);
    if (timer) clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        // do your things...
        setShowBtn(false);
      }, 2000),
    );
  };

  const handleHideBtn = () => {
    setTimeout(() => {
      // do your things...
      setShowBtn(false);
    }, 1000);
  };

  return (
    <Container maxW="7xl">
      <Box
        position="relative"
        borderRadius="3xl"
        overflow="hidden"
        mt="6"
        onMouseMove={handleBtnVisibility}
        onMouseOut={handleHideBtn}
        // onMouseUp={handleStopVideo}
      >
        <Box
          // ref={videoRef}
          // as="video"
          as="img"
          // src={ExampleVideo}
          src={Images.LabuanBajo}
          backgroundSize="cover"
          objectFit="cover"
          minW="full"
          h={[220, 420, 480, 520]}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          onEnded={handleStopVideo}
        />
        <Box
          position="absolute"
          top="0"
          bottom="0.5"
          left="0.5"
          right="0.5"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          background="linear-gradient(0deg, rgba(9, 27, 60, 0.4), rgba(9, 27, 60, 0.4))"
        >
          <Heading
            fontWeight="700"
            size={['md', 'lg', 'xl']}
            color="white"
            lineHeight="100%"
            display={play ? 'none' : 'block'}
          >
            Miliki Phinisi Impian mu
          </Heading>
          <Text
            mt={{ base: '2', md: '4' }}
            color="white"
            fontSize={['xs', 'sm', 'md']}
            fontWeight="400"
            textAlign="center"
            display={play ? 'none' : 'inline-block'}
          >
            kami membantu mewujudkan phinisi impianmu
          </Text>
          {play
            ? (
              <Button
                variant="outline"
                mt={{ base: '2', md: '4' }}
                display={showBtn ? 'inline-block' : 'none'}
                color="white"
                alignItems="center"
                // onClick={handlePauseVideo}
                colorScheme="whiteAlpha"
                fontWeight="semibold"
              >
                Pause
              </Button>
            )
            : (
              <Button
                variant="outline"
                mt={{ base: '2', md: '4' }}
                color="white"
                alignItems="center"
                // onClick={handleStartVideo}
                leftIcon={<Image src={Images.Play} />}
                colorScheme="whiteAlpha"
                fontWeight="semibold"
              >
                How it work
              </Button>
            )}
        </Box>
      </Box>
      <Box mt="6">
        <Heading size="lg">Daftar Vendor</Heading>
        <SimpleGrid
          columns={{
            lg: 5, md: 3, sm: 2, base: 1,
          }}
          gap={{
            lg: 6, md: 5, sm: 4, base: 3,
          }}
          mt="4"
          mb="16"
        >
          {new Array(10).fill(1).map((e, idx) => (
            <Box
              key={idx}
              boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
              borderRadius="16"
              padding="4"
              as={Link}
              to="vendor/contoh"
            >
              <Image
                src="https://images.unsplash.com/photo-1653404786584-2166b81a5b3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
                w="100%"
                objectFit="cover"
                borderRadius={8}
              />
              <Heading size="md" mt={4}>Hj. Rosdaeni</Heading>
              <Box mt={{ lg: 10, base: 6 }}>
                <Box display="flex" alignItems="center" gap="2">
                  <LocationIcon />
                  <Text size="md">Tanaberu</Text>
                </Box>
                <Box display="flex" alignItems="center" gap="2" mt="2">
                  <PhinisiIcon />
                  <Text size="md">14 Phinisi</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Container>
  );
}
