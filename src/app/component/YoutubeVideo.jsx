// YouTubeVideo.js
import React from 'react';
import YouTube from 'react-youtube';
import { Box, Center } from '@chakra-ui/react';

const YouTubeVideo = ({ videoId }) => {
  const opts = {
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return (
      <Box
        ml="1">
        <YouTube videoId={videoId} opts={opts} />
      </Box>
  );
};

export default YouTubeVideo;
