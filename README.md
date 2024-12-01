## Getting Started

### First, create a `.env` file and fill it as described in `.env.example`
- To fill `NEXTAUTH_SECRET`, generate a random string
- To fill `WEATHER_API_KEY`, you need to go to [Weather Api](https://www.weatherapi.com/), and obtain API key there.

### Install the dependencies

To install dependencies, run the following command in your project directory:

`yarn install`

### Launch the project Database

To launch the project database, ensure you have Docker and Docker Compose installed. Then, run the following command in your project directory:

`docker-compose up`

This will start the database service as defined in your `docker-compose.yml` file.

### Run database migrations

To install dependencies, run the following command in your project directory:

`npx prisma dev`

### Run the development server:

`yarn dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.