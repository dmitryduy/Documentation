import styled from 'styled-components';

export const SearchPostStyled = styled.div`
  position: relative;
  max-width: 200px;
  margin-left: auto;
  .input {
    padding-bottom: 0;
  }
`;

export const Results = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 10px;
  transform: translate(calc(-50% - 40px), 14px);
  max-height: 400px;
  left: 50%;
  overflow: auto;
  width: min(300px, calc(100vw - 10px));
  background-color: #fff;
  box-shadow: 0 0 8px 0 rgba(34, 60, 80, 0.2);
  & a{
    font-weight: normal;
    padding: 5px;
    word-break: break-word;
  }
  a:hover {
    background-color:  ${props => props.theme.colors.searchResultsBg};
  }

`;