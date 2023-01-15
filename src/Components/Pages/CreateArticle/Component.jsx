import React, { useState } from 'react';
import {
  Box, Button, Container, MenuItem, Stack, TextField, Typography,
} from '@mui/material';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { callFunc, storage } from '../../../Configs/firebase';

export default function Component() {
  const initialState = {
    title: '',
    author: '',
    cover: '',
    type: '-',
  };
  const [fields, setFields] = useState(() => initialState);
  const [img, setImg] = useState('');
  const [content, setContent] = useState('');

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
          console.log(cover);
          setFields({ ...fields, cover });
        });
    }
  };

  const pushData = async (e) => {
    e.preventDefault();
    const callable = callFunc('createArticle');
    const res = await callable({
      ...fields,
      content,
      createdAt: new Date().toISOString(),
    });

    console.log('success', res);
    if (res.data) {
      setFields(() => ({
        title: '',
        author: '',
        cover: '',
        type: '-',
      }));
      setImg('');
      setContent('');
      alert('Data tersimpan ke database');
    }
  };

  const cover = img || fields.cover;
  console.log(fields);

  return (
    <Container sx={{ py: 2 }}>
      <Typography variant="h2">Phinisi Center (Add Content)</Typography>
      <form onSubmit={pushData}>
        <Stack gap={2} mt={2}>
          <TextField label="Title" name="title" placeholder="Title" value={fields.title} onChange={handleChangeField} />
          <TextField label="Author" name="author" placeholder="Author" value={fields.author} onChange={handleChangeField} />
          <TextField label="Type" select name="type" placeholder="Type" value={fields.type} onChange={handleChangeField}>
            <MenuItem value="-" disabled>Choose type</MenuItem>
            <MenuItem value="Sejarah">Sejarah</MenuItem>
            <MenuItem value="Filosofi">Filosofi</MenuItem>
          </TextField>
        </Stack>
        <Box my={2}>
          <CKEditor
            editor={ClassicEditor}
            data={content}
            onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
              setContent(data);
            }}
            onBlur={(event, editor) => {
              console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
              console.log('Focus.', editor);
            }}
            onInit={(editor) => {
              // You can store the "editor" and use when it is needed.
              // console.log("Editor is ready to use!", editor);
              editor.editing.view.change((writer) => {
                writer.setStyle(
                  'height',
                  '200px',
                  editor.editing.view.document.getRoot(),
                );
              });
            }}
          />
        </Box>

        <label>Cover</label>
        <div>
          <TextField name="cover" placeholder="Cover" type="file" onChange={handleChangeImg} />
        </div>
        <Box py={2}>
          {!!cover && <img src={cover} alt="cover" height="100" />}
        </Box>

        <Button variant="contained" type="submit">Post Article</Button>
      </form>
    </Container>
  );
}
