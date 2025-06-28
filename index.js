const { google } = require('googleapis');
const sheets = google.sheets('v4');

// API INTEGRATIONS
async function authorize() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: 'credentials.json',
      scopes: SCOPES,
    });
    const authClient = await auth.getClient();
    return authClient;
  } catch (error) {
    console.error('Error authorizing client:', error);
    throw error;
  }
}

// SHARED LOGIC / UTILITIES
async function getSheetData(auth) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: RANGE,
      auth: auth,
    });
    return response.data.values || [];
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    throw error;
  }
}

async function updateSheetData(auth, values, range = RANGE) {
  try {
    const resource = { values };
    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: range,
      valueInputOption: 'RAW',
      resource: resource,
      auth: auth,
    });
  } catch (error) {
    console.error('Error updating sheet data:', error);
    throw error;
  }
}

// Main function to init Google Sheets API interaction
async function main() {
  try {
    const auth = await authorize();

    // Read current data from the sheet
    const data = await getSheetData(auth);
    console.log('Data from sheet:', data);

    // Update sheet data
    const newData = [
      ['Header1', 'Header2'],
      ['Row1 Col1', 'Row1 Col2'],
    ];

    await updateSheetData(auth, newData);
    console.log('Sheet data updated.');
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

// Configs (Utilizing environment variables for sensitive info)
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const RANGE = process.env.SHEET_RANGE || 'Sheet1!A1:Z1000'; // Default range if not specified
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// Execute the main function
main().catch(console.error);