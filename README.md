# nuber-sever

> Server for the (N)UBER Clone Course on Nomad Academy.

## DEMO  
[http://nuber.tammolo.com](http://nuber.tammolo.com)


## Project Stack
---
### Front-end
- React
- TypeScript
- Apollo
- Styled Component
- Google Map API

### Back-end
- Node.js
- TypeScript
- Graphql-Yoga
- PostgreSQL
- TypeORM


## Running on Your machine
---
These instructions will get you a copy of the project up and running on your local machine for development or testing purpose.

### Prerequistes
- Node.js v10
- yarn
- PostgreSQL

### Installaction

#### 1. Clone the project
```
$ git clone https://github.com/tmmoond8/nuber-server.git
```
#### 2. Install packages from npm
```
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
```
```


### Public Resolvers:

- [X] Sigin In / Sign Up with Facebook
- [X] Sign In with Email
- [X] Start Phone Number Verification
- [X] Complete Phone Number Verification
- [X] Sign Up with Email
--- 

### Authentication:

- [X] Generate JWT
- [X] Verify JWT

---

### Private Resolvers:

- [X] Verify Email
- [X] Get my Profile
- [X] Update my Profile
- [X] Toggle Driving Mode
- [X] Report Location / Orientation
- [X] Add Place
- [X] Edit Place
- [X] Get My Place
- [X] Delete Place
- [X] See Nearby Drivers
- [X] Subscribe to Nearby Drivers
- [X] Request a Ride
- [X] Get Nearby Ride Requests
- [X] Subscribe to Nearby Ride Requests
- [X] Update Ride Status
- [X] Get Ride
- [X] Subscribe to Ride Status
- [X] Create a Chat Room
- [X] Get Chat Room Messages
- [X] Subscribe to Chat Room Messages
- [X] Send a Chat Message

## Code Chaalange

- [ ] Get Ride History
- [ ] See Ride Detail