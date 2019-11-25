import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { FormBuilder, Validators } from "@angular/forms";

import { UserService } from "./user.service";

export interface User {
  id?: string;
  name?: string;
  username: string;
  email?: string;
}

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = ["id", "username", "name", "email", "delete"];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  userForm = this.fb.group({
    username: ["", Validators.required],
    name: [""],
    email: ["", Validators.email]
  });

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.userService.fetchUsers().subscribe((users: User[]) => {
      this.dataSource.data = users;
      this.dataSource.paginator = this.paginator;
    });
  }

  get email() {
    return this.userForm.get("email");
  }

  get username() {
    return this.userForm.get("username");
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        user => user.id !== id
      );
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSubmit() {
    const data = this.userForm.value;
    this.userService.createUser(data).subscribe((newUser: User) => {
      this.dataSource.data = [...this.dataSource.data, newUser];
      this.userForm.reset();
    });
  }
}
