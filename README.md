_NOTE_ This is simply modified from the tutorial at the clone link below. Though I have made some slight edits such as adding increased functionality, Much of the code was already there, I simply expanded or tweaked it to fit my needs as a refresher on Express.

I removed the XMP to JSON converter since I did not need it for my use case, slightly modified the search route and added the discover route.

# Good Relay

A simple example node backend that demonstrates how to hit a 3rd party API without exposing your API key in your frontend code.

## Usage

### Prerequisites

You need nodejs installed: https://nodejs.org/en/download/

### Initialize the App

To get started git clone this repo (choose one depending on whether you prefer https or ssh - pick the first one if you're not sure):

`git clone https://github.com/JacksonBates/example-goodreads-api-relay.git`

or

`git clone git@github.com:JacksonBates/example-goodreads-api-relay.git`

Then cd into the new directory:

`cd example-goodreads-api-relay`

Now install dependancies:

`npm i`

You need to create your own `.env` file for your key:

`cp .env.example .env`

Get your goodreads api keys from [Goodreads api](https://www.goodreads.com/api/keys)
Then open the new `.env` file and paste your keys in the correct spot.

Example:

```
GOODREADS_API_KEY=AABBCCDDEEFF00112233445566778899
```

Now run the server:

`node app.js`

In the browser, navigate to localhost:3000 to confirm the server is running. You should see a simple `Hello World!`

## What next?

Now read the `app.js` file thoroughly.

I've commented the code heavily to help you understand what is going on if you haven't seen node / express much before.

## Test the API relay

Use [Postman](https://www.getpostman.com/) to test the API.

Set Postman to send a Get request and paste this in the url: `localhost:3000/api/search?q=enders game`

Postman will show you the JSON response below.

## How do you use this in your front end?
