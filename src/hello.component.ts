import { Component } from 'angular2/core';
import { HelloService } from './hello.service';

@Component({
  selector: 'my-hello-component',
  template: `<h1> Rest service call example - We have a message! </h1>			 
			<p> title: {{ message.title }} </p>	
			<p> body: {{ message.body }} </p>
			<button type="button" class="btn btn-info btn-sm" (click)="loadMessage()">
				Get a new message!
			</button>	
			`,
  providers: [HelloService]
})
export class HelloComponent { 

	constructor(private _helloService: HelloService) {		
		console.log('Hello..HelloComponent was created! .. HelloService was injected: ' + _helloService);
	}
	
	message:string = {userId: 1,id: 1, title: "default value", body: "Hello World!"};
	
	
	loadMessage() {
		this._helloService.getMessage()
						.subscribe(
								data => this.message = data,
								error =>  console.error("Service call error: " + error),
								() => console.log("Service ..helloService.getMessage.. has finished!")
						);
	}
}
