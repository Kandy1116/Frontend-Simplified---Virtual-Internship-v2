import React from 'react';

const PlayerPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <h1>Player for book {params.id}</h1>
      {/* Audio player implementation will go here */}
    </div>
  );
};

export default PlayerPage;
