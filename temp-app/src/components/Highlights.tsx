import React from 'react';

const Highlights = () => {
  return (
    <section id="highlights">
      <div className="container">
        <div className="row">
          <h2 className="section__title">
            What our members say
          </h2>
          <div className="highlight__wrapper">
            <div className="highlight">
              <div className="highlight__img">
                <img src="https://i.pravatar.cc/150?img=1" alt="user" />
              </div>
              <div className="highlight__para">
                "This app has been a game-changer for me! It's saved me so much time and effort in reading and comprehending books. Highly recommend it to all book lovers."
              </div>
            </div>
            <div className="highlight">
              <div className="highlight__img">
                <img src="https://i.pravatar.cc/150?img=2" alt="user" />
              </div>
              <div className="highlight__para">
                "I love this app! It provides concise and accurate summaries of books in a way that is easy to understand. It's also very user-friendly and intuitive."
              </div>
            </div>
            <div className="highlight">
              <div className="highlight__img">
                <img src="https://i.pravatar.cc/150?img=3" alt="user" />
              </div>
              <div className="highlight__para">
                "This app is a great way to get the main takeaways from a book without having to read the entire thing. The summaries are well-written and informative. Definitely worth downloading."
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
