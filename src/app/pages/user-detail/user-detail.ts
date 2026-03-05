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

currentId!: number;
maxId = 10; // depende da sua API

ngOnInit() {
  this.activateRoute.paramMap.subscribe(params => {

    const id = params.get('id');

    if (id) {
      this.currentId = +id;
      this.loadUser();
      this.cdr.detectChanges();
    }

  });
}

loadUser(){
  this.isLoading = true;
  this.errorMessage = '';

  this.userService.userById(this.currentId).subscribe({
    next: (user) => {
      this.user = user;
      this.isLoading = false;
      this.cdr.detectChanges();
    },
    error: () => {
      this.isLoading = false;
      this.errorMessage = "Oops! Can't find this user :/";
      this.cdr.detectChanges();
    }
  });
}


nextProfile() {
  if (this.currentId < this.maxId) {
    this.router.navigate(['/details', this.currentId + 1]);

}
}
previousProfile() {
  if (this.currentId > 1) {
    this.router.navigate(['/details', this.currentId - 1]);
}
}
}
