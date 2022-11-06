import * as React from "react";
import "./App.css";
import { useGetArtistByNameQuery } from "./features/music-fetching/musicFetchingSlice";
import { useGetArtistByMbidQuery } from "./features/music-fetching/musicFetchingSlice";
import TextField from "@mui/material/TextField";
import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Stack,
  Typography,
  Button,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Wrapper } from "./components/Wrapper";
import { AppBar } from "./components/Appbar";

function App() {
  const [value, setValue] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [skip, setSkip] = React.useState(true);
  const { data } = useGetArtistByNameQuery(value, { skip });
  const [mbid, setMbid] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const mbidData = useGetArtistByMbidQuery(mbid, {
    skip,
  });

  function handleSubmit() {
    setIsSubmitted(true);
    setSkip(false); //fires the first query to gather artist data
    setIsOpen(false);
  }

  function handleMbid() {
    if (data && data.artist && data.artist.mbid) {
      setIsOpen(true);
      setSkip(true); //prevent firing second query before mbid is set
      setMbid(data.artist.mbid);
      setSkip(false); //fires the second query to gather artist relations
    }
  }

  React.useEffect(() => {
    setIsOpen(false);
  }, [value]);

  return (
    <Box>
      <AppBar />
      <Wrapper>
        <Stack sx={{ paddingTop: 10 }} spacing={10}>
          <Stack
            sx={{ alignItems: "center", justifyContent: "center" }}
            spacing={2}
          >
            <Typography variant="h6">
              Enter the name of the artist you are searching for
            </Typography>
            <Stack spacing={2} direction="row">
              <TextField
                id="outlined-basic"
                label="Artist"
                variant="outlined"
                value={value}
                onChange={(e: any) => {
                  setValue(e.target.value);
                }}
                onKeyPress={(e: any) => {
                  if (e.key === "Enter") {
                    setValue(e.target.value);
                    handleSubmit();
                  }
                }}
              />
              <IconButton onClick={handleSubmit} aria-label="search">
                <SearchIcon style={{ fill: "blue" }} />
              </IconButton>
            </Stack>
          </Stack>

          {isSubmitted && data && data.artist ? (
            <Box
              display="grid"
              gridTemplateColumns={{ xs: "1fr", lg: "repeat(3, 1fr)" }}
              gap={2}
            >
              <Card>
                <CardHeader title={data.artist.name} />
                <CardContent>
                  {data.artist.bio.summary
                    ? cleanArtistBioSummary(data.artist.bio.summary)
                    : "There is currently no summary for this artist."}
                </CardContent>
              </Card>

              {data.artist.tags.tag && data.artist.tags.tag.length > 0 ? (
                <Card>
                  <CardHeader title="Tags" />
                  <CardContent>
                    <Stack spacing={1} direction="row">
                      {data.artist.tags.tag.map((tag) => {
                        return <Chip key={tag.name} label={tag.name} />;
                      })}
                    </Stack>
                  </CardContent>
                </Card>
              ) : null}

              {data.artist.similar.artist &&
              data.artist.similar.artist.length > 0 ? (
                <Card>
                  <CardHeader title="Similar artists" />
                  <CardContent>
                    <Stack spacing={1} direction="row">
                      {data.artist.similar.artist.map((artist) => {
                        return (
                          <Chip
                            key={artist.name}
                            label={artist.name}
                            clickable
                            onClick={() => setValue(artist.name)}
                          />
                        );
                      })}
                    </Stack>
                  </CardContent>
                </Card>
              ) : null}
            </Box>
          ) : null}

          {isSubmitted && data && data.artist ? (
            <Stack
              spacing={2}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button variant="contained" onClick={handleMbid}>
                View resources available for this artist
              </Button>
              <Card>
                {isOpen &&
                mbidData &&
                mbidData.data &&
                mbidData.data.relations &&
                mbidData.data.relations.length > 0 ? (
                  <Stack spacing={2}>
                    {mbidData.data.relations.map((relation: any) => {
                      if (relation.type === "image") {
                        let image_url = relation.url.resource;
                        if (
                          image_url.startsWith(
                            "https://commons.wikimedia.org/wiki/File:"
                          )
                        ) {
                          const filename = image_url.substring(
                            image_url.lastIndexOf("/") + 1
                          );
                          image_url =
                            "https://commons.wikimedia.org/wiki/Special:Redirect/file/" +
                            filename;
                        }

                        return (
                          <img
                            key={relation.url.id}
                            src={image_url}
                            width="300xp"
                            height="300px"
                            alt=""
                          />
                        );
                      }

                      return (
                        <a key={relation.url.id} href={relation.url.resource}>
                          {relation.type}
                        </a>
                      );
                    })}
                  </Stack>
                ) : null}
              </Card>
            </Stack>
          ) : null}
        </Stack>
      </Wrapper>
    </Box>
  );
}

function cleanArtistBioSummary(artistBioSummary: string) {
  const cleaned = artistBioSummary
    .replace(/<a[^>]*>|<\/a>/g, "")
    .replace("Read more on Last.fm", "");
  return cleaned;
}

export default App;
