import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../layout/footer/footer.component";
import { HeaderComponent } from '../../layout/header/header.component';

@Component({
  selector: 'app-todos',
  imports: [RouterOutlet, CommonModule, FooterComponent, HeaderComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent {

}
