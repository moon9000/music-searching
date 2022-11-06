import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ArtistData, ArtistMbidData } from "../types/Artist";

// Define a service using a base URL and expected endpoints
export const artistApi = createApi({
  reducerPath: "artistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://ws.audioscrobbler.com/2.0`,
  }),
  endpoints: (builder) => ({
    getArtistByName: builder.query<ArtistData, string>({
      query: (name) =>
        `?method=artist.getinfo&artist=${name}&api_key=38be8fec8a756d6754565408178ceb6e&format=json`,
    }),
  }),
});

export const artistRelationsApi = createApi({
  reducerPath: "artistRelationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://musicbrainz.org/ws/2/artist`,
  }),
  endpoints: (builder) => ({
    getArtistByMbid: builder.query<ArtistMbidData, string>({
      query: (mbid) => `${mbid}?inc=url-rels&fmt=json`,
    }),
  }),
});

export const songApi = createApi({
  reducerPath: "songApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://ws.audioscrobbler.com/2.0`,
  }),
  endpoints: (builder) => ({
    getSongByName: builder.query<ArtistData, string>({
      query: (name) =>
        `?method=track.getinfo&track=${name}&api_key=38be8fec8a756d6754565408178ceb6e&format=json`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetArtistByNameQuery } = artistApi;
export const { useGetArtistByMbidQuery } = artistRelationsApi;
export const { useGetSongByNameQuery } = songApi;
