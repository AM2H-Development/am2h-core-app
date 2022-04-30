import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataProvider } from 'src/interfaces/dataprovider';
import { MqttProviderService } from './mqtt-provider.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService {
  private dataProvider : DataProvider
  private serverConfig = {hostname:"server-mh.fritz.box","port":9001}

  constructor() {
    let dataService;
    if (true){
      dataService = MqttProviderService 
    }

    this.dataProvider= new dataService();
   }

  isConnected(): boolean {
    return this.dataProvider.isConnected();
  }

  connect(): void {
    console.log(`connect`);
    this.dataProvider.connect(this.serverConfig);
  }

  observe(filter: string): Observable<IMessage> {
    return this.dataProvider.observe(filter);
  }

  publish(topic: string, message: string, retained:boolean=false): boolean {
    return this.dataProvider.publish(topic,message,retained);
  }

  connectionStatus(): Observable<boolean>{
    return this.dataProvider.connectionStatus()
  }

  getName(): string{return "connector"}
}

export interface IMessage{
  topic:string;
  message:string;
  retained?:boolean;
}