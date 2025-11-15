"use client";

import { useState } from "react";

export function Home() {
  const serviceId = "12345678-1234-1234-1234-1234567890ab";
  const characteristicId = "abcdefab-1234-5678-1234-abcdefabcdef";
  const [text, setText] = useState<string>();
  async function handleClick() {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ name: "ESP32-WebBLE" }],
        optionalServices: [serviceId],
      });

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(serviceId);
      const characteristic = await service.getCharacteristic(characteristicId);

      // Read value from ESP32
      const value = await characteristic.readValue();
      const text = new TextDecoder().decode(value);
      setText("Received: " + text);

      // Example: write to ESP32
      await characteristic.writeValue(new TextEncoder().encode("Hello ESP32!"));
    } catch (error) {
      console.error(error);
      setText(error);
    }
  }

  return (
    <div>
      <button id="connect" onClick={handleClick}>
        Connect to ESP32
      </button>
      <p id="output">{text}</p>
    </div>
  );
}
