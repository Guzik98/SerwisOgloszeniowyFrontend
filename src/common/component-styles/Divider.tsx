import { Divider, styled } from '@mui/material';

export const StyledDivider = styled(Divider)`
  height: 68px;
  margin: 0 12px;
  width: 1px;
  @media (max-width: 1025px) {
    height: 42px;
    margin: 0 6px;
   }
`;