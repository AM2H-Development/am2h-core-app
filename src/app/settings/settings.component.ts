import { Component, OnInit } from '@angular/core';
import { connected } from 'process';
import { ConnectorService } from '../connector.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  connected=false;

  constructor(private data:ConnectorService) { }

  ngOnInit(): void {
    this.data.connectionStatus().subscribe(s => {
      console.log("status is " + s)
      this.connected=s
    })
    this.data.connect();
    this.data.observe("+/config/#").subscribe( m => console.log(JSON.stringify(m)))

    /*
    const {InfluxDB} = require('@influxdata/influxdb-client')
    // You can generate an API token from the "API Tokens Tab" in the UI
    const token = 'udIsL3x--59zS1_dAcNquRWc-o-RsMRtB1xWeDBNvSWDBJdt4HVnk1tqs4KjVdi8HbT0Y1CWWy7QYjlS5FOzzQ=='
    const org = 'am2h'
    const bucket = 'mh'

    const client = new InfluxDB({url: 'https://influx.qxf.de', token: token})

     */   
    //setInterval( ()=> this.data.publish("test/test","hallo"),1000)

    // setTimeout(()=> this.data.connect(), 5000);
  }

}


