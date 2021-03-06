# Social-Network-API

This is a backend API of Social networking app. This is written in nodejs and express. I used mongoose, dotenv and moment package.

To use this app,

1. Run "npm install" command (If there is no node_modules file)
2. Use "npm start" to start the app

#Walkthrough Video
https://drive.google.com/file/d/1SOmGhJ8wt-vtfcGt7Dmq_hZ1_LyhdwEz/view?usp=sharing

#User Story
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data

#Acceptance Criteria
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
