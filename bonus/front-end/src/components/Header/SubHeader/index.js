import React from 'react';
import { Link } from 'react-router-dom';

import { SubHeaderContainer } from './styles';

function SubHeader() {
  return (
    <SubHeaderContainer>
      <nav>
        <ul>
          <li>
            <Link to="/">Leitura</Link>
          </li>
          <li>
            <Link to="/store">Salvar</Link>
          </li>
          <li>
            <Link to="/update">Atualizar</Link>
          </li>
          <li>
            <Link to="/delete">Excluir</Link>
          </li>
        </ul>
      </nav>
    </SubHeaderContainer>
  );
}

export default SubHeader;
