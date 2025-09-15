import { type SearchResults, SpotifyApi } from '@spotify/web-api-ts-sdk';
import { useEffect, useRef, useState } from 'react';

export function Spotify({ sdk }: { sdk: SpotifyApi }) {
  const [results, setResults] = useState<SearchResults<['artist']> | null>(
    null,
  );

  const didSearch = useRef(false);

  useEffect(() => {
    if (didSearch.current) {
      return;
    }
    didSearch.current = true;

    const search = async () => {
      const results = await sdk.search('The Beatles', ['artist']);
      setResults(results);
    };

    search().catch(console.error);
  }, [sdk]);

  const tableRows = results?.artists?.items.map(artist => {
    return (
      <tr key={artist.id}>
        <td>{artist.name}</td>
        <td>{artist.popularity}</td>
        <td>{artist.followers.total}</td>
      </tr>
    );
  });

  return (
    <>
      <h1>Spotify Search for The Beatles</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Popularity</th>
            <th>Followers</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </>
  );
}
