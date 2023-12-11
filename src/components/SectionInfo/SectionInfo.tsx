import { Container, Label } from './styles'

export default function SectionInfo() {
  return (
   <Container isVisible={true}>
      <Label>Base URL
        <span style={{color: 'grey'}}>http://url.base</span>
      </Label>

      <Label>Project Name
        <span style={{color: 'grey'}}>http://url.base</span>
      </Label>

      <Label>Token
        <span style={{color: 'grey'}}>**************</span>
      </Label>
   </Container>
  )
}
