import { Injectable } from '@angular/core';
import { map, Observable, Subject, Subscriber } from 'rxjs';
import { DataProvider } from 'src/interfaces/dataprovider';
import { IMqttMessage, MqttModule, IMqttServiceOptions, MqttService} from 'ngx-mqtt';
import { IMessage } from './connector.service';

export class MqttProviderService implements DataProvider{
  private mqttService: MqttService|undefined;
  private connection:Subject<boolean> = new Subject<boolean>();
  private connected=false;

  constructor() { }

  isConnected(): boolean {
    return this.connected
  }

  connectionStatus(): Observable<boolean>{
    return this.connection
  }

  connect(params: any): void {
    let options: IMqttServiceOptions = {
      hostname: params["hostname"],
      port: params["port"],
      path: '/'
    }
    this.mqttService?.disconnect()
    this.connection.next(false)
    this.mqttService= new MqttService(options);
    this.mqttService.onConnect.subscribe( () => {
      this.connected=true
      this.connection.next(true)
    })
  }

  observe(filter: string): Observable<IMessage> {
    if (this.mqttService) {
        return this.mqttService.observe(filter).pipe(map(m => {return {topic:m.topic,message:m.payload.toString(),retained:m.retain}}))
    }
    throw new Error('Need to connect first.');
  }

  publish(topic: string, message: string, retained:boolean=false): boolean {
    if (this.mqttService) {
      this.mqttService.unsafePublish(topic,message,{qos: 1, retain: retained})
      return true;
    }
    throw new Error('Need to connect first.');
  }

}
