import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  margin-top: 50px;
  width: 100vw;
  min-height: calc(100vh - 50px);
  overflow-x: hidden;
  background-color: ${props => props.theme.colors.background};


  *::-webkit-scrollbar, body::-webkit-scrollbar {
    width: 4px;
    height: 4px;
    background-color: ${props => props.theme.colors.scrollbar};
    border-radius: 2px;
  }

  *::-webkit-scrollbar-thumb {
    width: 4px;
    height: 4px;
    background-color: ${props => props.theme.colors.thumb};
    border-radius: 2px;
  }


  *::-webkit-scrollbar-thumb:hover {
    background-color: #a7a7a7;
  }

  .without-scroll::-webkit-scrollbar-thumb {
    width: 0;
    height: 0;
  }

  .without-scroll::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;