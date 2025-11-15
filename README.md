# Ioband App

The Ioband app allows you to learn the vibration patterns of the Ioband.

## Getting started

1. Download the project
2. Install the dependencies:

```sh
pnpm install
```

3. Start the server:

```sh
pnpm run dev
```

4. Start the HTTPS proxy (required since Bluetooth support on the browser is experimental):

```sh
npx local-ssl-proxy --source 3001 --target 3000
```

5. Open https://localhost:3001/ in the browser
