import React from 'react';
import {
  Box, Button, Container, Typography,
} from '@mui/material';
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../Configs/firebase';

const googleProvider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();

export default function Component() {
  const signinWithGoogle = async () => {
    const data = await signInWithPopup(auth, googleProvider);
    if (data.user) {
      // window.location.reload();
    }
  };

  const signinWithFB = async () => {
    const data = await signInWithPopup(auth, fbProvider);
    if (data.user) {
      // window.location.reload();
    }
  };

  return (
    <Container>
      <Box>
        <Typography variant="h2">Authentication</Typography>

        <Button variant="contained" onClick={signinWithGoogle}>Masuk dengan Google</Button>
        <Button variant="contained" onClick={signinWithFB}>Masuk dengan Facebook</Button>
      </Box>
    </Container>
  );
}
