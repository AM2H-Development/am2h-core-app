import { Component, OnInit } from '@angular/core';
import { ConnectorService } from '../connector.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private data:ConnectorService) { }

  ngOnInit(): void {
    this.data.connect();
    this.data.observe("+/config/#").subscribe( m => console.log(JSON.stringify(m)))

    //setInterval( ()=> this.data.publish("test/test","hallo"),1000)

    // setTimeout(()=> this.data.connect(), 5000);
  }

}
