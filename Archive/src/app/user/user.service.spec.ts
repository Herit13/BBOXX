import { TestBed } from "@angular/core/testing";

import { UserService } from "./user.service";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";

export const fakeUsers = [
  { id: 1, username: "john", name: "john doe", email: "john@mail.com" }
];

describe("UserService", () => {
  let userService: UserService;
  let httpSpy = jasmine.createSpyObj("HttpClient", ["get", "delete", "post"]);

  beforeEach(() => {
    userService = new UserService(httpSpy);
  });

  it("should be created", () => {
    expect(userService).toBeTruthy();
  });

  it("fetch users", () => {
    httpSpy.get.and.returnValue(of(fakeUsers));

    userService.fetchUsers().subscribe(users => {
      expect(users).toBe(fakeUsers)
    })
  });

  it("create a user", () => {
    const newUser = {
      id: "3",
      username: 'jane'
    }

    httpSpy.post.and.returnValue(of(newUser));

    userService.createUser(newUser).subscribe(user => {
      expect(user).toBe(newUser)
    })
  });

  it("delete a user", () => {
    httpSpy.delete.and.returnValue(of(fakeUsers[0]));

    userService.deleteUser("1").subscribe(user => {
      expect(user).toBe(fakeUsers[0])
    })
  });
});
