import { Component, OnInit } from '@angular/core';
import { ConnectorService } from '../connector.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  timestamp="123456789";
  constr:string="";

  constructor(private con: ConnectorService) { }

  ngOnInit(): void {
    this.constr=this.con.getName();
  }

}
