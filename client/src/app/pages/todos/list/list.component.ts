import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  private router:Router = inject(Router);
 
  constructor() { }
  
  public addTodo() {
    this.router.navigate(['/todos/add']);
  }
}
