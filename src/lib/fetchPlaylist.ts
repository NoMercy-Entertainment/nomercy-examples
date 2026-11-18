import playlists, { type Playlist, type PlaylistItem } from "@/components/MusicPlayer/playlists";

export const fetchPlaylist = async (url: string) => {
  const response = await fetch("https://api.nomercy.tv/cors?url=" + url);

  const html = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const tracks = Array.from(doc.querySelectorAll<HTMLDivElement>("[data-track-info]"));

  const baseCoverUrl =
    "https://api.nomercy.tv/cors?url=" +
    "https://files.freemusicarchive.org/storage-freemusicarchive-org/";

  let cover = doc.querySelectorAll<HTMLImageElement>('img')
    ?.[3]
    ?.src
    ?.replace(location.origin, "")
    ?.replace("https://freemusicarchive.org/image/?file=", "")
    ?.split("&")
    ?.at(0);

  if (cover == '/img/default/album.jpg') {
    cover = 'https://api.nomercy.tv/cors?url=https://freemusicarchive.org/img/default/album.jpg';
  }
  else if (cover == '/img/default/artist.jpg') {
    cover = 'https://api.nomercy.tv/cors?url=https://freemusicarchive.org/img/default/artist.jpg';
  } else {
    cover = baseCoverUrl + cover;
  }

  let albumName = doc.querySelectorAll<HTMLHeadingElement>('section h1')[0]
    ?.querySelector('span')
    ?.textContent
    ?.trim() || doc.querySelectorAll<HTMLHeadingElement>('section h1')[0]
      ?.textContent
      ?.trim() || '';

  let artistName = doc.querySelectorAll<HTMLHeadingElement>('section h2')[0]
    ?.querySelector('a')
    ?.textContent
    ?.trim() || 'Singles';

  if (albumName == '') {
    artistName = url.split('/').at(-3) || '';
    albumName = url.split('/').at(-2) || '';
    cover = 'https://api.nomercy.tv/cors?url=https://freemusicarchive.org/img/default/album.jpg';
  }

  const result = [];

  for (const track of tracks ?? []) {
    const data = track.dataset.trackInfo
      ? JSON.parse(track.dataset.trackInfo)
      : {};

    const item: PlaylistItem = {
      id: data.id,
      cover: cover,
      album_track: [
        {
          name: data.albumTitle,
          url: url,
        },
      ],
      artist_track: [
        {
          name: data.artistName,
          url: data.artistUrl,
        },
      ],
      name: data.title,
      path: data.fileUrl ?? ('https://api.nomercy.tv/cors?url=' + data.downloadUrl),
    };

    result.push(item);
  }

  const playlist: Playlist = {
    name: albumName,
    cover: cover,
    artist: artistName,
    tracks: result,
  };

  playlists.value = [
    ...playlists.value ?? [],
    playlist,
  ];

  return playlist;
};

export default fetchPlaylist;