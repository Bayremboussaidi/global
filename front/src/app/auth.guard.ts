import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (route.data['role']== 'admin' )  
  return true;

  return inject(Router).createUrlTree(['/signin'])

};
