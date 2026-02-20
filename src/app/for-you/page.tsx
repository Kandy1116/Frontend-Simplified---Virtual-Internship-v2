'use client';
import useSWR from 'swr';
import { Book } from '../../types/Book';
import Layout from "./Layout";
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

  const isLoading = !selectedBookData && !recommendedBooksData && !suggestedBooksData;

  return (
    <Layout>
      <div className="wrapper">
        <div className="for-you__wrapper">
          {isLoading ? (
            <ForYouSkeletons />
          ) : (
            <>
              <div className="for-you__heading">
                <h1 className="for-you__title">Selected just for you</h1>
              </div>
              {selectedError ? (
                <p>Error loading selected book.</p>
              ) : (
                selectedBookData && <SelectedBook book={selectedBookData[0]} />
              )}

              <RecommendedBooks
                books={recommendedBooksData || []}
                error={recommendedError}
              />

              <SuggestedBooks books={suggestedBooksData || []} error={suggestedError} />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ForYouPage;
