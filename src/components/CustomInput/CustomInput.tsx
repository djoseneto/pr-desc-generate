import { Arrow, Box, InputComponent, Label } from "./styles";


export interface InputProps {
  onClickArrow?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: 'text' | 'calendar' | 'password';
  placeholder: string;
  isVisible: boolean; 
  label: string;
} 

export default function CustomInput({onClickArrow, onChange , type, placeholder, isVisible}: InputProps) {

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickArrow
    }
  };

  return (
    <Box isVisible={isVisible}>
      <Label />
      <InputComponent type={type} placeholder={placeholder} onChange={onChange} onKeyPress={handleKeyPress} />
      <Arrow onClick={onClickArrow} />
    </Box>
  )
}
