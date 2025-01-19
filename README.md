# learn-cicd-typescript-starter (Notely)

This repo contains the typescript starter code for the "Notely" application for the "Learn CICD" course on [Boot.dev](https://boot.dev).

![Test Badge](https://github.com/zpz5HAU-tgc3fgw2xwr/bootdotdev_learn-cicd-typescript/actions/workflows/ci.yml/badge.svg)

## Local Development

Make sure you're on Node version 18+.

Create a `.env` file in the root of the project with the following contents:

```bash
PORT="8080"
```

Run the server:

```bash
npm install
npm run dev
```

_This starts the server in non-database mode._ It will serve a simple webpage at `http://localhost:8080`.

You do _not_ need to set up a database or any interactivity on the webpage yet. Instructions for that will come later in the course!

zpz5HAU-tgc3fgw2xwr's version of Boot.dev's Notely app