/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Button, Stack, Input, Box, Select,
} from '@chakra-ui/react';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { callFunc, storage } from '../../../../../Configs/firebase';

export default function Component({ onSuccess, onFailed, givenData }) {
  const initialState = {
    title: '',
    author: '',
    cover: '',
    type: '',
    category: '',
  };
  const [fields, setFields] = useState(() => givenData || initialState);
  const [content, setContent] = useState(() => givenData?.content || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeField = ({ target }) => {
    setFields({ ...fields, [target.name]: target.value });
  };

  const handleChangeImg = async ({ target }) => {
    if (target.files) {
      const file = target.files[0];
      const coverRef = storageRef(storage, `cover/${Date.now().toString()}`);
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
    let callable = callFunc('createArticle');
    let body = {
      ...fields,
      rate: fields.rate || 0,
      content,
      createdAt: new Date().toISOString(),
    };
    if (fields.id) {
      callable = callFunc('updateArticle');
      body = {
        id: fields.id,
        body: {
          ...fields,
          rate: fields.rate || 0,
          content,
          updatedAt: new Date().toISOString(),
        },
      };
    }

    await callable(body).then(() => {
      setFields(() => initialState);
      setContent('');
      onSuccess(true);
    }).finally(() => {
      setIsLoading(false);
      onFailed();
    });
  };

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
    <form onSubmit={pushData}>
      <Stack gap={2}>
        <Input label="Title" name="title" placeholder="Judul" value={fields.title} onChange={handleChangeField} />
        <Input label="Author" name="author" placeholder="Penulis" value={fields.author} onChange={handleChangeField} />
        <Select name="type" placeholder="Tipe" value={fields.type} onChange={handleChangeField}>
          <option value="Sejarah">Sejarah</option>
          <option value="Filosofi">Filosofi</option>
          <option value="Artikel">Artikel</option>
        </Select>
        {fields.type === 'Artikel'
          && (
          <Select name="category" placeholder="Kategori" value={fields.category} onChange={handleChangeField}>
            <option value="Fun Fact">Fun Fact</option>
            <option value="Event">Event</option>
            <option value="Phinisi Update">Phinisi Update</option>
          </Select>
          )}
      </Stack>
      <Box my={2}>
        {/* <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={content}
          onChange={setContent}
        /> */}
        <SunEditor
          // theme="snow"
          // modules={modules}
          // formats={formats}
          defaultValue={content}
          value={content}
          setAllPlugins
          onChange={setContent}
          setOptions={{
            buttonList: [
              ['undo', 'redo', 'font', 'fontSize', 'formatBlock'],
              ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
              '/',
              ['fontColor', 'hiliteColor', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'table'],
              ['link', 'image', 'video', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save'],
            ],
          }}
        />
      </Box>

      <label>Cover</label>
      <div>
        <Input name="cover" placeholder="Cover" type="file" onChange={handleChangeImg} />
      </div>
      <Box py={2}>
        {!!fields.cover && <img src={fields.cover} alt="cover" height="100" />}
      </Box>

      <Button isLoading={isLoading} outline type="submit">Simpan</Button>
    </form>
  );
}
