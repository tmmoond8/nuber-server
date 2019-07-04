
### Installaction

#### 1. Clone the project
```bash
$ git clone https://github.com/tmmoond8/nuber-server.git
```
#### 2. Install packages from npm
```bash
$ cd nuber-server
$ yarn
```
#### 3. Rename nuber-server/src/.env.sample to nuber-server/src/.env
```
DB_ENDPOINT=localhost
DB_USERNAME=tamm
DB_PASSWORD=
DB_NAME=number_db
TWILIO_SID={TWILIO_SID}
TWILIO_PHONE={TWILIO_PHONE}
TWILIO_TOKEN={TWILIO_TOKEN}
JWT_TOKEN={TWILIO_TOKEN}
MAILGUN_API_KEY={TWILIO_TOKEN}
```

- [TWILIO](https://www.twilio.com) was used for SMS
- [JWT](https://jwt.io/) was used for jwt authentication
- [MAILGUN](https://www.mailgun.com/) was used for Email

#### 4. Create Database and User
if you use a docker,
```bash
$ docker pull postgres:latest
$ mkdir -p $HOME/data/postgres
$ docker run --rm   --name postgres -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/data/postgres:/var/lib/postgresql/data  postgres

# connect to postgres's bash
$ docker exec -i -t postgres /bin/bash

# exec psql
$ psql -h localhost -U postgres

# create a database
postgres=# CREATE DATABASE nuber
  LC_COLLATE 'C'
  LC_CTYPE 'C'
  ENCODING 'UTF8'
  TEMPLATE template0;

# create a user
postgres=# CREATE USER tamm WITH PASSWORD 'your password';

# grant all to user
postgres=# GRANT ALL PRIVILEGES ON DATABASE nuber to tamm;
```

### 5. Start Nuber back-end Server
```bash
$ yarn dev
```

### 6. Start Nuber front-end Server
```
$ cd nuber-client
$ yarn dev
```