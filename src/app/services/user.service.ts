import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MongoUser } from '../models/mongo-user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  rootUri = 'http://localhost:3000/users/';

  constructor(private http: HttpClient) {}

  createUser(user: MongoUser) {
    return this.http.post(this.rootUri, user);
  }

  getUserByEmail(email: string, password: string) {
    return this.http.post(this.rootUri, { email, password });
  }

  updateUserById(user: MongoUser, id: string) {
    return this.http.put(this.rootUri + id, user);
  }

  deleteUserById(id: string) {
    return this.http.delete(this.rootUri + id);
  }

  verifyIfEmailIsAvailable(email: string) {
    return this.http.post(this.rootUri + 'checkEmail', { email });
  }
}
