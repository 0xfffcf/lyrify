const TrackSearchResult = ({ track, chooseTrack }) => {
  function handlePlay() {
    chooseTrack(track);
  }
  return <div onClick={handlePlay}>{track.title}</div>;
};

export default TrackSearchResult;
