import React from 'react';
import { Book } from '@/types/Book';

interface TrackInfoProps {
  book: Book;
}

const TrackInfo: React.FC<TrackInfoProps> = ({ book }) => {
  return (
    <div className="track-info">
      <figure className="track-info__image--wrapper">
        <img src={book.imageLink} alt={book.title} className="track-info__image" />
      </figure>
      <div className="track-info__text">
        <h3 className="track-info__title">{book.title}</h3>
        <p className="track-info__author">{book.author}</p>
      </div>
    </div>
  );
};

export default TrackInfo;
