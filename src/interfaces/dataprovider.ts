import { Observable } from "rxjs";
import { IMessage } from "src/app/connector.service";

export abstract class DataProvider {
    abstract isConnected():boolean
    abstract connect(params:any):void
    abstract observe(filter:string):Observable<IMessage>
    abstract publish(topic:string, message:string, retained:boolean):boolean
}
