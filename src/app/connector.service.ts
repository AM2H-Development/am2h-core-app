import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataProvider } from 'src/interfaces/dataprovider';
import { MqttProviderService } from './mqtt-provider.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService {
  private dataProvider : DataProvider
  private mqttCredentials = {hostname:"server-mh.fritz.box","port":9001}
  private providerService = MqttProviderService 

  constructor() {
    this.dataProvider= new this.providerService();
   }

  isConnected(): boolean {
    return this.dataProvider.isConnected();
  }

  connect(): void {
    console.log(`connect`);
    this.dataProvider.connect(this.mqttCredentials);
  }

  observe(filter: string): Observable<IMessage> {
    return this.dataProvider.observe(filter);
  }

  publish(topic: string, message: string, retained:boolean=false): boolean {
    return this.dataProvider.publish(topic,message,retained);
  }

  getName(): string{return "connector"}
}

export interface IMessage{
  topic:string;
  message:string;
  retained?:boolean;
}