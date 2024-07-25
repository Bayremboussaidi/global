import { CanActivateFn } from '@angular/router';
import {  Router } from '@angular/router';
import { inject } from '@angular/core';


export const adminGuard: CanActivateFn = (route, state) => {

  if (route.data['role']== 'admin' )  
  return true;


  return inject(Router).createUrlTree(['/signin'])

};



