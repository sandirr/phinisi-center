import React, { useState } from 'react';
import {
  Button, Container, Text, Stack, Input, Box, Select,
} from '@chakra-ui/react';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { callFunc, storage } from '../../../Configs/firebase';

export default function Component() {
  const initialState = {
    title: '',
    author: '',
    cover: '',
    type: '',
    category: '',
  };
  const [fields, setFields] = useState(() => initialState);
  const [img, setImg] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeField = ({ target }) => {
    setFields({ ...fields, [target.name]: target.value });
  };

  const handleChangeImg = async ({ target }) => {
    if (target.files) {
      // setImg(target.files[0]);
      const file = target.files[0];
      setImg(URL.createObjectURL(file));
      const coverRef = storageRef(storage, `cover/${Date.now().toString()}`);
      await uploadBytes(coverRef, file)
        .then(async () => {
          const cover = await getDownloadURL(coverRef);
          // console.log(cover);
          setFields({ ...fields, cover });
        });
    }
  };

  const pushData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const callable = callFunc('createArticle');
    await callable({
      ...fields,
      content,
      createdAt: new Date().toISOString(),
    }).then(() => {
      setFields(() => ({
        title: '',
        author: '',
        cover: '',
        type: '-',
        category: '-',
      }));
      setImg('');
      setContent('');
      alert('Data berhasil masuk ke databse');
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const cover = img || fields.cover;
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }], // text direction

      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
  ];

  return (
    <Container sx={{ py: 2 }}>
      <Text variant="h2">Phinisi Center (Add Content)</Text>
      <form onSubmit={pushData}>
        <Stack gap={2} mt={2}>
          <Input label="Title" name="title" placeholder="Title" value={fields.title} onChange={handleChangeField} />
          <Input label="Author" name="author" placeholder="Author" value={fields.author} onChange={handleChangeField} />
          <Select name="type" placeholder="Type" value={fields.type} onChange={handleChangeField}>
            <option value="Sejarah">Sejarah</option>
            <option value="Filosofi">Filosofi</option>
            <option value="Artikel">Artikel</option>
          </Select>
          {fields.type === 'Artikel'
          && (
          <Select name="category" placeholder="Category" value={fields.category} onChange={handleChangeField}>
            <option value="Fun Fact">Fun Fact</option>
            <option value="Event">Event</option>
            <option value="Phinisi Update">Phinisi Update</option>
          </Select>
          )}
        </Stack>
        <Box my={2}>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={content}
            onChange={setContent}
          />
        </Box>

        <label>Cover</label>
        <div>
          <Input name="cover" placeholder="Cover" type="file" onChange={handleChangeImg} />
        </div>
        <Box py={2}>
          {!!cover && <img src={cover} alt="cover" height="100" />}
        </Box>

        <Button isLoading={isLoading} outline type="submit">Post Article</Button>
      </form>
    </Container>
  );
}
