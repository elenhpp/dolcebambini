# Google Maps Setup

The shops map now uses Google Maps for a detailed, interactive experience focused on Greece.

## Getting Your API Key

1. **Go to Google Cloud Console**: https://console.cloud.google.com/

2. **Create a new project** (or use an existing one):
   - Click on the project dropdown at the top
   - Select "NEW PROJECT"
   - Name it (e.g., "Dolce Bambini")
   - Click "CREATE"

3. **Enable the Maps JavaScript API**:
   - In the top search bar, type "Maps JavaScript API"
   - Click on it in the results
   - Click "ENABLE"

4. **Create an API Key**:
   - Click on "Credentials" in the left sidebar
   - Click "Create Credentials" → "API Key"
   - Your API key will appear in a popup
   - Copy it

5. **Add the key to your .env file**:
   ```
   VITE_GOOGLE_MAPS_API_KEY="your_api_key_here"
   ```

6. **(Optional but recommended) Restrict your API key**:
   - In the Credentials page, click on your API key
   - Under "Application restrictions", select "HTTP referrers (web sites)"
   - Add your domain(s):
     - For development: `localhost:*`
     - For production: `yourdomain.com/*`
   - Click "Save"

## Features

✅ Interactive detailed map of Greece  
✅ Click markers to zoom in and view shop details  
✅ Search and filter shops by region  
✅ Responsive design  
✅ Touch-friendly on mobile  

## Troubleshooting

- **"Loading map..." stays indefinitely**: Check that your API key is valid and the Maps API is enabled
- **Map shows errors**: Verify the API key is in the `.env` file and the dev server has been restarted
- **Markers not showing**: Ensure the Google Maps API is enabled in your Google Cloud project
