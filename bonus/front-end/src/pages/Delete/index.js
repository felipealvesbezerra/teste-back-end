import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';

import { Main, Message } from './styles';

import api from '~/services/api';

import Header from '~/components/Header';

function Delete() {
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  async function handleSubmit({ id }) {
    setSuccess(false);
    setFail(false);

    try {
      await api.delete(`/users/${id}`);

      setSuccess(true);
    } catch (error) {
      setFail(error);
    }
  }

  return (
    <>
      <Header title="Excluir" />
      <Main>
        <main>
          <Form onSubmit={handleSubmit}>
            <Input name="id" type="text" placeholder="Digite o ID do usuário" />
            <button type="submit">Excluir</button>
          </Form>
          <Message>
            {success && <p>Dados excluídos com sucesso!</p>}
            {fail && <p>Falha ao exlcuir dados.</p>}
          </Message>
        </main>
      </Main>
    </>
  );
}

export default Delete;
