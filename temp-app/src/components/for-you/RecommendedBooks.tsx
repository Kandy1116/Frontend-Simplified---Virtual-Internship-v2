import Link from 'next/link';
import { Book } from '../../types/Book';

interface RecommendedBooksProps {
  books: Book[];
}

const RecommendedBooks = ({ books }: RecommendedBooksProps) => {
  return (
    <>
      <div className="for-you__heading">
        <h2 className="for-you__title">Recommended For You</h2>
        <p className="for-you__sub-title">We think you'll like these</p>
      </div>
      <div className="for-you__books-list">
        {books.map(book => (
          <Link href={`/book/${book.id}`} key={book.id} className="book-card__link">
            <div className="book-card">
              {book.subscriptionRequired && <div className="book-card__subscription">Premium</div>}
              <figure className="book__image--wrapper">
                <img className="book__image" src={book.imageLink} alt={book.title} />
                <div className="book__image--mask"></div>
              </figure>
              <div className="book__title">{book.title}</div>
              <div className="book__author">{book.author}</div>
              <div className="book__sub-title">{book.subTitle}</div>
              <div className="book-card__details">
                <div className="book-card__duration">
                  <div className="book__icon">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M13 7h-2v6h6v-2h-4z"></path></svg>
                  </div>
                  <div className="book__duration--text">{book.duration}</div>
                </div>
                <div className="book__rating">
                  <div className="book__icon">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path></svg>
                  </div>
                  <div>{book.averageRating}</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default RecommendedBooks;
