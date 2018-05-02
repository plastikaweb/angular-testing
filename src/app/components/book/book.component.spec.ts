import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as faker from 'faker';

import { BookModel } from '../../models/book/book.model';
import { BookComponent } from './book.component';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let book: BookModel;
  let nativeEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    book = new BookModel(
      faker.image.image(),
      faker.lorem.words(),
      faker.lorem.paragraph(),
      1235.35,
      0
    );
    component.book = book;
    nativeEl = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the book image', () => {
    const imgSrc = nativeEl.querySelector('.book-image').getAttribute('src');
    expect(imgSrc).toEqual(book.image);
  });

  it('should show the book title', () => {
    const title = nativeEl.querySelector('.book-title').innerHTML;
    expect(title).toEqual(book.title);
  });

  it('should show the book description', () => {
    const description = nativeEl.querySelector('.book-description').innerHTML;
    expect(description).toEqual(book.description);
  });

  it('should show the book price', () => {
    const price = nativeEl.querySelector('.book-price').innerHTML;
    expect(price).toEqual('€1,235.35');
  });

  it('should show the book upVotes', () => {
    const upVotes = component.votesCounter();
    expect(upVotes).toEqual(0);
  });

  it('should invoke upVote method', () => {
    const spy = spyOn(component, 'upVote');
    const button = nativeEl.querySelector('.upvote');
    // button.click();
    button.dispatchEvent(new Event('click'));
    expect(spy).toHaveBeenCalled();
  });

  it('should emit addToCart event', (done) => {
    component.addToCart.subscribe(e => {
      expect(e).toEqual(component.book);
      done();
    });
    component.sendToCart();
  });

  it('should call to a function sendToCart when clicked', () => {
    const spy = spyOn(component, 'sendToCart');
    const button = nativeEl.querySelector('.send-to-cart');
    button.dispatchEvent(new Event('click'));
    expect(spy).toHaveBeenCalled();
  });
});
