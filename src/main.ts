import {bootstrap} from 'angular2/platform/browser';
import {HelloComponent} from './hello.component';
import {HTTP_PROVIDERS} from 'angular2/http';


bootstrap(HelloComponent, [HTTP_PROVIDERS]);
