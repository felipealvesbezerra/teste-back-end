import styled from 'styled-components';

export const Main = styled.div`
  margin-top: 25px;

  nav {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    ul {
      padding: 25px 0;

      li {
        padding: 5px;
      }
    }
  }
`;

export const Message = styled.div`
  max-width: 1280px;
  margin: 10px auto;
  display: flex;
  justify-content: center;

  p {
    padding: 10px;
  }
`;
