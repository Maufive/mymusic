import React from 'react';
import MdInfoOutline from 'react-icons/lib/md/info-outline';

const RecentTrackList = props => {
  return (
    <ul className="recent-tracklist">
      {props.recentTracks.map(track => (
        <li key={track.name}>
          <div className="image-bg">
            <img src={track.image[2]['#text']} alt="album cover missing" />
            <p>
              <strong>{track.artist['#text']}</strong>
            </p>
            <p>{track.name}</p>
            <div className="track-info">
              <a href={track.url} target="_blank">
                <MdInfoOutline />
                <br/>
                About this track
              </a>
              <h6>more coming soon :-)</h6>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RecentTrackList;
