export interface Book {
  image: string;
  title: string;
  description: string;
  price: number;
  upVotes: number;
}

export class BookModel implements Book {
  constructor(
    public image: string,
    public title: string,
    public description: string,
    public price: number,
    public upVotes: number = 0
  ) {}

  public static find(title: string) {
    const books: BookModel[] = JSON.parse(
      localStorage.getItem('books') || '[]'
    );
    for (const book of books) {
      if (book.title === title) {
        return new BookModel(
          book.image,
          book.title,
          book.description,
          book.price,
          book.upVotes
        );
      }
      return null;
    }
  }
  save() {
    const books: BookModel[] = JSON.parse(
      localStorage.getItem('books') || '[]'
    );
    books.forEach((item, index) => {
      if (item.title === this.title) {
        books.splice(index, 1);
      }
    });
    books.push(this);
    localStorage.setItem('books', JSON.stringify(books));
    return true;
  }

  destroy() {
    const books: BookModel[] = JSON.parse(
      localStorage.getItem('books') || '[]'
    );
    books.forEach((item, index) => {
      if (item.title === this.title) {
        books.splice(index, 1);
        localStorage.setItem('books', JSON.stringify(books));
      }
      return null;
    });
  }
}
