import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  handleLogout() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }

}
