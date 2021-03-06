# Getting Started

## Install Node & NPM
Head over to [Node's website](https://nodejs.org/en/download/) and download Nodejs, you'll simultaneously be downloading NPM too.

## Install and Configure PostgreSQL
Head over to [PostgreSQL's website](https://www.postgresql.org/download/) and download the latest version of PostgreSQL. Follow the setup and make sure to remember your credentials

## Install Packages
Once you've cloned this repo, go ahead and install the required packages via NPM
```bash
npm install
```

## Create `.env` file
The `.env` file is where you'll store you sensitive variables which the server will use.
Make sure to include all of the following variables along with their values
```.env
HOST=<your_db_host>
USER=<your_db_username>
PASSWORD=<db_password>
DB=<db_name>
JWT_SECRET=<strong_jwt_password>
```

## Run the Server
Now you can run your development server with the command below
```bash
npm run dev
```