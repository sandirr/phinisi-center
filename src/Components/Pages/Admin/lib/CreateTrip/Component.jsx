import React, { useState } from 'react';
import {
  Button, Stack, Input, Box, Textarea, Flex, Image, CloseButton, Select,
} from '@chakra-ui/react';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import 'react-quill/dist/quill.snow.css';
import moment from 'moment';
import { callFunc, storage } from '../../../../../Configs/firebase';
import { normalizeOnlyNumber, normalizeRupiah } from '../../../../../Utils/text';

export default function Component({ onSuccess, givenData }) {
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
    speed: '',
    date: moment().add('weeks', 2).format('YYYY-MM-DD'),
  };
  const [fields, setFields] = useState(() => (givenData
    ? { ...givenData, date: moment(givenData.date).format('YYYY-MM-DD') } : initialState));

  const [isLoading, setIsLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);

  const handleChangeField = ({ target }) => {
    setFields({ ...fields, [target.name]: target.value });
  };

  const handleChangePrice = ({ target }) => {
    const val = normalizeOnlyNumber(target.value);
    setFields({ ...fields, price: val });
  };

  const handleChangeImg = async ({ target }) => {
    if (target.files) {
      const file = target.files[0];
      if (file) {
        setImgLoading(true);
        const imageRef = storageRef(storage, `trip/${Date.now().toString()}`);
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
    let callable = callFunc('createTrip');
    let body = {
      ...fields,
      weight: Number(fields.weight),
      width: Number(fields.width),
      long: Number(fields.long),
      speed: Number(fields.speed),
      createdAt: new Date().toISOString(),
      date: new Date(fields.date).toISOString(),
      maxPax: Number(fields.maxPax),
    };
    if (fields.id) {
      callable = callFunc('updateTrip');
      body = {
        id: fields.id,
        body: {
          ...fields,
          weight: Number(fields.weight),
          width: Number(fields.width),
          long: Number(fields.long),
          updatedAt: new Date().toISOString(),
          date: new Date(fields.date).toISOString(),
          maxPax: Number(fields.maxPax),
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
          <label>Lokasi Kumpul</label>
          <Input required name="from" placeholder="Bulukumba" value={fields.from} onChange={handleChangeField} />
        </Box>
        <Box>
          <label>Lokasi/Tujuan Trip</label>
          <Input required name="location" placeholder="Labuan Bajo, Nusa Tenggara Timur, Indonesia" value={fields.location} onChange={handleChangeField} />
        </Box>
        <Box>
          <label>Deskripsi</label>
          <Textarea rows={4} name="description" placeholder="Augustine Phinisi is a 30 meter wooden liveaboard vessel," value={fields.description} onChange={handleChangeField} />
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
          <label>Max Pax (per booking)</label>
          <Input required name="maxPax" type="number" placeholder="14" value={fields.maxPax} onChange={handleChangeField} />
        </Box>
        <Box>
          <label>Harga/Pax (rupiah)</label>
          <Input required name="price" placeholder="200.000" value={normalizeRupiah(`${fields.price}`)} onChange={handleChangePrice} />
        </Box>
        <Box>
          <label>Kabin (jumlah kamar)</label>
          <Input required name="cabin" type="number" placeholder="4" value={fields.cabin} onChange={handleChangeField} />
        </Box>
        <Box>
          <label>WC (jumlah kamar mandi)</label>
          <Input required name="wc" type="number" placeholder="2" value={fields.wc} onChange={handleChangeField} />
        </Box>
        <Box>
          <label>Max speed (knot)</label>
          <Input required name="speed" placeholder="10" value={fields.speed} onChange={handleChangeField} />
        </Box>
        <Box>
          <label>Tanggal Berangkat</label>
          <Input required name="date" type="date" value={fields.date} onChange={handleChangeField} />
        </Box>
        <Box>
          <label>Status</label>
          <Select name="status" placeholder="Status booking" value={fields.status} onChange={handleChangeField}>
            <option value="Draft">Draft/Close</option>
            <option value="Open">Open</option>
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

      {fields.invoice
      && (
      <Box mt={2}>
        <label>Invoice/Bukti Pembayaran</label>
        <Image src={fields.invoice} h="120px" />
      </Box>
      )}

      <Button mt={4} isLoading={isLoading} outline type="submit">Simpan</Button>
    </form>
  );
}
