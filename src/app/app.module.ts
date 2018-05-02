import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BookComponent } from './components/book/book.component';

const ROUTES: Routes = [
  { path: 'books/:title', component: BookComponent },
  { path: 'books/:title/edit', component: BookEditComponent },
  { path: 'books', component: BookListComponent },
  { path: '', redirectTo: 'books', pathMatch: 'full' }
];
@NgModule({
  declarations: [AppComponent, BookComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
