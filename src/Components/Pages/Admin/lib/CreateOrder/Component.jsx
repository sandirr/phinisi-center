import React, { useState } from 'react';
import {
  Button, Stack, Input, Box, Textarea, Flex, Image, CloseButton, Select,
} from '@chakra-ui/react';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import 'react-quill/dist/quill.snow.css';
import { callFunc, storage } from '../../../../../Configs/firebase';

export default function Component({ onSuccess, givenData, vendor }) {
  const initialState = {
    name: '',
    weight: 0,
    images: [],
    location: '',
    year: '',
    description: '',
    width: 0,
    long: 0,
    capacity: '',
    cabin: '',
    speed: 0,
    progress: 0,
    priority: '',
  };
  const [fields, setFields] = useState(() => givenData || initialState);

  const [isLoading, setIsLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);

  const handleChangeField = ({ target }) => {
    setFields({ ...fields, [target.name]: target.value });
  };

  const handleChangeImg = async ({ target }) => {
    if (target.files) {
      const file = target.files[0];
      if (file) {
        setImgLoading(true);
        const imageRef = storageRef(storage, `order/${Date.now().toString()}`);
        await uploadBytes(imageRef, file)
          .then(async () => {
            const image = await getDownloadURL(imageRef);
            setFields({ ...fields, images: [...fields.images, image] });
          })
          .finally(() => {
            setImgLoading(false);
          });
      }
    }
  };

  const deleteImg = (imgUrl) => {
    setFields({
      ...fields,
      images: fields.images?.filter((img) => img !== imgUrl),
    });
  };

  const pushData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let callable = callFunc('createOrder');
    let body = {
      ...fields,
      createdAt: new Date().toISOString(),
      vendorId: vendor.id,
    };
    if (fields.id) {
      callable = callFunc('updateOrder');
      body = {
        id: fields.id,
        body: {
          ...fields,
          updatedAt: new Date().toISOString(),
        },
      };
    }

    await callable(body).then(() => {
      setFields(() => initialState);
      onSuccess(true);
    }).finally(() => {
      setIsLoading(false);
      // onFailed();
    });
  };

  return (
    <form onSubmit={pushData}>
      <Stack gap={2}>
        <Box>
          <label>Nama Phinisi</label>
          <Input required name="name" placeholder="Augustine Phinisi" value={fields.name} onChange={handleChangeField} />
        </Box>
        <Box>
          <label>Lokasi Pembuatan</label>
          <Input required name="location" placeholder="Labuan Bajo, Nusa Tenggara Timur, Indonesia" value={fields.location} onChange={handleChangeField} />
        </Box>
        <Box>
          <label>Deskripsi</label>
          <Textarea rows={4} name="description" placeholder="Augustine Phinisi is a 30 meter wooden liveaboard vessel," value={fields.description} onChange={handleChangeField} />
        </Box>
        <Box>
          <label>tahun Pembuatan</label>
          <Input required name="created" placeholder="2023" value={fields.created} onChange={handleChangeField} />
        </Box>
        <Box>
          <label>Estimasi Selesai (tahun)</label>
          <Input required name="year" placeholder="2023" value={fields.year} onChange={handleChangeField} />
        </Box>
        <Box>
          <label>Bobot (ton)</label>
          <Input required name="weight" type="number" placeholder="200" value={fields.weight} onChange={handleChangeField} />
        </Box>
        <Box>
          <label>Dimensi (p x l)</label>
          <Flex gap={2}>
            <Box w="full">
              <label>Panjang (m)</label>
              <Input required name="long" type="number" placeholder="27" value={fields.long} onChange={handleChangeField} />
            </Box>
            <Box w="full">
              <label>lebar (m)</label>
              <Input required name="width" type="number" placeholder="7" value={fields.width} onChange={handleChangeField} />
            </Box>
          </Flex>
        </Box>
        <Box>
          <label>Kapasitas (jumlah tamu)</label>
          <Input required name="capacity" type="number" placeholder="14" value={fields.capacity} onChange={handleChangeField} />
        </Box>
        <Box>
          <label>Kabin (jumlah kamar)</label>
          <Input required name="cabin" type="number" placeholder="4" value={fields.cabin} onChange={handleChangeField} />
        </Box>
        <Box>
          <label>Max speed (knot)</label>
          <Input required name="speed" placeholder="10" value={fields.speed} onChange={handleChangeField} />
        </Box>
        <Box>
          <label>Progress</label>
          <Select name="progress" placeholder="Progress" value={fields.progress} onChange={handleChangeField}>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10 (Selesai)</option>
          </Select>
        </Box>
        <Box>
          <label>Prioritas (optional)</label>
          <Select name="priority" placeholder="Prioritas" value={fields.priority} onChange={handleChangeField}>
            <option value="">Don&apos;t set</option>
            <option value="recommended">RECOMMENDED</option>
          </Select>
        </Box>
      </Stack>

      <Box mt={2}>
        <label>Tambahkan gambar (max 8 gambar)</label>
        <div>
          <Input
            accept="image/png, image/jpg, image/jpeg"
            name="images"
            disabled={imgLoading || fields.images?.length >= 8}
            placeholder="Cover"
            type="file"
            onChange={handleChangeImg}
          />
        </div>
      </Box>

      <Flex gap={4} mt={2} flexWrap="wrap">
        {fields.images?.map((imgUrl) => (
          <Box key={imgUrl} position="relative">
            <Image src={imgUrl} h="10" />
            <CloseButton
              onClick={() => deleteImg(imgUrl)}
              bg="blackAlpha.200"
              color="red.500"
              position="absolute"
              top={-1}
              right={-1}
            />
          </Box>
        ))}
        {imgLoading && 'Uploading...'}
      </Flex>

      <Button mt={4} isLoading={isLoading} outline type="submit">Simpan</Button>
    </form>
  );
}
