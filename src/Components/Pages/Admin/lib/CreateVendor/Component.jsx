import React, { useState } from 'react';
import {
  Button, Stack, Input, Box, IconButton, Heading, Text,
} from '@chakra-ui/react';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import 'react-quill/dist/quill.snow.css';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { callFunc, storage } from '../../../../../Configs/firebase';

export default function Component({ onSuccess, onFailed, givenData }) {
  const initialState = {
    name: '',
    tagline: '',
    cover: '',
    location: '',
    year: '',
    description: '',
  };
  const [fields, setFields] = useState(() => givenData || initialState);
  const [img, setImg] = useState('');
  const [certificates, setCertificates] = useState(() => givenData?.certificates || []);
  const [certi, setCerti] = useState({
    name: '',
    desc: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const addCerti = () => {
    setCertificates([...certificates, certi]);
    setCerti({
      name: '',
      desc: '',
    });
  };

  const deleteCerti = (name) => {
    setCertificates(certificates.filter((certificate) => certificate.name !== name));
  };

  const handleChangeField = ({ target }) => {
    setFields({ ...fields, [target.name]: target.value });
  };

  const handleChangeCer = ({ target }) => {
    setCerti({ ...certi, [target.name]: target.value });
  };

  const handleChangeImg = async ({ target }) => {
    if (target.files) {
      const file = target.files[0];
      setImg(URL.createObjectURL(file));
      const coverRef = storageRef(storage, `vendor/${Date.now().toString()}`);
      await uploadBytes(coverRef, file)
        .then(async () => {
          const cover = await getDownloadURL(coverRef);
          setFields({ ...fields, cover });
        });
    }
  };

  const pushData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let callable = callFunc('createVendor');
    let body = {
      ...fields,
      certificates,
      createdAt: new Date().toISOString(),
    };
    if (fields.id) {
      callable = callFunc('updateVendor');
      body = {
        id: fields.id,
        body: {
          ...fields,
          certificates,
          updatedAt: new Date().toISOString(),
        },
      };
    }

    await callable(body).then(() => {
      setFields(() => initialState);
      setImg('');
      onSuccess(true);
    }).finally(() => {
      setIsLoading(false);
      onFailed();
    });
  };

  const cover = img || fields.cover;

  return (
    <form onSubmit={pushData}>
      <Stack gap={2}>
        <Input name="name" placeholder="Nama vendor" value={fields.name} onChange={handleChangeField} />
        <Input name="tagline" placeholder="Tagline" value={fields.tagline} onChange={handleChangeField} />
        <Input name="location" placeholder="Lokasi" value={fields.location} onChange={handleChangeField} />
        <Input name="year" placeholder="Tahun berdiri" value={fields.year} onChange={handleChangeField} />
        <Input name="description" placeholder="Deskripsi" value={fields.description} onChange={handleChangeField} />
        <Box>
          <label>Sertifikat</label>
          <Box>
            {certificates.length ? certificates.map((certificate) => (
              <Box
                key={certificate.name}
                border="1px solid #ccc"
                borderRadius={8}
                px={2}
                py={1}
                mb={1}
                display="flex"
                justifyContent="space-between"
              >
                <Box>
                  <Heading size="sm">{certificate.name}</Heading>
                  <Text size="sm" color="grey">{certificate.desc}</Text>
                </Box>
                <IconButton onClick={() => deleteCerti(certificate.name)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            )) : <Text size="sm" color="grey">Belum ada sertifikat. Tambahkan sertifikat!</Text>}
          </Box>
          <Stack gap={2} direction="row" mt={2}>
            <Input name="name" placeholder="Nama sertifikat" value={certi.name} onChange={handleChangeCer} />
            <Input name="desc" placeholder="Deskripsi sertifikat" value={certi.desc} onChange={handleChangeCer} />
            <IconButton onClick={addCerti}>
              <AddIcon />
            </IconButton>
          </Stack>
        </Box>
      </Stack>

      <Box mt={2}>
        <label>Profile pict</label>
        <div>
          <Input name="cover" placeholder="Cover" type="file" onChange={handleChangeImg} />
        </div>
        <Box py={2}>
          {!!cover && <img src={cover} alt="cover" height="100" />}
        </Box>
      </Box>

      <Button isLoading={isLoading} outline type="submit">Simpan</Button>
    </form>
  );
}
