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

  ngOnInit() {
    const id = this.activateRoute.snapshot.paramMap.get('id')
    if(id){
    this.userService.userById(parseInt(id)).subscribe((user) => {
      this.user = user;
      this.isLoading = false
      this.cdr.detectChanges();
    });
    }

  }
}
