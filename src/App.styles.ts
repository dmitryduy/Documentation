import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: 50px;
  width: 100vw;
  min-height: 100vh;
  height: 100vh;
  overflow-x: hidden;
  background-color: ${props => props.theme.colors.background};

  *::-webkit-scrollbar {
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
`;