import { Book, BookModel } from './book.model';
import * as faker from 'faker';

describe('Book Model', () => {
  let image: string;
  let title: string;
  let description: string;
  let price: number;
  let upVotes: number;

  beforeEach(() => {
    image = faker.image.image();
    title = faker.lorem.words();
    description = faker.lorem.sentence();
    price = faker.commerce.price();
    upVotes = faker.random.number();
    this.book = new BookModel(image, title, description, price, upVotes);

    let storage = {};

    spyOn(window.localStorage, 'getItem').and.callFake(
      (key: string): string => {
        return storage[key] || null;
      }
    );

    spyOn(window.localStorage, 'removeItem').and.callFake(
      (key: string): void => {
        delete storage[key];
      }
    );

    spyOn(window.localStorage, 'setItem').and.callFake(
      (key: string, value: string): string => {
        return (storage[key] = <string>value);
      }
    );

    spyOn(window.localStorage, 'clear').and.callFake((): void => {
      storage = {};
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('has localstorage working', () => {
    expect(localStorage.setItem('key', 'value')).toBe('value');
    expect(localStorage.getItem('key')).toBe('value');
  });

  it('has a valid model', () => {
    expect(this.book.image).toEqual(image);
    expect(this.book.title).toEqual(title);
    expect(this.book.description).toEqual(description);
    expect(this.book.price).toEqual(price);
    expect(this.book.upVotes).toEqual(upVotes);
  });

  it('has a find and save methods working', () => {
    this.book.save();
    const bookFromLocalstorage: BookModel = BookModel.find(this.book.title);
    expect(bookFromLocalstorage).toEqual(this.book);
  });

  it('has a destroy method working', () => {
    this.book.save();
    this.book.destroy();
    const bookFromLocalstorage: BookModel = BookModel.find(this.book.title);
    expect(bookFromLocalstorage).toBeFalsy();
  });
});
