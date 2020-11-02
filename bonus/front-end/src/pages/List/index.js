import React, { useState, useEffect } from 'react';

import { Main, Message } from './styles';

import api from '~/services/api';

import Header from '~/components/Header';

function List() {
  const [data, setData] = useState([]);
  const [fail, setFail] = useState(false);

  useEffect(() => {
    async function getUsers() {
      setFail(false);

      try {
        const response = await api.get('/users');

        const users = response.data.map((user) => {
          const date = user.date_birth.split('T');

          return {
            date_format: date[0],
            ...user,
          };
        });

        setData(users);
      } catch (error) {
        setFail(error);
      }
    }

    getUsers();
  }, [data]);

  return (
    <>
      <Header title="Leitura" />
      <Main>
        <main>
          {data.map((user) => (
            <nav key={user._id}>
              <ul>
                <li>ID: {user._id}</li>
                <li>Nome: {user.first_name}</li>
                <li>Nome do Meio: {user.middle_name}</li>
                <li>Sobrenome: {user.first_name}</li>
                <li>Gênero: {user.gender}</li>
                <li>Data de Nascimento: {user.date_format}</li>
                <li>Idioma: {user.language}</li>
                <li>Telefone: {user.phone}</li>
                <li>E-mail: {user.email}</li>
              </ul>
            </nav>
          ))}
        </main>
        <Message>{fail && <p>Erro ao listar usuarios.</p>}</Message>
      </Main>
    </>
  );
}

export default List;
