import React from 'react'
import { Container, Label } from './styles'

export default function SectionInfo() {
  return (
   <Container isVisible={true}>
      <Label>URL Base 
        <span style={{color: 'grey'}}>http://url.base</span>
      </Label>

      <Label>Nome do Projeto
        <span style={{color: 'grey'}}>http://url.base</span>
      </Label>

      <Label>Token de usuario
        <span style={{color: 'grey'}}>**************</span>
      </Label>
   </Container>
  )
}
