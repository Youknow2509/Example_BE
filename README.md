# Contact:
- **Mail**: *lytranvinh.work@gmail.com*
- **Github**: *https://github.com/Youknow2509*

# Use:
    - Nestjs BE
    - Google Cloud Platform API Reference for Node
    - Google Sheets API
    - Cookies
    - Auth
    - v.v 

# How to use it:
    - Install node packages: 
        ```bash
            npm i
        ```

    - If else dont have tokens use:
    [Modules](https://github.com/Youknow2509/Modules/tree/master/useGoogleSheets)
    
    - Save token in location: `/src/db/google-sheet/config.json`

    - Write .env
    ```env
        SHEETS_CLIENT_ID={YOUR_SHEETS_CLIENT_ID}
        SHEETS_CLIENT_SECRET={YOUR_SHEETS_CLIENT_SECRET}
        SHEETS_SCOPES={YOUR_SHEETS_SCOPES}
        SHEETS_REDIRECT_URL={YOUR_SHEETS_REDIRECT_URL}
        TOKEN_GOOGLE_SHEET_PATH='./src/db/google-sheet/config.json'
        SHEETS_ID_USER={YOUR_SHEETS_ID_USER}
        SHEETS_RANGE_USER='YOUR_SHEETS_RANGE_USER'
    ```

    - Run: 
    ```bash
        npm run start
    ```
    