/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useState } from 'react';
import {
  Button, Stack, Input, Box, Textarea, Flex, Image, CloseButton, Select,
} from '@chakra-ui/react';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import 'react-quill/dist/quill.snow.css';
import { callFunc, storage } from '../../../../../Configs/firebase';
import { normalizeOnlyNumber, normalizeRupiah } from '../../../../../Utils/text';

export default function Component({ onSuccess, givenData }) {
  const initialState = {
    name: '',
    weight: '',
    images: [],
    location: '',
    year: '',
    description: '',
    width: '',
    long: '',
    capacity: '',
    cabin: '',
    speed: '',
    status: '',
    priority: '',
    maxPax: '',
    price: '',
    projectBy: '',

    sunset: false,
    sunrise: false,
    wifi: false,
    breakfast: false,
    lunch: false,
    tv: false,
    ac: false,
    hairDryer: false,
    kitchen: false,
    pool: false,
  };
  const [fields, setFields] = useState(() => givenData || initialState);

  const [isLoading, setIsLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);

  const handleChangeField = ({ target }) => {
    setFields({ ...fields, [target.name]: target.value });
  };

  const handleChangeFasility = ({ target }) => {
    setFields({ ...fields, [target.name]: target.checked });
  };

  const handleChangePrice = ({ target }) => {
    const val = normalizeOnlyNumber(target.value || '');
    setFields({ ...fields, price: val });
  };

  const handleChangeImg = async ({ target }) => {
    if (target.files) {
      const file = target.files[0];
      if (file) {
        setImgLoading(true);
        const imageRef = storageRef(storage, `book/${Date.now().toString()}`);
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
    let callable = callFunc('createBooking');
    let body = {
      ...fields,
      weight: Number(fields.weight),
      width: Number(fields.width),
      long: Number(fields.long),
      speed: Number(fields.speed),
      maxPax: Number(fields.maxPax),
      createdAt: new Date().toISOString(),
    };
    if (fields.id) {
      callable = callFunc('updateBooking');
      body = {
        id: fields.id,
        body: {
          ...fields,
          weight: Number(fields.weight),
          width: Number(fields.width),
          long: Number(fields.long),
          speed: Number(fields.speed),
          maxPax: Number(fields.maxPax),
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
          <label>Project By</label>
          <Input required name="projectBy" placeholder="Hj Ulli" value={fields.projectBy} onChange={handleChangeField} />
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
          <label>Tahun Pembuatan</label>
          <Input required name="created" placeholder="2023" value={fields.created} onChange={handleChangeField} />
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
          <label>Jumlah Pax (per booking)</label>
          <Input required name="maxPax" type="number" placeholder="12" value={fields.maxPax} onChange={handleChangeField} />
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
          <label>Fasilitas</label>
          <Flex alignItems="center" gap="2">
            <input type="checkbox" name="sunset" checked={fields.sunset} onChange={handleChangeFasility} />
            <label>Pemandangan Sunset</label>
          </Flex>
          <Flex alignItems="center" gap="2">
            <input type="checkbox" name="sunrise" checked={fields.sunrise} onChange={handleChangeFasility} />
            <label>Pemandangan Sunrise</label>
          </Flex>
          <Flex alignItems="center" gap="2">
            <input type="checkbox" name="wifi" checked={fields.wifi} onChange={handleChangeFasility} />
            <label>Free Wifi</label>
          </Flex>
          <Flex alignItems="center" gap="2">
            <input type="checkbox" name="breakfast" checked={fields.breakfast} onChange={handleChangeFasility} />
            <label>Free Breakfast</label>
          </Flex>
          <Flex alignItems="center" gap="2">
            <input type="checkbox" name="lunch" checked={fields.lunch} onChange={handleChangeFasility} />
            <label>Free Lunch</label>
          </Flex>
          <Flex alignItems="center" gap="2">
            <input type="checkbox" name="tv" checked={fields.tv} onChange={handleChangeFasility} />
            <label>TV</label>
          </Flex>
          <Flex alignItems="center" name="ac" checked={fields.ac} onChange={handleChangeFasility} gap="2">
            <input type="checkbox" />
            <label>AC</label>
          </Flex>
          <Flex alignItems="center" gap="2">
            <input type="checkbox" name="hairDryer" checked={fields.hairDryer} onChange={handleChangeFasility} />
            <label>Hair Dryer</label>
          </Flex>
          <Flex alignItems="center" gap="2">
            <input type="checkbox" name="kitchen" checked={fields.kitchen} onChange={handleChangeFasility} />
            <label>Dapur</label>
          </Flex>
          <Flex alignItems="center" gap="2">
            <input type="checkbox" name="pool" checked={fields.pool} onChange={handleChangeFasility} />
            <label>Kolam Renang</label>
          </Flex>
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
