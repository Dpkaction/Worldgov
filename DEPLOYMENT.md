# Vercel Deployment Guide

## Environment Variables Setup

### Required Environment Variables for Vercel:

1. **VITE_GOOGLE_APPS_SCRIPT_URL**
   - Your Google Apps Script Web App URL
   - Example: `https://script.google.com/macros/s/AKfycbz3yvN7WfSq4FUD6zUA9ss9TzwUhBHF4iGEeuiuR1kh39GaZ5Tf9twWps45D38qUUyX1Q/exec`

2. **VITE_GOOGLE_APPS_SCRIPT_ID**
   - Your Google Apps Script ID
   - Example: `AKfycbz3yvN7WfSq4FUD6zUA9ss9TzwUhBHF4iGEeuiuR1kh39GaZ5Tf9twWps45D38qUUyX1Q`

3. **VITE_GOOGLE_SHEET_ID** (Optional)
   - Your Google Sheet ID if using a specific sheet
   - Example: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`

4. **VITE_ADMIN_EMAIL** (Optional)
   - Admin email for notifications
   - Example: `admin@brasetz.com`

## Setup Steps:

### 1. Google Apps Script Setup
```javascript
// In your Google Apps Script project:
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Applications");
    
    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Email", "Country", "City", "Phone", "Social", "Intent", "Type"]);
    }
    
    // Add new application
    sheet.appendRow([
      new Date(),
      data.Name,
      data.Email,
      data.Country,
      data.City,
      data.Phone,
      data.Social,
      data.Intent,
      data.Type
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({status: "success"}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({status: "error", message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### 2. Deploy Google Apps Script as Web App
1. Open your Google Apps Script project
2. Go to **Deploy** → **New deployment**
3. Select **Web app**
4. Set **Execute as**: Me
5. Set **Who has access**: Anyone
6. Copy the Web app URL
7. Deploy and copy the Script ID from the URL

### 3. Local Development Setup
1. ✅ `.env` file is already created in project root:
   - Contains all required environment variables
   - Ready for local development
   - This file is ignored by git for security

2. Test locally:
   ```bash
   npm run dev
   ```
   - Verify forms work with environment variables

3. For additional local development, create `.env.local`:
   - Copy content from `.env` file
   - Override specific values if needed

### 4. Vercel Deployment
1. Push your code to GitHub
2. Import your repository to Vercel
3. During import or after deployment:
   - Go to **Settings** → **Environment Variables**
   - Click "Add New"
   - Add each environment variable below:
   
   **Required Variables:**
   - Name: `VITE_GOOGLE_APPS_SCRIPT_URL`
     Value: `https://script.google.com/macros/s/AKfycbz3yvN7WfSq4FUD6zUA9ss9TzwUhBHF4iGEeuiuR1kh39GaZ5Tf9twWps45D38qUUyX1Q/exec`
     Environment: Production, Preview, Development
   
   - Name: `VITE_GOOGLE_APPS_SCRIPT_ID`
     Value: `AKfycbz3yvN7WfSq4FUD6zUA9ss9TzwUhBHF4iGEeuiuR1kh39GaZ5Tf9twWps45D38qUUyX1Q`
     Environment: Production, Preview, Development
   
   - Name: `VITE_GOOGLE_SHEET_ID` (Optional)
     Value: `your_google_sheet_id_here`
     Environment: Production, Preview, Development
   
   - Name: `VITE_ADMIN_EMAIL` (Optional)
     Value: `admin@brasetz.com`
     Environment: Production, Preview, Development

4. Click "Save" then "Redeploy" to apply changes
5. Deploy

### 4. Local Development
Create a `.env.local` file:
```env
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
VITE_GOOGLE_APPS_SCRIPT_ID=YOUR_SCRIPT_ID
VITE_GOOGLE_SHEET_ID=YOUR_SHEET_ID
VITE_ADMIN_EMAIL=admin@brasetz.com
```

## Troubleshooting:

### CORS Issues
- Make sure your Google Apps Script is deployed as a Web App
- Set "Who has access" to "Anyone"
- Use `mode: "no-cors"` in fetch requests

### Form Not Submitting
- Check that the environment variables are set correctly in Vercel
- Verify the Google Apps Script URL is accessible
- Check the Google Sheet permissions

### Missing Environment Variables
- Ensure all variables are added to Vercel Environment Variables
- Check that variable names match exactly (case-sensitive)
- Restart the Vercel deployment after adding variables

## Security Notes:
- Never commit `.env.local` to version control
- Use Vercel's environment variables for production
- Regularly rotate your Google Apps Script deployment
- Monitor your Google Sheet for unauthorized access
