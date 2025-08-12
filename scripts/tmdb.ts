import { TMDB, TMDBConfigSchema } from '../src/tmdb.ts';

const config = TMDBConfigSchema.parse(process.env);

const client = new TMDB(config);

console.log(await client.discoverMovie());
