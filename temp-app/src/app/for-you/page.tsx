'use client';
import useSWR from 'swr';
import { Book } from '../../types/Book';
import SelectedBook from '../../components/for-you/SelectedBook';
import RecommendedBooks from '../../components/for-you/RecommendedBooks';
import SuggestedBooks from '../../components/for-you/SuggestedBooks';
import ForYouSkeletons from '../../components/for-you/ForYouSkeletons';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const ForYouPage = () => {
  const { data: selectedBookData, error: selectedError } = useSWR<Book[]>(
    'https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected',
    fetcher
  );
  const { data: recommendedBooksData, error: recommendedError } = useSWR<Book[]>(
    'https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended',
    fetcher
  );
  const { data: suggestedBooksData, error: suggestedError } = useSWR<Book[]>(
    'https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested',
    fetcher
  );

  const error = selectedError || recommendedError || suggestedError;
  const isLoading = !selectedBookData || !recommendedBooksData || !suggestedBooksData;

  if (error) return (
    <div className="wrapper">
      <div className="for-you__wrapper">
        <div className="for-you__heading">
          <h1 className="for-you__title">Error</h1>
          <p className="for-you__sub-title">
            Failed to fetch books. The API might be temporarily unavailable.
          </p>
        </div>
      </div>
    </div>
  );

  if (isLoading) return <ForYouSkeletons />;

  const selectedBook = selectedBookData?.[0];

  return (
    <div className="wrapper">
      <div className="for-you__wrapper">
        <div className="for-you__heading">
          <h1 className="for-you__title">Selected just for you</h1>
        </div>
        {selectedBook ? <SelectedBook book={selectedBook} /> : <div>No selected book available.</div>}
        <RecommendedBooks books={recommendedBooksData || []} />
        <SuggestedBooks books={suggestedBooksData || []} />
      </div>
    </div>
  );
};

export default ForYouPage;
