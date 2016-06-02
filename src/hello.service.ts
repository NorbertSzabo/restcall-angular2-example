import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {URLSearchParams} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HelloService {

	REST_SERVICE_URL:string = 'http://jsonplaceholder.typicode.com/posts/1'

	constructor(private _http: Http) {
		console.log('..HelloService is created! .. Http was injected: ' + _http);
	}
	
	getMessage() {
		return this._http.get(this.REST_SERVICE_URL).map(res => res.json());
	}
	
}