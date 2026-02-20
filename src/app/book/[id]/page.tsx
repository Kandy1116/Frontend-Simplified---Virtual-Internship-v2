"use client";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { useAuth } from "@/contexts/AuthContext";
import { FaStar, FaRegClock, FaMicrophone, FaLightbulb, FaBookmark, FaRegBookmark } from "react-icons/fa";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const BookPage = () => {
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const { user, loading: authLoading, openAuthModal, toggleLibrary, library, isSubscribed } = useAuth();

  const { data: book, error } = useSWR(
    id ? `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}` : null,
    fetcher,
    { ssr: false }
  );

  const handleReadListenClick = () => {
    if (!user) {
      openAuthModal();
      return;
    }
    if (book.subscriptionRequired && !isSubscribed) {
      router.push("/choose-plan");
    } else {
      router.push(`/player/${id}`);
    }
  };

  const handleAddToLibraryClick = () => {
    if (!user) {
      openAuthModal();
      return;
    }
    toggleLibrary(book);
  };

  if (error) return <div className="wrapper">Failed to load book.</div>;
  if (!book || authLoading) return <div className="wrapper">Loading...</div>;

  const isBookInLibrary = library.some((libBook) => libBook.id === book.id);

  return (
    <div className="wrapper">
      <div className="book__container">
        <div className="book__summary--container">
          <h1 className="book__summary--title">
            {book.title}
          </h1>
          <p className="book__summary--author">{book.author}</p>
          <p className="book__summary--sub-title">{book.subTitle}</p>

          <div className="book__summary--details-wrapper">
            <div className="book__summary--details-group">
              <div className="book__summary--details">
                <FaStar />
                <span>{book.averageRating} ({book.totalRating} ratings)</span>
              </div>
              <div className="book__summary--details">
                <FaRegClock />
                <span>{book.duration}</span>
              </div>
              <div className="book__summary--details">
                <FaMicrophone />
                <span>{book.type}</span>
              </div>
              <div className="book__summary--details">
                <FaLightbulb />
                <span>{book.keyIdeas} Key ideas</span>
              </div>
            </div>
          </div>

          <div className="book__summary--actions">
            <button className="btn btn--primary" onClick={handleReadListenClick}>
              <FaMicrophone className="mr-2"/>
              Listen
            </button>
            <button className="btn btn--secondary" onClick={handleReadListenClick}>
              <FaLightbulb className="mr-2"/>
              Read
            </button>
          </div>

          <div className="book__summary--add-to-library" onClick={handleAddToLibraryClick}>
            {isBookInLibrary ? <FaBookmark /> : <FaRegBookmark />}
            <span>{isBookInLibrary ? "Saved in My Library" : "Add title to My Library"}</span>
          </div>
        </div>

        <figure className="book__image--container">
          <img src={book.imageLink} alt={book.title} className="book__image" />
        </figure>
      </div>

      <div className="book__content">
        <div className="book__content--section">
          <h2 className="book__content--title">What's it about?</h2>
          <div className="book__content--tags">
            {book.tags.map((tag: string) => (
              <div key={tag} className="book__content--tag">{tag}</div>
            ))}
          </div>
          <p className="book__content--text" style={{ whiteSpace: 'pre-line' }}>{book.bookDescription}</p>
        </div>

        <div className="book__content--section">
          <h2 className="book__content--title">About the author</h2>
          <p className="book__content--text" style={{ whiteSpace: 'pre-line' }}>{book.authorDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default BookPage;
