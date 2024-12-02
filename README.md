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

To run database migrations, run the following command in your project directory:

`npx prisma migrate dev`

### Run the development server:

`yarn dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Explanation of technologies used:
- State management: Redux + Redux Saga - I chose this because it's a solution that I'm familiar with and I've had good experiences with it in the past.
- Caching Implementation - I used Next.JS revalidation mechanism set to false to cache city suggestions data, because it's data that does not change at all. For weather search, I used a simple in-memory cache that holds it for 10 minutes, because it's data that changes very often and I need to receive fresh data immediately after cache expiration. There are certainly better ways to handle caching, but because of lack of time and lack of experience with Next.JS caching solutions I wanted to keep it simple for this project.
- ORM: Prisma - I chose Prisma because it's a modern ORM that is easy to configure and use, and it's certainly enough for this project.
- Authentication: I chose NextAuth with Credentials Provider because I needed a simple and easy to use authentication solution, and it's also very well integrated with Next.JS. If I had more time I would implement a custom authentication solution, but I think that NextAuth is more than enough for this project.
