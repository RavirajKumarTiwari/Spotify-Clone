import React from 'react';
import styled from 'styled-components';
import CurrentTrack from './CurrentTrack';
import PlayerControls from './PlayerControls';
import Volume from './Volume';

export default function Footer() {
  return (
      <Container className="bg-[#181818] h-[100%] border-t border-solid border-gray-700 grid items-center justify-center py-0 px-4 ">
      <CurrentTrack />
      <PlayerControls />
      <Volume/>
      </Container>
  );
}

const Container = styled.div`
  grid-template-columns: 1fr 2fr 1fr;
`