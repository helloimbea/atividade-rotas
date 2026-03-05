import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user';
import { User } from '../../models/user';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [ RouterLink,],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css',
})
export class UserDetail implements OnInit{

    constructor(
    private activateRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef,

){}

user!: User;
isLoading = true;
errorMessage: string = '';

ngOnInit() {
  const id = this.activateRoute.snapshot.paramMap.get('id');

  if (id) {
    this.userService.userById((+id)).subscribe({
      next: (user) => {
        this.user = user;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
       error: (err) => {
        this.isLoading = false;
        this.errorMessage = "Oops! Can't find this user :/";
        this.cdr.detectChanges();
       }
    });

  }
}
}
