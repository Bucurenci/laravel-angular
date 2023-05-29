import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss']
})
export class SecureComponent {

  user: Object | undefined;

  constructor(private http: HttpClient, private router: Router) {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get('http://localhost:8000/user', {headers: headers}).subscribe(
      (result: any) => {
        this.user = result
      },
      error => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    );
  }
}
