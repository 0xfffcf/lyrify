import { useEffect, useState } from 'react';
import SpotifyWebPlayer from 'react-spotify-web-playback/lib';

const Player = ({ accessToken, trackUri }) => {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay(true);
  }, [trackUri]);

  if (!accessToken) return null;

  return (
    <SpotifyWebPlayer
      token={accessToken}
      showSaveIcon
      play={play}
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
      }}
      uris={trackUri ? [trackUri] : []}
      styles={{
        bgColor: 'rgba(0, 0, 0, 0.24)',
        activeColor: '#0063D1',
        color: 'white',
      }}
    />
  );
};

export default Player;
