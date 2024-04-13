import * as signalR from "@microsoft/signalr";
import { WeatherLocationList } from "./Redux/Thunks/WeatherLocationThunk";

const URL = process.env.REACT_APP_SIGNALR_HUB_URL as string;

class Connector {
  private connection: signalR.HubConnection;
  private static _instance: Connector;

  private constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(URL)
      .withAutomaticReconnect()
      .build();
    this.connection.start().catch((err) => console.error(err)); // Log error instead of document.write
  }

  public getHubConnection = () => {
    return this.connection;
  };

  public stopConnection = () => {
    if (this.connection.state === signalR.HubConnectionState.Connected) {
      this.connection
        .stop()
        .then(() => {
          console.log("SignalR disconnected");
        })
        .catch((err) => console.error(err));
    }
  };

  public startConnection = () => {
    if (this.connection.state === signalR.HubConnectionState.Disconnected) {
      this.connection.start().catch((err) => console.error(err));
    }
  };

  public static getInstance(): Connector {
    if (!Connector._instance) {
      Connector._instance = new Connector();
    }
    return Connector._instance;
  }
}

export default Connector;
