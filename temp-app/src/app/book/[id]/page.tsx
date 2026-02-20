'use client';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { Book } from '../../../types/Book';
import { useAuth } from '../../../contexts/AuthContext';
import firebase from '../../../firebase';
import 'firebase/compat/firestore';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const BookPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data: book, error } = useSWR<Book>(
    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
    fetcher
  );
  
  const [isAdded, setIsAdded] = useState(false);
  const { user, isSubscribed, openModal } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && book) {
      const db = firebase.firestore();
      const docRef = db.collection('users').doc(user.uid).collection('library').doc(book.id);
      docRef.get().then((doc) => {
        if (doc.exists) {
          setIsAdded(true);
        }
      });
    }
  }, [user, book]);

  const addToLibrary = async () => {
    if (!user) {
      openModal();
      return;
    }
    if (!book) return;

    const db = firebase.firestore();
    const docRef = db.collection('users').doc(user.uid).collection('library').doc(book!.id);
    await docRef.set(book);
    setIsAdded(true);
  };

  const listenNow = () => {
    if (book?.subscriptionRequired && !isSubscribed) {
      router.push('/choose-plan');
    } else {
      router.push(`/player/${book?.id}`);
    }
  };
  
  if (error) return <div className="wrapper">Failed to load book.</div>;
  if (!book) return <div className="wrapper">Loading...</div>;

  const readNow = () => {
    if (!user) {
      openModal();
      return;
    }
    if (book?.subscriptionRequired && !isSubscribed) {
      router.push('/choose-plan');
    } else {
      router.push(`/player/${book?.id}`);
    }
  };

  return (
    <div className="wrapper">
      <div className="book-page__container">
        <div className="book-page__content">
          <div className="book-page__left">
            <h1 className="book-page__title">{book.title}</h1>
            <p className="book-page__author">{book.author}</p>
            <p className="book-page__sub-title">{book.subTitle}</p>
            <div className="book-page__actions">
              <button className="book-page__btn" onClick={readNow}>
                <div className="book-page__btn--icon">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16v2H4zm4 5h12v2H8zm5 5h7v2h-7z"></path></svg>
                </div>
                <span>Read</span>
              </button>
              <button className="book-page__btn" onClick={listenNow}>
                <div className="book-page__btn--icon">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9 17.025V6.975a.5.5 0 0 1 .799-.401l7.025 5.025a.5.5 0 0 1 0 .802l-7.025 5.025A.5.5 0 0 1 9 17.025z"></path></svg>
                </div>
                <span>Listen</span>
              </button>
            </div>
            <button className="book-page__library-btn" onClick={addToLibrary} disabled={isAdded}>
              <div className="book-page__library-btn--icon">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5 21h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2zm7-14a4 4 0 0 1 4 4s0 4-4 4-4-4-4-4 4-4 4-4z"></path></svg>
              </div>
              <span>{isAdded ? 'Saved in My Library' : 'Add to My Library'}</span>
            </button>
            <div className="book-page__section">
              <h3 className="book-page__section-title">What's it about?</h3>
                          <div className="inner-book__duration">{book.duration}</div>
                          <div className="book-page__tags">
                {book.tags.map((tag) => (
                  <div key={tag} className="book-page__tag">{tag}</div>
                ))}
              </div>
              <p className="book-page__summary" style={{ whiteSpace: 'pre-line' }}>{book.summary}</p>
            </div>
            <div className="book-page__section">
                <h3 className="book-page__section-title">About the author</h3>
                <p className="book-page__author-summary">{book.author}</p>
            </div>
          </div>
          <div className="book-page__right">
            <figure className="book-page__image--wrapper">
              <img src={book.imageLink} alt={book.title} />
            </figure>
            <div className="book-page__stats">
              <div className="book-page__stat">
                <div className="book-page__stat-icon">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path></svg>
                </div>
                <span>{book.averageRating} ({book.totalRating} ratings)</span>
              </div>
              <div className="book-page__stat">
                <div className="book-page__stat-icon">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M13 7h-2v6h6v-2h-4z"></path></svg>
                </div>
                <span>{book.duration}</span>
              </div>
              <div className="book-page__stat">
                <div className="book-page__stat-icon">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16v2H4zm4 5h12v2H8zm5 5h7v2h-7z"></path></svg>
                </div>
                <span>Audio & Text</span>
              </div>
              <div className="book-page__stat">
                <div className="book-page__stat-icon">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M11 11h2v6h-2zm0-4h2v2h-2z"></path></svg>
                </div>
                <span>{book.keyIdeas} Key ideas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPage;
