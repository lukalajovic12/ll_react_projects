import { google } from 'googleapis';
import { useState, createRef} from 'react';
import { useScreenshot,createFileName  } from 'use-react-screenshot';

export async function getServerSideProps({ query }) {

  const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });
  const sheets = google.sheets({ version: 'v4', auth });

  const responseDe = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.COMPLIMENT_GAME_SHEET_ID,
    range: `komplimenti!A2:A`,
    majorDimension: 'ROWS',
  });

  const responseSlo = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.COMPLIMENT_GAME_SHEET_ID,
    range: `komplimenti!B2:B`,
    majorDimension: 'ROWS',
  });

  const responseEng = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.COMPLIMENT_GAME_SHEET_ID,
    range: `komplimenti!C2:C`,
    majorDimension: 'ROWS',
  });

  const deutschC = responseDe.data.values;
  const sloC = responseSlo.data.values;
  const engC = responseEng.data.values;

  return {props: {deutschC,sloC,engC}};
}

export default function Post({ deutschC, sloC, engC }) {
  return (<Choose  de={deutschC} slo={sloC}  eng={engC}></Choose>);
}

function Choose(props){

  var [language,setLanguage]=useState('eng');
  var [languageD,setLanguageD]=useState(props.de);
  var [numberOfColumns,setNumberOfColumns]=useState(5);

  const generalStyle = {background: "white"};
  const buttonsStyles = {display: "flex"};
  const buttonStyles = { width: "200px", height:"100px", fontSize:"25px"};
  const numberStyles = { width: "100px", height:"50px", color:"black", textAlign:"center", fontSize:"25px"};
  const ref = createRef(null);
  const [image, takeScreenShot] = useScreenshot({type: "image/jpeg",quality: 1.0,
});

 // const getImage = () => takeScreenshot(ref.current);
  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
};  

const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

  return <div style={generalStyle}><div style={buttonsStyles}>
  <button style={buttonStyles} onClick={() => setLanguage('de'), () => setLanguageD(props.de)}>de</button>
  <button style={buttonStyles} onClick={() => setLanguage('slo'), () => setLanguageD(props.slo)}>slo</button>
  <button style={buttonStyles} onClick={() => setLanguage('eng'), () => setLanguageD(props.eng)}>eng</button>
  </div>
  <div style={buttonsStyles}>
    <button style={buttonStyles} onClick={downloadScreenshot}>screenshot</button>
    <button style={buttonStyles}  onClick={() => setNumberOfColumns(numberOfColumns+1)}>plus 1</button> 
    <button style={buttonStyles}  onClick={() => setNumberOfColumns(numberOfColumns-1)}>minus 1</button>
    <div style={numberStyles} >{numberOfColumns}</div>
  </div>  
    <div ref={ref}>
      <Compliments  title={language} list={languageD} numberOfColumns={numberOfColumns} />
    </div>
  </div>;
}

function Compliments(props) {

  const complimentStyle = {background: "white",fontSize: "25px",color: "black",
    width:"200px",height:"100px",borderColor:"black",
    borderWidth:"4px",borderStyle:"solid",textAlign:"center",borderRadius:"5px"};

  const rowStyle ={display:"flex", color: "black"};
  const columnSpaceStyle={width:"20px"};
  const rowSpaceStyle={height:"20px"};
  const columnStyle = {display:"flex"};
  let myList:String[] = props.list;
  let gridList:string[][] = [];
  let j=0;
  let rowList=[];
  for(let i=0;i<myList.length;i++){
    rowList.push(myList[i]);
    j++;
    if(j == props.numberOfColumns){
      j=0;
      gridList.push(rowList);
      rowList=[];
    }
  }
  if(j!=null){
    gridList.push(rowList);
  }
  return <div>
    <h2>{props.title}</h2>
      {gridList.map((v1) => (
        <div>
          <div style={rowSpaceStyle}></div>
          <div style={rowStyle}>
            {v1.map((v2) =>(
            <div style={columnStyle}>
              <div style={columnSpaceStyle}></div>
              <div style={complimentStyle}>
              {v2}
              </div>
            </div> 
            ))}
          </div>
        </div>
      ))}
  <div style={rowSpaceStyle}></div>    
  </div>;
}