import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';

import { Main, Message } from './styles';

import api from '~/services/api';

import Header from '~/components/Header';

function Update() {
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  async function handleSubmit(data) {
    setSuccess(false);
    setFail(false);

    try {
      await api.put(`/users/${data.id}`, data);

      setSuccess(true);
    } catch (error) {
      setFail(error);
    }
  }

  return (
    <>
      <Header title="Atualizar" />
      <Main>
        <main>
          <Form onSubmit={handleSubmit}>
            <Input type="text" name="id" placeholder="ID do Usuário" />
            <Input type="text" name="first_name" placeholder="Nome" />
            <Input type="text" name="middle_name" placeholder="Nome do Meio" />
            <Input type="text" name="last_name" placeholder="Sobrenome" />
            <Input type="text" name="gender" placeholder="Gênero" />
            <Input
              type="text"
              name="date_birth"
              placeholder="Data ex: Ano/Mês/Dia"
            />
            <Input type="text" name="language" placeholder="Idioma" />
            <Input type="text" name="country" placeholder="País" />
            <Input type="text" name="phone" placeholder="Telefone" />
            <Input type="email" name="email" placeholder="E-mail" />
            <Input type="password" name="password" placeholder="Senha" />
            <button type="submit">Salvar</button>
          </Form>
          <Message>
            {success && <p>Dados atualizados com sucesso!</p>}
            {fail && <p>Falha ao atualizar dados.</p>}
          </Message>
        </main>
      </Main>
    </>
  );
}

export default Update;
