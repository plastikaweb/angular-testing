import { Component } from '@angular/core';
import { BookModel } from './models/book/book.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  cart: BookModel[] = [];
  book: BookModel = new BookModel(
    'http://lorempixel.com/640/480/city',
    'modi quae corporis',
    'Aut ipsam dignissimos aut.',
    602,
    63265
  );

  addToCart(book: BookModel) {
    this.cart.push(book);
  }
}
