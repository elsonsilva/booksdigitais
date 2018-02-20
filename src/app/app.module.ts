import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';


// ANGULAR MATERIAL
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
        MatToolbarModule,
        MatListModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule
} from '@angular/material';

// ANGULAR GESTURES
import 'hammerjs';

// LOCAL STORAGE
import { AsyncLocalStorageModule } from 'angular-async-local-storage';

// COMPONENTS
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListaComponent } from './lista/lista.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { FavoritosComponent } from './favoritos/favoritos.component';

// SERVICES
import { LocalStorage } from './utils/local-storage.service';
import { Api } from './utils/api.service';
import { Utils } from './utils/utils.service';

// PIPES
import { HighlightPipe } from './utils/highlight.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListaComponent,
    DetalhesComponent,
    FavoritosComponent,
    HighlightPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule
  ],
  providers: [
    LocalStorage,
    Api,
    Utils
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
