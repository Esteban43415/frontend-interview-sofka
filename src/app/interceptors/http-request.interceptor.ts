import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, from, lastValueFrom, map } from 'rxjs';
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  tokenAuth: string = '';

  constructor(
  ) { }

  /**
   * @description
   * Intercepts an HTTP request
   * @param {HttpRequest} req HttpRequest
   * @param {HttpHandler} next HttpHandler
   * @returns {HttpResponse}
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.handle(req, next));
  }


  async handle(req: HttpRequest<any>, next: HttpHandler) {


    // const authReq = req.clone({
    //   setHeaders: {
    //     Authorization: this.tokenAuth,
    //   },
    // });

    return lastValueFrom(next.handle(req)
      .pipe(
        map((event: HttpEvent<any>) => {

          if (event instanceof HttpResponse) {
            if (!event.url?.includes('.svg')) {
              console.groupCollapsed('%c%s:', 'background: #28B463; color: #1C2833', (event.body.message ?? event.url?.split('/').at(-1)));
              console.log('%c Request: %s', 'background: #28B463; color: #1C2833', event.url, 'Response: ', event.body.data);
              console.groupEnd();
            }
          }

          return event;
        })
      ))
  }

}
