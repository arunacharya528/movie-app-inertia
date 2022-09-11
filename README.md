# Movie App

This is an assignment assighed by technorio to validate my assessment skills

Runs perfectly in _Composer version 2.2.9_ and _node version 16.17.0_

To run this application follow these steps

1. Clone this application following github instructions
1. Install composer dependencies using `composer i`
1. Install node dependencies using `npm i`
1. Build application using `npm run build`
1. Copy contents of `.env.example` to `.env` file
1. Create mysql database and paste these codes in `.env` file

    ```
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=<database name>
    DB_USERNAME=root
    DB_PASSWORD=
    ```

1. Migrate database using `php artisan migrate`
1. Seed the database using `php artisan db:seed`

    Default admin account: _admin@movieapp.com_

    Default user account: _user@movieapp.com_

    Default password for both account: _password_

1. To add email server paste following code in `.env` file

    _I have tested this with mailtrap server hence i recommend it's usage_

    ```
    MAIL_MAILER=smtp
    MAIL_HOST=smtp.mailtrap.io
    MAIL_PORT=2525
    MAIL_USERNAME={mailtrap username}
    MAIL_PASSWORD={mailtrap password}
    MAIL_ENCRYPTION=tls
    MAIL_FROM_ADDRESS="noreply@movieapp.com"
    MAIL_FROM_NAME="${APP_NAME}"
    ```

1. Run command `php artisan key:generate` which generates unique key
1. Run command `php artisan serve` to run the application. A local link will be generated. Paste the link as

    ```
    APP_URL=<given link>
    ```

    in `.env` file. Modify value of `APP_NAME` and other variable as you see fit

1. Run command `php artisan storage:link` to link storage folder with public folder
