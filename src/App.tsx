import './App.css';

import { Scopes } from '@spotify/web-api-ts-sdk';

import { useSpotify } from './hooks/useSpotify';
import { Spotify } from './Spotify';

export function App() {
  const sdk = useSpotify({
    clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    redirectUrl: import.meta.env.VITE_SPOTIFY_REDIRECT_URL,
    scopes: Scopes.userDetails,
  });

  return (
    <>
      {!sdk && <div>Loading Spotify SDK...</div>}

      {sdk && <Spotify sdk={sdk} />}
    </>
  );
}
