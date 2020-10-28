# Jovo Web Starter: Standalone

Fully customizable open source embedded voice bot widget, voice enabling your web app or website.

This repository contains:
* `app`: Backend logic built with the [Jovo Framework](https://github.com/jovotech/jovo-framework) using its [Web Platform integration](https://github.com/jovotech/jovo-framework/tree/master/jovo-platforms/jovo-platform-web).
* `client`: Frontend built with [Vue.js](https://vuejs.org/) and [Tailwind CSS](https://tailwindcss.com/), communicating with the backend using the [Jovo Web Client for Vue.js](https://github.com/jovotech/jovo-framework/tree/master/jovo-clients/jovo-client-web-vue).

![Jovo Web Client to App](img/jovo-web-client-to-app.png)

> Note: For demo purposes and the ease of getting started quickly, the template uses the [Web Speech API](https://wicg.github.io/speech-api/) as an ASR, which only works on Google Chrome. To use the Web integration on other browsers, you can integrate one of our integrations of several [cloud ASRs](https://www.jovo.tech/marketplace/tag/asr).

## Getting started

1. Run `npm install`. This will install the dependencies in both `app` and `client`

2. Go into the `client` directory and run `npm run serve` to start the frontend

3. Go into the `app` directory and run `jovo run` to start the backend

4. Open the starter in your browser `localhost:8080`

## Customization

> For a more detailed explanation and walk-through check out our in-depth [tutorial](TODO: link to tutorial)

The starter was built for you to have a working example as well as an entry point to get started with the Jovo Web integration immediately. Because of that, we've tried to keep the starters as small as possible. The following documentation will help you understand how the starter is structured and which components take care of which tasks.

### Client

The client is a Vue.js project that consists of a single component "RecordButton" which is styled in Tailwind CSS.

#### Component: RecordButton

The RecordButton component handles the registration for multiple event listeners, namely `ClientEvent.Request`, `ClientEvent.Response`, and `ClientEvent.Action`.

TODO: add links to docs and more info
* `ClientEvent.Request`: triggered before the request is sent out to the Jovo app. In this case, it is used to display the user's speech next to the microphone button.
* `ClientEvent.Response`: triggered when the client receives the Jovo app's response. In this case, it is used to display the app's response.
* `ClientEvent.Action`: triggered when the app's response contains an action. In our case we expect a `set-theme` action notifying us to switch the theme to either dark or light.

Besides that, it implements the logic to switch from dark to light mode as a demo feature, which makes use of [Tailwind's custom variants](https://tailwindcss.com/docs/pseudo-class-variants#creating-custom-variants)

### App

The Jovo app the new [Jovo Web Platform integration](TODO: link) as well as [NLP.js](https://www.jovo.tech/marketplace/jovo-nlu-nlpjs) as its NLU.

#### Language Model

The language model consists of a single intent, `SwitchThemeIntent`, used to change the theme of the website to either dark or light mode.

#### app.ts

The `app.ts` file contains the initialization of the app and its plugins as well as the basic logic for the `SwitchThemeIntent`. It makes use of the Web integrations [`Custom Actions`](TODO: link to docs) to send a `set-theme` action containing the user's input (either `dark` or `light`). The action will trigger the `ClientEvent.Action` listener we've mentioned earlier.