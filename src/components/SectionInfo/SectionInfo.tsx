import { Container, Label } from './styles'

export default function SectionInfo() {
  return (
   <Container isVisible={true}>
      <Label>Base URL
        <span style={{color: 'grey'}}>https://dev.azure.com/Itriad-Compal</span>
      </Label>

      <Label>Project Name
        <span style={{color: 'grey'}}>SIDCFF2</span>
      </Label>

      <Label>Token
        <span style={{color: 'grey'}}>**************</span>
      </Label>
   </Container>
  )
}
