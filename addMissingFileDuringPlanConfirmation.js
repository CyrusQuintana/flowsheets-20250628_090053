const { google } = require('googleapis');
const sheets = google.sheets('v4');

async function authorize() {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'path/to/your/service-account-key.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const client = await auth.getClient();
  return client;
}

async function appendMissingFiles(auth, spreadsheetId, files) {
  const sheetsApi = google.sheets({ version: 'v4', auth });
  const range = 'Sheet1';
  const valueInputOption = 'USER_ENTERED';
  const valueRangeBody = {
    range: range,
    majorDimension: 'ROWS',
    values: files.map(file => [file]),
  };

  try {
    await sheetsApi.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption,
      resource: valueRangeBody,
    });
    console.log('Files appended successfully');
  } catch (error) {
    console.error('Error while appending files: ', error);
  }
}

function addMissingFileDuringPlanConfirmation(sheetId, missingFiles) {
  authorize().then(auth => {
    appendMissingFiles(auth, sheetId, missingFiles);
  }).catch(error => {
    console.error('Error during Google Sheets authorization: ', error);
  });
}

module.exports = addMissingFileDuringPlanConfirmation;