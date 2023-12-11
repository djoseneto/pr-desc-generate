
import { Box, Container } from './App';
import Header from './components/Header/Header';
import PrDescGenerate from './components/PrDescGenerate/PrDescGenerate';
import SectionInfo from './components/SectionInfo/SectionInfo';

const App = () => {


 return (
  <Container>
    <Header />
    <Box>
      <SectionInfo />
    </Box>
    <PrDescGenerate />
   </Container>
 );
};

export default App;