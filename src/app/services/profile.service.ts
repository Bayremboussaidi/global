import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  setProfilePic(result: string | ArrayBuffer) {
    throw new Error('Method not implemented.');
  }
  private profilePicSource = new BehaviorSubject<string | ArrayBuffer | null>(null);
  profilePic$ = this.profilePicSource.asObservable();

  updateProfilePic(url: string | ArrayBuffer | null): void {
    this.profilePicSource.next(url);
  }
}
