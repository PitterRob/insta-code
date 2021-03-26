import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcessoComponent } from './pages/acesso/acesso.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  { path: '', component: AcessoComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
