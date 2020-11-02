import styled from 'styled-components';

export const Main = styled.div`
  main {
    max-width: 1280px;
    margin: 35px auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    form {
      display: flex;
      flex-direction: column;

      input {
        background: white;
        margin: 10px;
        padding: 13px;
        border-radius: 5px;
        border: 0;
        outline: 0;
      }

      button {
        background: #836fff;
        margin-top: 35px;
        padding: 13px;
        color: white;
        font-weight: bold;
        border: 0;
        outline: 0;
        border-radius: 5px;
      }
    }
  }
`;

export const Message = styled.div`
  margin: 10px;

  p {
    padding: 10px;
  }
`;
