export type ArtistData = {
  artist: Artist;
};

type Artist = {
  bio: { content: string; published: string; summary: string };
  tags: { tag: Tag[] };
  mbid: string;
  name: string;
  type: string;
  gender: string;
  begin: Date;
  country: string;
  similar: { artist: SimilarArtist[] };
};

type Tag = {
  name: string;
  url: string;
};

type SimilarArtist = {
  name: string;
  url: string;
};

export type ArtistMbidData = {
  relations: Relation[];
};

type Relation = {
  type: string;
  url: {
    resource: string;
    id: string;
  };
};
