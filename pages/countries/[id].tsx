import { google } from 'googleapis';

export async function getServerSideProps({ query }) {

    // Auth
    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });

    const sheets = google.sheets({ version: 'v4', auth });

    // Query

    const { id } = query;
    const rangeC = `geo!A${id}:C${id}`;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GEO_SHEET_ID,
      range:rangeC,
    });

    // Result

    const [country, capital,continent] = response.data.values[0];
  

    return { 
        props: {
            country,
            capital,
            continent
        } 
    }
}

export default function Post({ country, capital,continent }) {
    return <article>
        <h1>{country}</h1>
        <h1>{capital}</h1>
        <h1>{continent}</h1>
    </article>
}