import Link from 'next/link';
import { Book } from '../../types/Book';

interface SelectedBookProps {
  book: Book;
}

const SelectedBook = ({ book }: SelectedBookProps) => {
  if (!book) return null;

  return (
    <Link href={`/book/${book.id}`} className="selected-book__container--link">
      <div className="selected-book__container">
        <div className="selected-book__description">
          {book.subTitle}
        </div>
        <div className="selected-book__vertical-line"></div>
        <div className="selected-book__content">
          <figure className="book__image--wrapper">
            <img className="book__image" src={book.imageLink} alt={book.title} />
          </figure>
          <div className="selected-book__details">
            <div className="book__title">{book.title}</div>
            <div className="book__author">{book.author}</div>
            <div className="selected-book__duration">
              <div className="selected-book__player-icon">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M9 17.025V6.975a.5.5 0 0 1 .799-.401l7.025 5.025a.5.5 0 0 1 0 .802l-7.025 5.025A.5.5 0 0 1 9 17.025z"></path></svg>
              </div>
              <div className="book__duration--text">{book.duration}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SelectedBook;
