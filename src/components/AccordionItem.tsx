'use client';
import React, { useState } from 'react';

interface AccordionItemProps {
  title: string;
  content: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion__item">
      <div className="accordion__item--header" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="accordion__item--title">{title}</h3>
        <div className={`accordion__item--icon ${isOpen ? 'open' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
        </div>
      </div>
      {isOpen && (
        <div className="accordion__item--content">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
