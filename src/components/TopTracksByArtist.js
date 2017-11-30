import React from 'react';

const TopTracksByArtist = props => {
  return (
    <ul className="recent-tracklist">
      {props.tracks.map(track => (
        <li key={track.date.uts}>
          <p>{track.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default TopTracksByArtist;
