import { Injectable } from '@angular/core';
import { map, Observable, Subscriber } from 'rxjs';
import { DataProvider } from 'src/interfaces/dataprovider';
import { IMqttMessage, MqttModule, IMqttServiceOptions, MqttService} from 'ngx-mqtt';
import { IMessage } from './connector.service';

export class MqttProviderService implements DataProvider{
  private mqttService: MqttService|undefined;

  constructor() { }

  isConnected(): boolean {
    return !(this.mqttService===undefined)
  }

  connect(params: any): void {
    let options: IMqttServiceOptions = {
      hostname: params["hostname"],
      port: params["port"],
      path: '/'
    }
    if (!this.mqttService===undefined) { this.mqttService?.disconnect() }
    this.mqttService= new MqttService(options);
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
