import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { useEffect, useState } from 'react';

export function useSpotify({
  clientId,
  redirectUrl,
  scopes,
}: {
  clientId: string;
  redirectUrl: string;
  scopes: string[];
}): SpotifyApi | null {
  const [sdk, setSdk] = useState<SpotifyApi | null>(null);

  useEffect(() => {
    const init = async () => {
      const sdk = SpotifyApi.withUserAuthorization(
        clientId,
        redirectUrl,
        scopes,
      );

      try {
        const { authenticated } = await sdk.authenticate();

        if (authenticated) {
          setSdk(sdk);
        }
      } catch (e: unknown) {
        if (
          e &&
          e instanceof Error &&
          e.message &&
          e.message.includes('No verifier found in cache')
        ) {
          console.error(
            "If you are seeing this error in a React Development Environment it's because React calls useEffect twice. Using the Spotify SDK performs a token exchange that is only valid once, so React re-rendering this component will result in a second, failed authentication. This will not impact your production applications (or anything running outside of Strict Mode - which is designed for debugging components).",
            e,
          );
        } else {
          console.error(e);
        }
      }
    };

    init().catch(console.error);
  }, [clientId, redirectUrl, scopes]);

  return sdk;
}
