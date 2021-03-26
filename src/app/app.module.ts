import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AcessoComponent } from './pages/acesso/acesso.component';
import { LoginComponent } from './pages/acesso/login/login.component';
import { BannerComponent } from './pages/acesso/banner/banner.component';
import { CadastroComponent } from './pages/acesso/cadastro/cadastro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './pages/acesso/auth.service';
import { HomeComponent } from './pages/home/home.component';
import { PublicacoesComponent } from './pages/home/publicacoes/publicacoes.component';
import { AppRoutingModule } from './app-routes.module';
import { AuthGuardService } from './services/auth-guard.service';
import { AddPublicacoesComponent } from './pages/home/add-publicacoes/add-publicacoes.component';
import { BdService } from './services/bd.service';
import { ProgressoService } from './services/progresso.service';


@NgModule({
  declarations: [
    AppComponent,
    AcessoComponent,
    LoginComponent,
    BannerComponent,
    CadastroComponent,
    HomeComponent,
    PublicacoesComponent,
    AddPublicacoesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [AuthService, AuthGuardService, ProgressoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
