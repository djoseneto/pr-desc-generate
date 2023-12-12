import { useRef, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import CustomInput from '../CustomInput/CustomInput';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCopy } from 'react-icons/fa';
import { format } from 'date-fns';

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0;
  padding: 20px;
`;

const Button = styled.button`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #000;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  font-weight: 700;
`;

const Result = styled.p`
  margin-top: 20px;
  font-weight: bold;
`;

const StyledDateInput = styled(DatePicker)`
  color: #ccc;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s ease;
  background-color: #000000;
  width: 100%;
`;

const CopyBoxContainer = styled.div`
  position: relative;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  margin-top: 50px;
`;

const CopyIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;


const PrDescGenerate = () => {
  const [initialDate, setInitialDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [baseUrl, setBaseUrl] = useState('');
  const [projectName, setProjectName] = useState('');
  const [token, setToken] = useState('');
  const [step, setStep] = useState(0);
  const [refs, setRefs] = useState('');

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    if (textAreaRef.current) {
      textAreaRef.current.select();
      document.execCommand('copy');
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    }
  };

  const fetchData = async (initialDate: Date, endDate: Date, baseUrl: string, projectName: string, token: string ) => {

    
    const initialDateFormat = format(initialDate, 'yyyy-MM-dd');
    const endDateFormat = format(endDate, 'yyyy-MM-dd');

    const apiUrl = `${baseUrl}/${projectName}/_apis/git/repositories/3ad99fb9-4d3b-4e2d-8edf-c5b80242743f/pullrequests?searchCriteria.status=completed&api-version=7.1-preview.1&searchCriteria.maxTime=${endDateFormat}T23:59:59&searchCriteria.minTime=${initialDateFormat}T00:00:00`;
    const authorization = 'Basic ' + btoa(':' + token);

    const headers = {
      'Accept': 'application/json',
      'Authorization': authorization
    };

    try {
      const response = await axios.get(apiUrl, { headers });
  
        const prInfo = response.data;
        const pattern = /SIDCFFII-\d+/g;
        const jsonString = JSON.stringify(prInfo);
        const matches = jsonString.match(pattern);

        const uniqueMatches = [...new Set(matches)];

        const sortedData = uniqueMatches.sort((a, b) => {
          return parseInt(a.split('-')[1]) - parseInt(b.split('-')[1]);
        });

        const refsString = sortedData.map((u, index) => {
          return index === sortedData.length - 1 ? `[${u}]` : `[${u}],`;
        }).join('');

        setRefs(`As Refs: ${refsString}`);
      
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  const sectionStep = (step: number) =>
  ({
    0: ( 
        <CustomInput 
          key='0'
          isVisible={true} 
          label='Url Base' 
          placeholder='Inform a URL Base' 
          type="text" 
          onChange={(e)=> setBaseUrl(e.target.value)}
          onClickArrow={() => setStep(1)}  
        />
      ),
      1: ( 
        <CustomInput 
          key='1'
          isVisible={true} 
          label='Nome do Projeto' 
          placeholder='Informe o nome do projeto' 
          type="text" 
          onChange={(e)=> setProjectName(e.target.value)}
          onClickArrow={() => setStep(2)}  
        />
      ),
      2: ( 
        <CustomInput 
          key='2'
          isVisible={true} 
          label='Token de usuario' 
          placeholder='Informe o token de acesso' 
          type="password" 
          onChange={(e)=> setToken(e.target.value)}
          onClickArrow={() => setStep(3)}  
        />
      ),
      3: ( 
       <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
       }}>
          <div style={{display: 'flex', flexDirection: 'column', width: '45%'}}>
            <span>Data Incial</span>
            <StyledDateInput
              selected={initialDate}
              onChange={(value) => setInitialDate(value as Date)}
              dateFormat="MM/dd/yyyy"
            />
          </div>

          <div style={{display: 'flex', flexDirection: 'column', width: '45%'}}>
            <span>Data Final</span>
            <StyledDateInput
              selected={endDate}
              onChange={(value) => setEndDate(value as Date)}
              dateFormat="MM/dd/yyyy"
            />
          </div>
       </div>
      ),
  }[step]);
  

  return (
    <Container>
      {sectionStep(step)}
      <Button onClick={() => fetchData(initialDate as Date, endDate as Date, baseUrl, projectName, token)}>GENERATE</Button>

      <CopyBoxContainer>
        <textarea ref={textAreaRef} value={refs} readOnly style={{ opacity: 0, position: 'absolute', zIndex: -1 }} />
        {isCopied && <div>Copiado!</div>}
        <CopyIcon onClick={handleCopyClick}>
          <FaCopy />
        </CopyIcon>
        <Result>{refs}</Result>
      </CopyBoxContainer>
    </Container>

  );
};

export default PrDescGenerate;
