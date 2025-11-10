import * as signalR from '@microsoft/signalr';

const API_URL = 'https://api.sufrah.sa/notification'; // Your SignalR API URL


class SignalRService {
  private hubConnection!: signalR.HubConnection;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor, @typescript-eslint/no-empty-function
  constructor() {}

  startConnection(token: string) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(API_URL, {
        accessTokenFactory: () => token, // Pass JWT Token
        skipNegotiation: true, // WebSocket optimization
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect() // Auto-reconnect on failure
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then()
      .catch((err) => console.error('❌ SignalR Connection Error:', err));
  }

  // Listen for notifications
  listenForNotifications(callback: (data: any) => void) {
    this.hubConnection.on('ReceiveNotification', (data) => {
      callback(data); // Pass data to the React component
    });
  }

  // Stop connection when component unmounts
  stopConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }
}

// Export an instance
export const signalRService = new SignalRService();
