import Head from 'next/head';
import { Button } from '@material-ui/core';
import styled from 'styled-components';

const StyledButton = styled(({ children, colorOptions, ...props }) => (
  <Button {...props}>{children}</Button>
))`
  border: 1px solid #eeeeee;
  padding: 10px 15px;
  background-color: ${(props) =>
    props.colorOptions ? props.colorOptions : 'blue'};
`;

export default function Home() {
  return (
    <div className='container'>
      <StyledButton>Test</StyledButton>
    </div>
  );
}
