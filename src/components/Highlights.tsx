import React from 'react';
import { BsStarFill } from 'react-icons/bs';

const Highlights = () => {
  const testimonials = [
    {
      name: 'Hanna M.',
      text: 'This app has been a game-changer for me! It\'s saved me so much time and effort in reading and comprehending books. Highly recommend it to all book lovers.',
    },
    {
      name: 'David B.',
      text: 'I love this app! It provides concise and accurate summaries of books in a way that is easy to understand. It\'s also very user-friendly and intuitive.',
    },
    {
      name: 'Nathan S.',
      text: 'This app is a great way to get the main takeaways from a book without having to read the entire thing. The summaries are well-written and informative. Definitely worth downloading.',
    },
    {
      name: 'Ryan R.',
      text: 'If you\'re a busy person who loves reading but doesn\'t have the time to read every book in full, this app is for you! The summaries are thorough and provide a great overview of the book\'s content.',
    },
  ];

  return (
    <section id="highlights">
      <div className="row">
          <h2 className="section__title">What our members say</h2>
          <div className="highlight__wrapper">
            {testimonials.map((testimonial, index) => (
              <div className="highlight" key={index}>
                <div className="highlight__header">
                  <h3 className="highlight__name">{testimonial.name}</h3>
                  <div className="highlight__stars">
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                  </div>
                </div>
                <p className="highlight__para">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
    </section>
  );
};

export default Highlights;
