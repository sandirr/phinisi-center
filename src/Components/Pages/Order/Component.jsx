import React, { useRef, useState } from 'react';
import {
  Text, Box, Container, Heading, Button, Image,
} from '@chakra-ui/react';
import ExampleVideo from '../../../Assets/videoplayback.mp4';
import Images from '../../../Configs/images';

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
          ref={videoRef}
          as="video"
          src={ExampleVideo}
          backgroundSize="cover"
          minW="full"
          minH="full"
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
            size={{
              base: 'lg', lg: 'xl',
            }}
            color="white"
            lineHeight="100%"
            display={play ? 'none' : 'block'}
          >
            Miliki Phinisi Impian mu
          </Heading>
          <Text
            mt={{ base: '2', md: '4' }}
            color="white"
            size={{
              base: 'xs', lg: 'sm',
            }}
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
                onClick={handlePauseVideo}
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
                onClick={handleStartVideo}
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
      </Box>
    </Container>
  );
}
