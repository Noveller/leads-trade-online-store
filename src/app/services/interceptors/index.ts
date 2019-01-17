import {EndpointInterceptorService} from './endpoint-interceptor.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

export const interceptors = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: EndpointInterceptorService,
    multi: true
  },
];

export * from './endpoint-interceptor.service';
