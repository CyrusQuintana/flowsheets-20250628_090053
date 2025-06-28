function showElementById(id) {
    document.getElementById(id).classList.remove('hidden');
  }

  function hideElementById(id) {
    document.getElementById(id).classList.add('hidden');
  }

  function handleFileUpload() {
    hideElementById('missingFileMessage');
    // Logic to upload file
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }
    
    // Example logic to handle the file upload to a server
    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload-endpoint', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      alert('File uploaded successfully!');
    })
    .catch(error => {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    });
  }

  function handleCancel() {
    hideElementById('missingFileMessage');
  }

  // Google Sheets API Integration
  function checkMissingFile() {
    // Replace with valid Google Sheets API call logic
    const spreadsheetId = 'your_spreadsheet_id';
    const range = 'Sheet1!A1';

    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range
    }).then(response => {
      const result = response.result;
      if (result.values && result.values[0][0] === '') {
        showElementById('missingFileMessage');
      }
    }).catch(err => {
      console.error('Error accessing sheet data:', err);
      alert('Error accessing sheet. Please check your connection and permissions.');
    });
  }

  document.addEventListener('DOMContentLoaded', checkMissingFile);
</script>