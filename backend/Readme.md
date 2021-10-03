Create a backend database in postgres with name 'weatherly' or any other name if you want.
Create a .env file at the root directory of backend project
add all the fields in .env file from .env.txt
Update all the fields and also update the database name against PGDATABASE field in .env file.

Create .env file with followng contents for eg:-

PGHOST = localhost
PGUSER = postgres
PGDATABASE = weatherly
PGPASSWORD = root
PGPORT = 5432
SSL=false
BACKENDPORT = 8000
OPEN_WEATHER_API_KEY = Some Key
WEATHER_API_URL = https://api.openweathermap.org/data/2.5/weather

Follow steps the start backend

Create a backend database in postgres
npm install
npm run start
