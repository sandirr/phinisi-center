/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
} from '@chakra-ui/react';
import SunEditor from 'suneditor-react';
import { callFunc } from '../../../../../Configs/firebase';
import 'suneditor/dist/css/suneditor.min.css';

export default function Component() {
  const [content, setContent] = useState('');
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(true);

  const updatePolicy = async () => {
    const callable = callFunc('updatePolicy');
    setLoading(true);

    await callable({ id, body: { content } })
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log('success update policy');
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('error update policy', err);
      }).finally(() => {
        setLoading(false);
      });
  };

  const getPolicy = async () => {
    const callable = callFunc('getPolicy');
    setLoading(true);

    await callable({})
      .then((res) => {
        setContent(res.data.content);
        setId(res.data?.id);
      })
      .catch((err) => {
        // console.log('anjing', err);
      }).finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getPolicy();
  }, []);

  return (
    <Box>
      <Flex justify="space-between" mb="2">
        <Heading size="lg">Privacy Policy</Heading>
        <Button colorScheme="blue" onClick={updatePolicy} isLoading={loading}>Save</Button>
      </Flex>
      <SunEditor
          // theme="snow"
          // modules={modules}
          // formats={formats}
        // defaultValue={content}
        setContents={content}
        value={content}
        setAllPlugins
        onChange={setContent}
        height="400px"
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
  );
}
