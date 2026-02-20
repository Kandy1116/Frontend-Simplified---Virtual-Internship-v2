'use client';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import AudioPlayer from '@/components/player/AudioPlayer';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const PlayerPage = () => {
  const params = useParams();
  const { id } = params;

  const { data: book, error } = useSWR(
    id ? `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}` : null,
    fetcher,
    { ssr: false }
  );

  if (error) return <div className="wrapper">Failed to load book.</div>;
  if (!book) return <div className="wrapper">Loading...</div>;

  return (
    <div className="player__wrapper">
      <div className="player__container">
          <h1 className="player__title">{book.title}</h1>
          <p className="player__summary">{book.bookDescription}</p>
      </div>
      <AudioPlayer book={book} />
    </div>
  );
};

export default PlayerPage;
