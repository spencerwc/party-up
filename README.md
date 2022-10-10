<p align="center">
    <a href="#">
        <h1 align="center">Party Up</h1>
    </a>
</p> 
<p align="center">
  Start, organize and join groups to play your favorite games and make new connections along the way.
</p>

## Set up MongoDB Atlas

1. Create a new project on [MongoDB Atlas](https://cloud.mongodb.com/).
2. Build a new Database using the Shared cluster and configure the settings to your liking.
3. Create the cluster and configure the authentication settings as well. Ensure that you add your IP Address to the Access List.
4. After finishing the cluster set up, click Connect and Connect your application.
5. Copy the connection string and close.

## Set up IGDB API integration
Follow the steps listed on the (IGDB API docs)[https://api-docs.igdb.com/#about].

1. Sign up / Log in to Twitch.
2. Register a new application in the (Twitch Developer Console)[https://dev.twitch.tv/console/apps/create].
3. Click to manage the newly created application.
4. Generate a Client Secret by pressing [New Secret]
5. Take note of the Client ID and Client Secret.

## Set up and run the app

1. Create a `.env` file at the root of the project.
```shell
touch .env
```

2. Add the saved connection string from the MongoDB Atlas dashboard.
```env
DB_URI=
```

3. Add a SECRET variable to the `.env` file as well. This variable should be a random string that will be used to sign and verify JSON web tokens.
```env
SECRET=
```

4. Add TWITCH_CLIENT_ID and TWITCH_CLIENT_SECRET variables to the `.env` file and save the Client ID and Client Secret from your application in the Twitch Developer Console.
```env
TWITCH_CLIENT_ID=
TWITCH_CLIENT_SECRET=
```

5. Install dependencies
```shell
npm install
```

6. Run the Node server.
```shell
npm run server

```
7. Run the client on <http://localhost:3000>
```shell
npm run client
```

## Made With
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Dayjs](https://day.js.org/)
- [Dotenv](https://github.com/motdotla/dotenv#readme)
- [Express](https://expressjs.com/)
- [JSON Web Tokens](https://jwt.io/)
- [Mantine](https://mantine.dev/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [React Router](https://reactrouter.com/)
