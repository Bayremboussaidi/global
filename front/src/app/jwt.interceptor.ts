import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginService } from './services/login.service';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = inject(LoginService).getToken(); // Retrieve the token
    const authReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
 
  return next.handle(authReq);
  }

}

