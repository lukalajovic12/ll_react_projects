import { google } from 'googleapis';
import { useState} from 'react';


export async function getServerSideProps({ query }) {

    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });
  
    const sheets = google.sheets({ version: 'v4', auth });
  
    const responseSlo = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.KRATKE_UGANKE_ID,
      range: `uganke!A2:A`,
      majorDimension: 'ROWS',
    });
  
    const responseEng = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.KRATKE_UGANKE_ID,
      range: `uganke!B2:B`,
      majorDimension: 'ROWS',
    });
  
    const sloC = responseSlo.data.values;
    const engC = responseEng.data.values;


    const addSlo = sheets.spreadsheets.values.append({
      spreadsheetId: process.env.KRATKE_UGANKE_ID,
      range: `uganke2!A:B`,

      valueInputOption: 'USER_ENTERED',

      insertDataOption: 'INSERT_ROWS', 

      resource: {
        "majorDimension": "ROWS",
        "values": [["Row 1 Col 1","Row 1 Col 2"], ["Row 2 Col 1","Row 2 Col 2"]]
    },

    });

    try {
      const response = await addSlo.data;
    } catch (err) {
      console.error(err);
    }
  

  
    return {
      props: {
        sloC,
        engC,
      },
    };
  }



  export default function Post({sloC, engC }) {
    return (
      <article>
  
        <Choose slo={sloC}  eng={engC}></Choose>
  
      </article>
    );
  }

  function Choose(props){

    const generalStyle={background:"white"}

    const buttonsStyles = {
        display: "flex"
      };

    var [language,setLanguage]=useState('slo');
  
    var [languageD,setLanguageD]=useState(props.slo);
  
    return <div style={generalStyle}><div style={buttonsStyles}>
    <button onClick={() => setLanguage('slo'), () => setLanguageD(props.slo)}>slo</button>
    <button onClick={() => setLanguage('eng'), () => setLanguageD(props.eng)}>eng</button>
    </div>
    <Riddles title={language} list={languageD} /> </div>;
  }

  function Riddles(props) {

    const riddlesStyle ={
        paddingTop:"20px",
        paddingBottom:"20px",
        
        color:"black"
    }

    return <div>
      <h2>{props.title}</h2>
        {props.list.filter(v => v != "None").map((v1, i) => (
          <p style={riddlesStyle}>
            {v1}
          </p>
        ))}
  
    </div>;
  }