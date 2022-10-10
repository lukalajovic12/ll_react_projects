import { google } from 'googleapis';



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

  return {
    props: {
      deutschC,
      sloC,
      engC,
    },
  };
}

const styles = {
  display: "flex",
  background: "white",
  fontSize: "32px",
  color: "black"
};


const complimentStyle = {
  background: "blue",
  fontSize: "25px",
  color: "white"
};



export default function Post({ deutschC, sloC, engC }) {
  return (
    <article>


      <h1>Compliments</h1>
      <div style={styles}>
        <Compliments title="de" list={deutschC} />
        <Compliments title="slo" list={sloC} />
        <Compliments title="eng" list={engC} />

      </div>
    </article>
  );
}


function Compliments(props) {
  return <div>
    <h2>{props.title}</h2>
    <ul>
      {props.list.map((v1, i) => (
        <li>
          {v1}
        </li>
      ))}
    </ul>
  </div>;
}



function ComplimentsOld(props) {
  return <div>
    <h2>{props.title}</h2>
    <ul>
      {props.list.map((v1, i) => (
        <li>
          {v1}
        </li>
      ))}
    </ul>
  </div>;
}

