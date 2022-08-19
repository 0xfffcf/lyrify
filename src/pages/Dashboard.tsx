import { Box } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import Player from '../features/Player';
import TrackSearchResult from '../features/TrackSearchResult';
import useAuth from '../hooks/useAuth';
import { Track } from '../interfaces';
import { Input } from '@chakra-ui/react';

import styles from '../styles/Fonts.module.css';

const spotifyApi = new SpotifyWebApi({
  clientId: '452c9463380b48d8974e7e3778c4f2ff',
});

const Dashboard = ({ code }: any) => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<any>([]);
  const [playingTrack, setPlayingTrack] = useState<Track>();
  const [lyrics, setLyrics] = useState('');
  const accessToken: string = useAuth(code);

  const chooseTrack = (track: Track) => {
    setPlayingTrack(track);
    setSearch('');
    setLyrics('');
  };

  useEffect(() => {
    if (!playingTrack) return;

    axios
      .get('http://localhost:3000/api/lyrics', {
        params: { track: playingTrack.title, artist: playingTrack.artist },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [playingTrack]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    spotifyApi.searchTracks(search).then((res) => {
      setSearchResults(
        res?.body?.tracks?.items.map((track) => {
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[2].url,
          };
        })
      );
    });
  }, [search, accessToken]);

  console.log(searchResults);
  return (
    <Box h='100vh' w='100vw' bgColor='blackAlpha.900'>
      <Box h='1em' />
      <Input
        type='search'
        placeholder='Title/Artist'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        m='auto'
        display='block'
        w='20em'
        bgColor='white'
      />
      {searchResults.length !== 0 && (
        <Box
          textAlign='center'
          mt='10em'
          color='white'
          className={styles.header}
        >
          {searchResults.map((track: Track) => {
            return (
              <TrackSearchResult
                track={track}
                chooseTrack={chooseTrack}
                key={track.uri}
              />
            );
          })}
        </Box>
      )}
      {searchResults.length === 0 && (
        <Box
          mt='5em'
          whiteSpace='pre'
          color='white'
          textAlign='center'
          h='42em'
          overflowY='scroll'
        >
          {lyrics}
        </Box>
      )}
      <Box pos='absolute' w='100%' bottom={0}>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </Box>
    </Box>
  );
};

export default Dashboard;
