# Prompt Battle App

This is a little Sveltekit Application to support your local Prompt Battle event.

## What is a Prompt Battle?
It is a playful event where contestants compete against each other using text-to-image technology and predefined challenges.
The event format was developed in 2022 by Florian A. Schmidt & Sebastian Schmieg together with a team of students of HTW Dresden: Bernadette Geiger, Ella Zickerick, Emily Krause, Levi Stein, Lina Schwarzenberg, Robert Hellwig.
Since then, the Prompt Battle format has been remixed and further developed in several places, e.g. at the AI+D Lab at Hochschule für Gestaltung Schwäbisch Gmünd!

## Features:

- Webserver to serve different clients/screens
- Admin interface for the "battle master"
- Websockets for synchronised prompt submission (without the contestants having to click 'generate') and winner confetti 🎉
- Access to text-to-image APIs such as DALL-E and Stable Diffusion

## Set up

1. Install the dependencies via `npm install`
2. Configure your txt2img APIs! Create an `.env` File and add the necessary environment variables, e.g.
   - for DALL-E you would need to set OPENAI_API_KEY (given that you have an OpenAI Account) and possibly also your OPENAI_ORG_ID. You can generate your DALL-E API key here: https://platform.openai.com/account/api-keys
   - for Stable Diffusion you would need to set SD_API_URL (given that you host your own SD API, more info how to do that below)

## (Optional) Hosting your own Stable Diffusion API with automatic111

We have included a Stable Diffusion API Client which expects as an API: automatic111's public GRADIO API. In order to run this API, install automatic111 on your favorite runtime (own server, Google Colab, etc.) and enable API access by launching it with a generous cors flag: `./webui.sh --share --cors-allow-origins=*`

## During the Prompt Battle event:

As a temporary workaround, we recommend running the app in (Vite's) _dev mode_ during the event, and sharing it with the network, so different clients (contestants, battle admin, etc.) can access the app.:

`npm run battle:dalle` starts the prompt battle with DALL-E as the image engine

`npm run battle:sd` starts the prompt battle with Stable Diffusion as the image engine

## Running on windows

Windows has a different ways of setting environment variables
You need to modify package.json:
`"battle:dalle": "set VITE_IMAGE_ENGINE=dalle& vite dev --host"`
and:
`"battle:sd": "set VITE_IMAGE_ENGINE=sd& vite dev --host"`
Note the "set" before the environment variable name, and the "&" right after the value (without whitespace)!

## Screens (aka Routes)

### /admin

This is the interface for the "Prompt Master", to trigger "Generate!", launch the winner confetti 🎉 and more!

### /player1

This is the interface for player 1

### /player2

This is the interface for player 2

### /audience1

This is the screen that mirrors what player 1 is doing

### /audience2

This is the screen that mirrors what player 2 is doing
