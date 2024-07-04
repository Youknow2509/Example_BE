# Contact:
- **Mail**: *lytranvinh.work@gmail.com*
- **Github**: *https://github.com/Youknow2509*

# Description:
- Nestjs BE
- Google Cloud Platform API Reference for Node
- Google Sheets API
- Cookies
- Auth
- REST API
- Authorization, roles
- v.v 

# How to use it:
- Install node packages: 
    ```bash
        npm i
    ```

- If else dont have tokens use or want creat new token open path: `http://localhost:{YOUR_PORT}/create-token`.

- Save token in location: `/src/db/google-sheet/config.json`
Ex: 
    ```JSON
        {
            "access_token": "YOUR_ACCESS_TOKEN",
            "refresh_token": "YOUR_REFRESH_TOKEN",
            "scope": "YOUR_SCOPE",
            "token_type": "YOUR_TOKEN_TYPE",
            "expiry_date": YOUR_EXPIRY_DATE
        }
    ```

- Write .env
    ```env
        SHEETS_CLIENT_ID={YOUR_SHEETS_CLIENT_ID}
        SHEETS_CLIENT_SECRET={YOUR_SHEETS_CLIENT_SECRET}
        SHEETS_SCOPES={YOUR_SHEETS_SCOPES}
        SHEETS_REDIRECT_URL={YOUR_SHEETS_REDIRECT_URL}
        TOKEN_GOOGLE_SHEET_PATH='./src/db/google-sheet/config.json'
        SHEETS_ID_USER={YOUR_SHEETS_ID_USER}
        SHEETS_RANGE_USER='YOUR_SHEETS_RANGE_USER'
        PATH_LOG='./src'
        JWT_SECRET_KEY={YOUR_JWT_SECRET_KEY}
        ROLE_ROOT='{YOUR_ROOT}'
        PASSWORD_ENCRYPTION='{YOUR_PASSWORD_ENCRYPTION}'
        KEY_ENCRYPTION='{YOUR_KEY_ENCRYPTION_HASH_32b}'
        IV_ENCRYPTION='{YOUR_IV_ENCRYPTION_16bit}'
        SALT_ENCRYPTION='{YOUR_SALT_ENCRYPTION_16bit}'
        ALGORITHM_ENCRYPTION='{YOUR_ALGORITHM_ENCRYPTION_USE}'
        SALT_ROUNDS={YOUR_SALT_ROUNDS}
    ```

- Run: 
    ```bash
        npm run start:dev
    ```
    
- Use Swagger REST API in: `http://localhost:{YOUR_PORT}/api`.