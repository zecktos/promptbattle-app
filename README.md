# Prompt Battle App

This is a little Sveltekit Application to support your local Prompt Battle event.

## Features:

- Webserver to serve different clients/screens
- Admin interface for the "battle master"
- Websockets for synchronised prompt submission (without the contestants having to click 'generate') and winner confetti 🎉
- Access to text-to-image APIs such as DALL-E and Stable Diffusion

## Set up

1. Install the dependencies via `npm install`
2. Configure your txt2img APIs! Create an `.env` File and add the necessary environment variables, e.g.
   - for DALL-E you would need to set OPENAI_API_KEY (given that you have an OpenAI Account) and possibly also your OPENAI_ORG_ID
   - for Stable Diffusion you would need to set SD_API_URL (given that you host your own SD API, more info how to do that below)

## (Optional) Hosting your own Stable Diffusion API with automatic111

We have included a Stable Diffusion API Client which expects as an API: automatic111's public GRADIO API. In order to run this API, install automatic111 on your favorite runtime (own server, Google Colab, etc.) and enable API access by launching it with a generous cors flag: `./webui.sh --share --cors-allow-origins=*`

## During the Prompt Battle event:

As a temporary workaround, we recommend running the app in (Vite's) _dev mode_ during the event, and sharing it with the network, so different clients (contestants, battle admin, etc.) can access the app.:

`npm run battle:dalle` starts the prompt battle with DALL-E as the image engine

`npm run battle:sd` starts the prompt battle with Stable Diffusion as the image engine

## Screens (aka Routes)

### /admin

This is the interface for the "Prompt Master", to trigger the submissions, winner confetti 🎉 and more!

### /player1

This is the interface for player 1

### /player2

This is the interface for player 2
