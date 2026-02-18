'use client';
import { use, useState, useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { Book } from '../../../types/Book';
import { useAuth } from '../../../contexts/AuthContext';
import firebase from '../../../firebase';
import 'firebase/compat/firestore';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const BookPage = ({ params }: { params: { id: string } }) => {
  const { id } = use(params);
  const { data: book, error } = useSWR<Book>(
    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
    fetcher,
    { ssr: false }
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

  return (
    <div className="wrapper">
      <div className="book-page__container">
        <div className="book-page__main-content">
          <div className="book-page__left-panel">
            <h1 className="book-page__title">{book.title}</h1>
            <p className="book-page__author">{book.author}</p>
            <p className="book-page__sub-title">{book.subTitle}</p>
            <div className="book-page__stats-wrapper">
              <div className="book-page__stat">
                  <div className="book-page__stat--icon">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M13 7h-2v6h6v-2h-4z"></path></svg>
                  </div>
                  <p>{book.duration}</p>
              </div>
              <div className="book-page__stat">
                  <div className="book-page__stat--icon">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path></svg>
                  </div>
                  <p>{book.rating} ({book.numberOfRatings} ratings)</p>
              </div>
            </div>
            <div className="book-page__button-wrapper">
              <button className="book-page__btn book-page__btn--primary" onClick={listenNow}>
                <div className="book-page__btn--icon">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M9 17.025V6.975a.5.5 0 0 1 .799-.401l7.025 5.025a.5.5 0 0 1 0 .802l-7.025 5.025A.5.5 0 0 1 9 17.025z"></path></svg>
                </div>
                <span>Listen</span>
              </button>
              <button className="book-page__btn book-page__btn--secondary">
                <div className="book-page__btn--icon">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a.5.5 0 0 0-.5.5v5.21l-1.293-1.293a.5.5 0 0 0-.707.707l2 2a.5.5 0 0 0 .707 0l2-2a.5.5 0 0 0-.707-.707L9.5 7.21V2.5A.5.5 0 0 0 9 2zM3 10.036v3.25a.5.5 0 0 0 .5.5h3.25a.5.5 0 0 0 .5-.5v-3.25a.5.5 0 0 0-.5-.5H3.5a.5.5 0 0 0-.5.5zM4 13.5a.5.5 0 0 1-.5-.5v-2.5a.5.5 0 0 1 .5-.5h2.5a.5.5 0 0 1 .5.5v2.5a.5.5 0 0 1-.5.5H4z"></path></svg>
                </div>
                <span>Read</span>
              </button>
              <button className="book-page__library-action" onClick={addToLibrary} disabled={isAdded}>
                <div className="book-page__btn--icon">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
                </div>
                <span>{isAdded ? 'In My Library' : 'Add to My Library'}</span>
              </button>
            </div>
            <div className="book-page__tags">
              <p className="book-page__tags--wrapper"><b>Tags: </b>{book.tags.join(', ')}</p>
            </div>
          </div>
          <div className="book-page__right-panel">
            <figure className="book-page__image--wrapper">
              <img src={book.imageLink} alt={book.title} className="book-page__image" />
            </figure>
          </div>
        </div>
        <div className="book-page__summary">
            <h2 className="book-page__summary--title">What's it about?</h2>
            <p>{book.summary}</p>
        </div>
      </div>
    </div>
  );
};

export default BookPage;
