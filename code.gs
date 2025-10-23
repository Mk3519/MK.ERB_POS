// Google Apps Script code for handling form submissions
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet and sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Download Records') || ss.insertSheet('Download Records');
    
    // If this is the first entry, add headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Name',
        'Email',
        'Phone',
        'Business Type',
        'Download Date'
      ]);
    }
    
    // Append the new row of data
    sheet.appendRow([
      new Date(), // Current timestamp
      data.name,
      data.email,
      data.phone,
      data.businessType,
      data.downloadDate
    ]);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Data recorded successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}