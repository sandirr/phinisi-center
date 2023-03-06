import React, { useState } from 'react';
import {
  Button, Stack, Input, Textarea,
} from '@chakra-ui/react';
import { callFunc } from '../../../../../Configs/firebase';

export default function Component({ onSuccess, givenData }) {
  const initialState = {
    question: '',
    answer: '',
  };
  const [fields, setFields] = useState(() => givenData || initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeField = ({ target }) => {
    setFields({ ...fields, [target.name]: target.value });
  };

  const pushData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let callable = callFunc('createFaq');
    let body = {
      ...fields,
      createdAt: new Date().toISOString(),
    };
    if (fields.id) {
      callable = callFunc('updateFaq');
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
    }).catch(() => {
      // console.log(err);
    }).finally(() => {
      setIsLoading(false);
      // onFailed();
    });
  };

  return (
    <form onSubmit={pushData}>
      <Stack gap={2}>
        <Input name="question" placeholder="Pertanyaan" value={fields.question} onChange={handleChangeField} />
        <Textarea rows={3} name="answer" placeholder="Jawaban" value={fields.answer} onChange={handleChangeField} />
        <Input name="index" placeholder="Index" type="number" value={fields.index} onChange={handleChangeField} />
      </Stack>

      <Button isLoading={isLoading} outline type="submit" mt="4">Simpan</Button>
    </form>
  );
}
