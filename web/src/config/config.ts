import axios from 'axios'

class Config {
  // private environment: Promise<string>
  private urls: { [key: string]: string }
  
  constructor(public environment: Promise<string>) {
    this.urls = {
      ngrok: "http://emortal-api.ngrok.io", // needed for running against a local API on a device
      development: "https://emortal-api.rocketmakers.net",
      testing: "https://testing-api.emortal.com",
      production: "https://api.emortal.com",
    }
  }

  async appUrl(path?: string) {
    const env = await this.environment
    const uri = this.urls[env];

    return path == null ? uri : uri + path
  }

  async isDevelopment() {
    const env = await this.environment
    return env === "ngrok" || env === "development";
  }
}

const env = axios('/environment.txt').then(response => response.data.trim()) as Promise<string>

export const config = new Config(env);
