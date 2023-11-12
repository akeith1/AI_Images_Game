To run a Laravel project in the console, you can follow these steps³⁴:

1. **Navigate to your project directory**: Open your console and navigate to the root directory of your Laravel project using the `cd` command.

2. **Install dependencies**: Run `composer install` to install the necessary dependencies for your project.

3. **Set up environment variables**: Rename the `.env.example` file to `.env`. You can do this with the command `mv .env.example .env`. Then, open the `.env` file and fill in your database and other configuration information.

4. **Generate an application key**: Run `php artisan key:generate` to generate a key for your application.

5. **Run database migrations**: If your application uses a database, run `php artisan migrate` to run any database migrations.

6. **Seed the database**: If you have any database seeds, you can run them with `php artisan db:seed`.

7. **Start the server**: Finally, you can start the Laravel development server with `php artisan serve`. This will start the server, and you can access your application in your web browser at `http://localhost:8000`.

Remember, these steps assume that you have PHP, Composer, and Laravel installed on your machine. If you don't have these installed, you'll need to install them first.

Then type "npm i" to install the necessary dependencies.

Go obtain an OpenAI API key to access and add it to your new .env folder as "OPENAI_API_TOKEN= {my-api-key}"

fill in PUSHER_APP_ID, PUSHER_APP_KEY, and PUSHER_APP_SECRET with whatever you want for your enviroment variables

You can fill in PUSHER_APP_CLUSTER with 'us3' for now

Lastly, run "php artisan serve", "npm run dev", and "soketi start" simultaniously in seperate consoles.