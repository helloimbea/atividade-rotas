import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user';
import { User } from '../../models/user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-list',
  imports: [ RouterLink, ],
  templateUrl: './users-list.html',
  styleUrl: './users-list.css',
})
export class UsersList implements OnInit {
    @Input() id!: number;


  users: User[] = [];

  constructor(private userService: UserService, private cdr:ChangeDetectorRef) {}
isLoading = true
  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.isLoading = false
      this.cdr.detectChanges();
    });
  }
}
