# Matcher project work

CT30A3204 Advanced Web Applications Project

## Instructions for running the program

Clone the repository and navigate to the project directory
```
git clone https://github.com/suvikristiin/matcher.git
```

Create .env file in the root folder of the project and add SECRET as SECRET=<secret key>

Then install the required dependencies by running:
```
npm run setup
```

Now you can run the program in development mode:
```
npm run dev
```

You can also run the program in development mode by adding NODE_ENV=production to the .env file and running the commands:

```
npm run build
npm run dev
```

Application running on port 3000 and server running on port 8080

## Technologies

### Client
- React
- Material UI

### Server
- node.js
- Express.js
- passport.js
  - Used to generate a JWT token for authentication
- bcrypt
  - Used to hash and verify passwords
- Mongoose
  - MongoDB database used to store data
  

## Program structure and functionalities

Authentication is done with the Json Web Tokens service. A token is created for the user upon logging in and is deleted when he logs out. The identifier is sent along with the data in every backend request to identify the user.

The application constantly checks whether the user is logged in. If the token has expired or the user is not logged in, they will be redirected back to the login page.

- The application opens to the login page, where the user can log in or navigate to the registration page
- After logging in, the user is directed to the main page of the application, where the user can either like or dislike users
  - By pressing the black or red heart the user dislikes or likes the user, after which the user is shown a new user for evaluation
- When both users like each other, they get a match and can start chatting
- The user can navigate to different pages from drop-down menu
- By pressing "edit your information" from drop-down menu, the user can navigate to their profile to edit their own information
- By pressing "Chat" from drop-down menu, the user can navigate to the chat page to chat with the users with whom he has received a "match"

## Others

Point suggestions can be found in the file: [points.pdf](points.pdf)
