import styled from '@emotion/styled';
import { FC } from 'react';
import colors from '../styles/colors';

interface IButtonProps {
  backgroundColor: string;
}

const Button = styled.button<IButtonProps>`
  padding: 32px;
  background-color: ${colors.surface[900]};
  font-size: 24px;
  border-radius: 4px;
  color: ${colors.surface[500]};
  font-weight: bold;
  &:hover {
    color: ${colors.surface[50]};
  }
`;

const StyledEmotionButton: FC = () => {
  return <Button backgroundColor="green">This my button component.</Button>;
};

export default StyledEmotionButton;