## RESCUER  APP - RESTFUL API BACKEND

 Rescuer is a mobile application that manages emergency alerts and provides you with a well designed guide for multiple cases of emergencies. Enjoy this! You can trigger an alert that will directly be seen by our partners via their emergencies alerts tracker depending on the services they are assigned and reach you out in a little while.
 We are aiming at reducing the cases of dammages, diseases and deaths but also impact the whole community through technology.

## Features

- Users can sign up and sign in (this is the basic entry point for any user).
- Users can trigger emergency alerts.
- Users can view their profile informations.
- Users can update their profile.
- Super Admins can set some other users as admin or super admins.
- Admins and super admins can view the alerts.
- Admins can approve or acknowledge an emergency according to their responsabilities for rescue purpose.
- Admins can disapprove suspicious or not eligible emergency alerts.
- For better user experience, users can give a feedback according to the provided services or make some requests then.
- Users can view all of their feedbacks and track their status.
- Super Admins can acknowledge any feedback.

## API Endpoints Specifications

- Here are all Peculiar endpoints regarding the above features as for a RESTFUL service.

| Endpoint | Request | Status | Description |
| --- | --- | --- | --- |
| / | GET | 200 OK | Helps users to access to the root of the api |
| /auth/signup | POST | 201 Created | Makes a post request to register a new user or create an account and directly sign in the user|
| /auth/signin | POST | 200 OK | Sign in the user already having a user account |
| /auth/:user-id/role | PATCH | 200 OK | Alter a user role |
| /auth/profile/:user-id | GET | 200 OK | View a user profile |
| /auth/profile/update | PATCH | 200 OK | update user profile |
| /auth/users | GET | 200 OK | view all users |
| /notifications | GET | 200 OK | view notifications |
| /notifications/count | GET | 200 OK | count user notifications |
| /alerts | POST | 201 OK | Trigger an emergency alert |
| /alerts | GET | 200 OK | View all alerts(super admins and admins) |
| /alerts/:alert-id/acknowledge | PATCH | 201 OK | Acknowledge an alert for rescue |
| /alerts/:alert-id/disapprove | PATCH | 201 OK | Disapprove a suspicious alert |
| /feedbacks | POST | 201 OK | Give feedbacks |
| /feedbacks | GET | 200 OK | view feedbacks  |
| /feedbacks/:feedback-id/approve | PATCH | 200 OK | For approving a feedback |

## Tools for Development

Tools used for development of this Application are:
- Framework: [Nodejs/Express](http://expressjs.io/)
- Code Editor/IDE: [VSCode](https://code.visualstudio.com)
- Programming language: [JavaScript(ES6)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/) ,[Typescript](https://www.typescriptlang.org/)
- DBMS : [PostgreSQL](https://www.postgresql.org/)

## Getting Started With Local Tests

- Note that you need to set up primarily The tools for development as for the above section then go through all of the below steps sequentially.

1. Clone the github repository [here](https://github.com/WinnersProx/rescuer-app-backend) and rename `.env.sample` to `.env` file, 

2. Install all the dependencies by running the following command in your command line interface

```sh
    $ npm install
```

3. Create your database and make sure that it complies with the informations supplied in `./server/db.config.js` then in your command line run the command below :

```sh
    $ npm run seeder
```

4. Once you're done making sure that everything is up-to-date, start enjoying it by running the following command in your command line interface and that's it :
```sh
    $ npm start
```
or

```sh
	$ npm start-dev
```

## Deployment
- Heroku : https://rescuer-api.herokuapp.com/api/v1/

## Learning resources
- [Angular University](http://angular-university.io)
- [Ionic](http://ionicframework.com)
- [Pluralsight](http://app.pluralsight.com)

## Key Contributors
- Bihame Sikubwabo Vainqueur
- Murhonyi Mutarushwa Arsène