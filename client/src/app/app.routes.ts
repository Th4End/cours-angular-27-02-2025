import { RouterOutlet, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { TodosComponent } from './pages/todos/todos.component';
import { AddComponent } from './pages/todos/add/add.component';
import { ListComponent } from './pages/todos/list/list.component';

export const routes: Routes = [
    {
       path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'register',
        component: RegisterComponent,
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full'
    },
    {
        path: 'todos',
        component: TodosComponent,
        children: [
            {path: '', redirectTo: 'list', pathMatch: 'full'},
            {path: 'list', component: ListComponent},
            {path: 'add', component: AddComponent}
        ]
    }
];
