import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MongoUser } from '../models/mongo-user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  rootUri = 'https://shortened.daedal.pro/users/';

  constructor(private http: HttpClient) {}

  createUser(user: MongoUser) {
    return this.http.post(this.rootUri, user).toPromise();
  }

  getUserbyUsername(username: string, password: string) {
    return this.http.post(this.rootUri + 'auth', { username, password }).toPromise();
  }

  updateUserById(user: MongoUser, id: string) {
    return this.http.put(this.rootUri + id, user).toPromise();
  }

  deleteUserById(id: string) {
    return this.http.delete(this.rootUri + id).toPromise();
  }

  verifyIfUsernameIsAvailable(username: string) {
    return this.http.post(this.rootUri + 'checkUser', { username }).toPromise();
  }
}
