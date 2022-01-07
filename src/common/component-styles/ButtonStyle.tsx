import { Button, styled } from '@mui/material';

export const SubmitButtonStyled = styled(Button)`
  background-color: #ffffff;
  color: #5F656B;
  font-weight: 400;
  margin: 6px;
  padding: 8px 16px;
  font-size: 0.875rem;
  min-width: 64px;
  line-height: 1.75;
  white-space: nowrap;
  border-radius: 32px;
  letter-spacing: 0.5px;
  text-transform: none;
  border: 1px solid #E4E8F0;
  @media (max-width: 1025px) {
    height: 30px;
    margin-top: 10px;
    margin-bottom: 4px;
    margin-left: 0;
    margin-right: 0;
  }
  '&: hover'
      background-color: #f3e9e9;
      cursor: pointer;
`