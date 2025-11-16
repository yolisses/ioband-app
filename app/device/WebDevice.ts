import { Device } from "./Device";

export class WebDevice implements Device {
  displayCharacter(character: string): void {
    console.log(character);
  }
}
