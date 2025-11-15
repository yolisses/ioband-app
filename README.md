# Ioband App

The Ioband app allows you to learn the vibration patterns of the Ioband.

Due to the experimental status of the Bluetooth features in the browser, only Chrome is supported. Possibly other Chromium based browsers can work too, but it is not grated. Brave, for instance, completely disables Bluetooth features.

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

5. Open [https://localhost:3001/](https://localhost:3001/) in the browser

6. Enable Experimental Web Platform features: [chrome://flags/#enable-experimental-web-platform-features](chrome://flags/#enable-experimental-web-platform-features)
