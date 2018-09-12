# Fegbar Front End
Fegbar is a seasonal fruit & vegetable guide and nutrition calculator. In season fruit & vegetables, or 'Feg', are displayed indiviually or in a grid format for users to explore. Feg that are coming in to season soon are displayed in a grid format at the bottom of the homepage. Via the API in season Feg can be added to a basket it, where, each Feg's nutritional information is calculated from data fetched from an external API. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Node.js >=v8.9.3 
download Node by following the installtion steps on their website (https://nodejs.org/en/)

### Installing

# Npm install
`cd` into the project folder and in the command line run `$npm install` or `$npm i`

# Nutritionix API
Create a Nutritionix account (https://developer.nutritionix.com/signup) to access your own API Keys. In the project folder create a .env file with the following code:

`
REACT_APP_NUTRITION_ID = Nutrition_ID
REACT_APP_NUTRITION_KEY = Nutrition_Key
REACT_APP_NUTRITION_USER = Nutrition_User
`
Where Nutrition_ID, Nutrition_Key & Nutrition_User are your own id, key and usernames.

# Npm start
To start the development env running locally `cd` in to the project folder and run in the command line `$npm start`

## Deployment
#Create the Heroku app
In the command line type `heroku create $APP_NAME --buildpack` https://github.com/mars/create-react-app-buildpack.git
Replace '$APP_NAME' with the name for your unique app.

#Commit and Deploy
Stage the code to be commited (`$git add .`)
Commit the code with a relevant message (`$git -m 'Inital Deployment'`)
Push the code to the Heroku master branch (`$git push heroku master`)

#Vist the public site Url in your browser
In the command line run  `$heroku open` 
