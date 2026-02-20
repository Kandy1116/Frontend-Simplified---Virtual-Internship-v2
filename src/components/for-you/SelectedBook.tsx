import Link from 'next/link';
import type { Book } from '../../types/Book';
import { FaPlay } from 'react-icons/fa';

interface SelectedBookProps {
  book: Book;
}

const SelectedBook: React.FC<SelectedBookProps> = ({ book }) => {
  if (!book) return null;

  return (
    <Link href={`/book/${book.id}`} className="selected__book">
        <audio src={book.audioLink}></audio>
        <div className="selected__book--sub-title">{book.subTitle}</div>
        <div className="selected__book--line"></div>
        <div className="selected__book--content">
            <figure className="book__image--wrapper" style={{ height: '140px', width: '140px', minWidth: '140px' }}>
                <img className="book__image" src={book.imageLink} alt="book" style={{ display: 'block' }} />
            </figure>
            <div className="selected__book--text">
                <div className="selected__book--title">{book.title}</div>
                <div className="selected__book--author">{book.author}</div>
                <div className="selected__book--duration-wrapper">
                    <div className="selected__book--icon">
                        <FaPlay />
                    </div>
                    <div className="selected__book--duration">{book.duration} minutes</div>
                </div>
            </div>
        </div>
    </Link>
  );
};

export default SelectedBook;