import styled from 'styled-components';

export const Container = styled.div<{isVisible: boolean}>`
    max-width: 49%;
    height: auto;
    border: 1px solid #DADADA;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 20px;
    margin-top: 20px;
    display: ${({ isVisible }: { isVisible: boolean }) => (isVisible ? 'flex' : 'none')};
    flex-direction: column;
    
    :not(:first-child) {
        margin-top: 14px;
    }
`

export const Label = styled.div`
   display: flex;
   flex-direction: row;
   align-items: center;

   span {
    margin-left: 10px;
   }
`