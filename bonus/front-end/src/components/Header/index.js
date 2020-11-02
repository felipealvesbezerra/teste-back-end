import React from 'react';
import PropTypes from 'prop-types';

import { HeaderContainer } from './styles';

import SubHederContainer from './SubHeader';

function Header({ title }) {
  return (
    <>
      <HeaderContainer>
        <header>
          <h1>{title}</h1>
        </header>
      </HeaderContainer>
      <SubHederContainer />
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string,
};

Header.defaultProps = {
  title: PropTypes.string.isRequired,
};

export default Header;
