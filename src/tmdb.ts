import { z } from 'zod';

export const TMDBConfigSchema = z.object({
  TMDB_API_KEY: z.string().trim().nonempty(),
});

export type TMDBConfig = z.infer<typeof TMDBConfigSchema>;

export class TMDB {
  private config: TMDBConfig;

  constructor(config: TMDBConfig) {
    this.config = config;
  }

  async discoverMovie(): Promise<unknown> {
    const response = await fetch(
      'https://api.themoviedb.org/3/discover/movie',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.config.TMDB_API_KEY}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Could not discover movies: ${response.status} ${response.statusText}`,
      );
    }

    return await response.json();
  }
}
