import styled from 'styled-components'
import { FaLongArrowAltRight } from "react-icons/fa"


export const Box = styled.div<{isVisible: boolean}>`
  opacity: ${({ isVisible }: { isVisible: boolean }) => (isVisible ? 1 : 0)};
  width: ${({ isVisible }: { isVisible: boolean }) => (isVisible ? 'auto' : 0)};
  display: ${({ isVisible }: { isVisible: boolean }) => (isVisible ? 'flex' : 'none')};
  overflow: hidden;
  transition: opacity 0.3s ease, width 0.3s ease;
  align-items: center;
  border: 1px solid #DADADA;
  border-radius: 7px;
  box-sizing: border-box;
  padding: 14px;
  font-size: 16px;
  height: 50px;
`

export const Label = styled.h1`
  font-size: 16px;
`;

export const InputComponent = styled.input`
    border: none;
    outline: none;
    width: 100%;
    font-size: 16px;
    background: transparent;
`

export const Arrow = styled(FaLongArrowAltRight)`
    cursor: pointer;
    font-size: 20px;

    :hover { 
        transition: color 0.3s ease;
        color: grey;
     }
`