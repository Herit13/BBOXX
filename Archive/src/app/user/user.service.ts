import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  fetchUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users')
  }

  createUser(user: User) {
    return this.http.post('https://jsonplaceholder.typicode.com/users', user);
  }

  deleteUser(id: string) {
    return this.http.delete('https://jsonplaceholder.typicode.com/users/' + id)
  }
}
