import { google } from 'googleapis';


export async function getServerSideProps({ query }) {

  const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });

  const sheets = google.sheets({ version: 'v4', auth });




  const responseCountries = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GEO_SHEET_ID,
    range: `geo!A2:C`,
    majorDimension: 'ROWS',


  });

  const countries = responseCountries.data.values;

  return {
    props: {
      countries,
    },
  };
}

export default function Post({ countries }) {
  return (
    <article>


      <h1>Countries</h1>

      <h1>Countries</h1>

      <table>


        <thead>
          <tr>
            <th>country</th>
            <th>capital</th>
            <th>continent</th>
          </tr>
        </thead>



        <tbody>

          {countries.map((v1, v2, i) => (
            <tr>

              <td>
                {v1[0]}
              </td>

              <td>
                {v1[1]}
              </td>

              <td>
                {v1[2]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}