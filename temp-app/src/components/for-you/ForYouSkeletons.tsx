const ForYouSkeletons = () => {
  return (
    <div className="wrapper">
      <div className="for-you__wrapper">
        <div className="for-you__heading">
          <h1 className="for-you__title">Selected just for you</h1>
        </div>
        <div className="book-card--skeleton selected-book--skeleton"></div>
        <div className="for-you__heading">
          <h2 className="for-you__title">Recommended For You</h2>
          <p className="for-you__sub-title">We think you'll like these</p>
        </div>
        <div className="for-you__books-list">
          {new Array(4).fill(0).map((_, index) => <div key={index} className="book-card--skeleton"></div>)}
        </div>
        <div className="for-you__heading">
          <h2 className="for-you__title">Suggested Books</h2>
          <p className="for-you__sub-title">Browse those books</p>
        </div>
        <div className="for-you__books-list">
          {new Array(4).fill(0).map((_, index) => <div key={index} className="book-card--skeleton"></div>)}
        </div>
      </div>
    </div>
  );
}

export default ForYouSkeletons;