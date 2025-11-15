"use client";

import { useState } from "react";

export function Home() {
  const serviceId = "12345678-1234-1234-1234-1234567890ab";
  const characteristicId = "abcdefab-1234-5678-1234-abcdefabcdef";
  const pinCharacteristicId = "12345678-abcd-efab-cdef-1234567890ab";
  const [text, setText] = useState<string>();
  const [pinState, setPinState] = useState<boolean>(false);
  const [characteristic, setCharacteristic] =
    useState<BluetoothRemoteGATTCharacteristic | null>(null);

  async function handleConnect() {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ name: "ESP32-WebBLE" }],
        optionalServices: [serviceId],
      });

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(serviceId);
      const char1 = await service.getCharacteristic(characteristicId);

      // Read value from ESP32
      const value = await char1.readValue();
      const text = new TextDecoder().decode(value);
      setText("Received: " + text);

      // Get pin characteristic for later use
      const pinChar = await service.getCharacteristic(pinCharacteristicId);
      setCharacteristic(pinChar);
    } catch (error) {
      console.error(error);
      setText(String(error));
    }
  }

  async function togglePin() {
    if (characteristic === null) {
      setText("Not connected. Please connect first.");
      return;
    }
    try {
      const newState = !pinState;
      const value = newState ? "1" : "0";
      await characteristic.writeValue(new TextEncoder().encode(value));
      setPinState(newState);
      setText(`Pin 7 turned ${newState ? "ON" : "OFF"}`);
    } catch (error) {
      console.error(error);
      setText(String(error));
    }
  }

  async function pinOn() {
    if (characteristic === null) {
      setText("Not connected. Please connect first.");
      return;
    }
    try {
      await characteristic.writeValue(new TextEncoder().encode("1"));
      setPinState(true);
      setText("Pin 7 turned ON");
    } catch (error) {
      console.error(error);
      setText(String(error));
    }
  }

  async function pinOff() {
    if (characteristic === null) {
      setText("Not connected. Please connect first.");
      return;
    }
    try {
      await characteristic.writeValue(new TextEncoder().encode("0"));
      setPinState(false);
      setText("Pin 7 turned OFF");
    } catch (error) {
      console.error(error);
      setText(String(error));
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button onClick={handleConnect}>Connect to ESP32</button>
      <div className="flex gap-2">
        <button onClick={togglePin}>Toggle Pin 7</button>
        <button onClick={pinOn}>Pin 7 ON</button>
        <button onClick={pinOff}>Pin 7 OFF</button>
      </div>
      <p>{text}</p>
      <p>Pin 7 Status: {pinState ? "ON" : "OFF"}</p>
    </div>
  );
}
