import { useLocalStorage } from '@vueuse/core';
import type { MusicPlaylistItem } from '@nomercy-entertainment/nomercy-music-player';

interface TrackLink {
    name: string,
    url: string,
}

export interface PlaylistItem extends MusicPlaylistItem {
    path?: string,
    album_track?: TrackLink[],
    artist_track?: TrackLink[],
}

export interface Playlist {
    name: string,
    cover: string,
    artist: string,
    tracks: PlaylistItem[],
}

export const playlists = useLocalStorage<Playlist[]>('playlists', [
    {
        name: 'Wake Up',
        cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/images%2Falbums%2FThe_Kyoto_Connection_-_Wake_Up_-_20130527135416039.jpg',
        artist: 'The Kyoto Connection',
        tracks: [
            {
                id: 84982,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/images%2Falbums%2FThe_Kyoto_Connection_-_Wake_Up_-_20130527135416039.jpg',
                album_track: [
                    {
                        name: 'Wake Up',
                        url: 'https://freemusicarchive.org/music/The_Kyoto_Connection/Wake_Up_1957'
                    }
                ],
                artist_track: [
                    {
                        name: 'The Kyoto Connection',
                        url: 'https://freemusicarchive.org/music/The_Kyoto_Connection/'
                    }
                ],
                name: 'Intro - The Way Of Waking Up (feat. Alan Watts)',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/The_Kyoto_Connection/Wake_Up/The_Kyoto_Connection_-_01_-_Intro_-_The_Way_Of_Waking_Up_feat_Alan_Watts.mp3'
            },
            {
                id: 84983,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/images%2Falbums%2FThe_Kyoto_Connection_-_Wake_Up_-_20130527135416039.jpg',
                album_track: [
                    {
                        name: 'Wake Up',
                        url: 'https://freemusicarchive.org/music/The_Kyoto_Connection/Wake_Up_1957'
                    }
                ],
                artist_track: [
                    {
                        name: 'The Kyoto Connection',
                        url: 'https://freemusicarchive.org/music/The_Kyoto_Connection/'
                    }
                ],
                name: 'Geisha',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/The_Kyoto_Connection/Wake_Up/The_Kyoto_Connection_-_02_-_Geisha.mp3'
            },
            {
                id: 84984,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/images%2Falbums%2FThe_Kyoto_Connection_-_Wake_Up_-_20130527135416039.jpg',
                album_track: [
                    {
                        name: 'Wake Up',
                        url: 'https://freemusicarchive.org/music/The_Kyoto_Connection/Wake_Up_1957'
                    }
                ],
                artist_track: [
                    {
                        name: 'The Kyoto Connection',
                        url: 'https://freemusicarchive.org/music/The_Kyoto_Connection/'
                    }
                ],
                name: 'Voyage I - Waterfall',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/The_Kyoto_Connection/Wake_Up/The_Kyoto_Connection_-_03_-_Voyage_I_-_Waterfall.mp3'
            },
            {
                id: 84985,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/images%2Falbums%2FThe_Kyoto_Connection_-_Wake_Up_-_20130527135416039.jpg',
                album_track: [
                    {
                        name: 'Wake Up',
                        url: 'https://freemusicarchive.org/music/The_Kyoto_Connection/Wake_Up_1957'
                    }
                ],
                artist_track: [
                    {
                        name: 'The Kyoto Connection',
                        url: 'https://freemusicarchive.org/music/The_Kyoto_Connection/'
                    }
                ],
                name: 'The Music In You',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/The_Kyoto_Connection/Wake_Up/The_Kyoto_Connection_-_04_-_The_Music_In_You.mp3'
            },
            {
                id: 84986,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/images%2Falbums%2FThe_Kyoto_Connection_-_Wake_Up_-_20130527135416039.jpg',
                album_track: [
                    {
                        name: 'Wake Up',
                        url: 'https://freemusicarchive.org/music/The_Kyoto_Connection/Wake_Up_1957'
                    }
                ],
                artist_track: [
                    {
                        name: 'The Kyoto Connection',
                        url: 'https://freemusicarchive.org/music/The_Kyoto_Connection/'
                    }
                ],
                name: 'The Calm Before The Storm',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/The_Kyoto_Connection/Wake_Up/The_Kyoto_Connection_-_05_-_The_Calm_Before_The_Storm.mp3'
            },
            {
                id: 84987,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/images%2Falbums%2FThe_Kyoto_Connection_-_Wake_Up_-_20130527135416039.jpg',
                album_track: [
                    {
                        name: 'Wake Up',
                        url: 'https://freemusicarchive.org/music/The_Kyoto_Connection/Wake_Up_1957'
                    }
                ],
                artist_track: [
                    {
                        name: 'The Kyoto Connection',
                        url: 'https://freemusicarchive.org/music/The_Kyoto_Connection/'
                    }
                ],
                name: 'No Pain, No Gain',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/The_Kyoto_Connection/Wake_Up/The_Kyoto_Connection_-_06_-_No_Pain_No_Gain.mp3'
            },
            {
                id: 84988,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/images%2Falbums%2FThe_Kyoto_Connection_-_Wake_Up_-_20130527135416039.jpg',
                album_track: [
                    {
                        name: 'Wake Up',
                        url: 'https://freemusicarchive.org/music/The_Kyoto_Connection/Wake_Up_1957'
                    }
                ],
                artist_track: [
                    {
                        name: 'The Kyoto Connection',
                        url: 'https://freemusicarchive.org/music/The_Kyoto_Connection/'
                    }
                ],
                name: 'Voyage II - Satori',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/The_Kyoto_Connection/Wake_Up/The_Kyoto_Connection_-_07_-_Voyage_II_-_Satori.mp3'
            },
            {
                id: 84989,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/images%2Falbums%2FThe_Kyoto_Connection_-_Wake_Up_-_20130527135416039.jpg',
                album_track: [
                    {
                        name: 'Wake Up',
                        url: 'https://freemusicarchive.org/music/The_Kyoto_Connection/Wake_Up_1957'
                    }
                ],
                artist_track: [
                    {
                        name: 'The Kyoto Connection',
                        url: 'https://freemusicarchive.org/music/The_Kyoto_Connection/'
                    }
                ],
                name: 'Reveal the Magic',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/The_Kyoto_Connection/Wake_Up/The_Kyoto_Connection_-_08_-_Reveal_the_Magic.mp3'
            },
            {
                id: 84990,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/images%2Falbums%2FThe_Kyoto_Connection_-_Wake_Up_-_20130527135416039.jpg',
                album_track: [
                    {
                        name: 'Wake Up',
                        url: 'https://freemusicarchive.org/music/The_Kyoto_Connection/Wake_Up_1957'
                    }
                ],
                artist_track: [
                    {
                        name: 'The Kyoto Connection',
                        url: 'https://freemusicarchive.org/music/The_Kyoto_Connection/'
                    }
                ],
                name: 'Hachiko (The Faithtful Dog)',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/The_Kyoto_Connection/Wake_Up/The_Kyoto_Connection_-_09_-_Hachiko_The_Faithtful_Dog.mp3'
            },
            {
                id: 84991,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/images%2Falbums%2FThe_Kyoto_Connection_-_Wake_Up_-_20130527135416039.jpg',
                album_track: [
                    {
                        name: 'Wake Up',
                        url: 'https://freemusicarchive.org/music/The_Kyoto_Connection/Wake_Up_1957'
                    }
                ],
                artist_track: [
                    {
                        name: 'The Kyoto Connection',
                        url: 'https://freemusicarchive.org/music/The_Kyoto_Connection/'
                    }
                ],
                name: 'Wake Up',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/The_Kyoto_Connection/Wake_Up/The_Kyoto_Connection_-_10_-_Wake_Up.mp3'
            },
            {
                id: 84992,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/images%2Falbums%2FThe_Kyoto_Connection_-_Wake_Up_-_20130527135416039.jpg',
                album_track: [
                    {
                        name: 'Wake Up',
                        url: 'https://freemusicarchive.org/music/The_Kyoto_Connection/Wake_Up_1957'
                    }
                ],
                artist_track: [
                    {
                        name: 'The Kyoto Connection',
                        url: 'https://freemusicarchive.org/music/The_Kyoto_Connection/'
                    }
                ],
                name: 'Voyage III - The Space Between Us',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/The_Kyoto_Connection/Wake_Up/The_Kyoto_Connection_-_11_-_Voyage_III_-_The_Space_Between_Us.mp3'
            },
            {
                id: 84993,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/images%2Falbums%2FThe_Kyoto_Connection_-_Wake_Up_-_20130527135416039.jpg',
                album_track: [
                    {
                        name: 'Wake Up',
                        url: 'https://freemusicarchive.org/music/The_Kyoto_Connection/Wake_Up_1957'
                    }
                ],
                artist_track: [
                    {
                        name: 'The Kyoto Connection',
                        url: 'https://freemusicarchive.org/music/The_Kyoto_Connection/'
                    }
                ],
                name: 'Ume No Kaori (feat. Sunawai)',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/The_Kyoto_Connection/Wake_Up/The_Kyoto_Connection_-_12_-_Ume_No_Kaori_feat_Sunawai.mp3'
            },
            {
                id: 84994,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/images%2Falbums%2FThe_Kyoto_Connection_-_Wake_Up_-_20130527135416039.jpg',
                album_track: [
                    {
                        name: 'Wake Up',
                        url: 'https://freemusicarchive.org/music/The_Kyoto_Connection/Wake_Up_1957'
                    }
                ],
                artist_track: [
                    {
                        name: 'The Kyoto Connection',
                        url: 'https://freemusicarchive.org/music/The_Kyoto_Connection/'
                    }
                ],
                name: 'Outro - Totally Here and Now (feat. Alan Watts)',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/The_Kyoto_Connection/Wake_Up/The_Kyoto_Connection_-_13_-_Outro_-_Totally_Here_and_Now_feat_Alan_Watts.mp3'
            },
        ],
    },
    {
        name: "Singles",
        cover: "https://api.nomercy.tv/cors?url=https://freemusicarchive.org/img/default/artist.jpg",
        artist: "Back to discography",
        tracks: [
            {
                id: 239727,
                cover: "https://api.nomercy.tv/cors?url=https://freemusicarchive.org/img/default/artist.jpg",
                album_track: [
                    {
                        name: "-",
                        url: "https://freemusicarchive.org/music/grumplefunk/singles"
                    }
                ],
                artist_track: [
                    {
                        name: "Grumplefunk",
                        url: "https://freemusicarchive.org/music/grumplefunk/"
                    }
                ],
                name: "909 Problems",
                path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/YTiK0QcJdpETKfnnlhGeEj0FntrJ9qIYJPpHBZIZ.mp3"
            },
            {
                id: 242611,
                cover: "https://api.nomercy.tv/cors?url=https://freemusicarchive.org/img/default/artist.jpg",
                album_track: [
                    {
                        name: "-",
                        url: "https://freemusicarchive.org/music/grumplefunk/singles"
                    }
                ],
                artist_track: [
                    {
                        name: "Grumplefunk",
                        url: "https://freemusicarchive.org/music/grumplefunk/"
                    }
                ],
                name: "Apple Psy",
                path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/1Q7t6uiaMMixXdUU5AIWEYeAYJSM0RQ8wnHnVTGT.mp3"
            },
            {
                id: 244640,
                cover: "https://api.nomercy.tv/cors?url=https://freemusicarchive.org/img/default/artist.jpg",
                album_track: [
                    {
                        name: "-",
                        url: "https://freemusicarchive.org/music/grumplefunk/singles"
                    }
                ],
                artist_track: [
                    {
                        name: "Grumplefunk",
                        url: "https://freemusicarchive.org/music/grumplefunk/"
                    }
                ],
                name: "Baryon",
                path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/LL50I2PUTRNZla7cKVs3YNBJOCvjFs5P4LbjkN5G.mp3"
            },
            {
                id: 239729,
                cover: "https://api.nomercy.tv/cors?url=https://freemusicarchive.org/img/default/artist.jpg",
                album_track: [
                    {
                        name: "-",
                        url: "https://freemusicarchive.org/music/grumplefunk/singles"
                    }
                ],
                artist_track: [
                    {
                        name: "Grumplefunk",
                        url: "https://freemusicarchive.org/music/grumplefunk/"
                    }
                ],
                name: "Branky Beat",
                path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/z6Pf9b9m5c29wsWAiZMCXoGnxSkvZVnWCZ5Uo7iX.mp3"
            },
            {
                id: 242612,
                cover: "https://api.nomercy.tv/cors?url=https://freemusicarchive.org/img/default/artist.jpg",
                album_track: [
                    {
                        name: "-",
                        url: "https://freemusicarchive.org/music/grumplefunk/singles"
                    }
                ],
                artist_track: [
                    {
                        name: "Grumplefunk",
                        url: "https://freemusicarchive.org/music/grumplefunk/"
                    }
                ],
                name: "Cosmotronic",
                path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/4HMvbVB0ryw68cKD6f9f7bkwHUFUZah2ETVmuIF0.mp3"
            },
            {
                id: 239731,
                cover: "https://api.nomercy.tv/cors?url=https://freemusicarchive.org/img/default/artist.jpg",
                album_track: [
                    {
                        name: "-",
                        url: "https://freemusicarchive.org/music/grumplefunk/singles"
                    }
                ],
                artist_track: [
                    {
                        name: "Grumplefunk",
                        url: "https://freemusicarchive.org/music/grumplefunk/"
                    }
                ],
                name: "Dreique Le Mar",
                path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/F5g8caudb64wiwHC1oyOtFxBjRPOrUng3BEsYg9H.mp3"
            },
            {
                id: 238605,
                cover: "https://api.nomercy.tv/cors?url=https://freemusicarchive.org/img/default/artist.jpg",
                album_track: [
                    {
                        name: "-",
                        url: "https://freemusicarchive.org/music/grumplefunk/singles"
                    }
                ],
                artist_track: [
                    {
                        name: "Grumplefunk",
                        url: "https://freemusicarchive.org/music/grumplefunk/"
                    }
                ],
                name: "Dungeon Creeper",
                path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/i5hAH3LHaHq8ehfXUhjJH0XT4IHG6K8KplDJPQ09.mp3"
            },
            {
                id: 238603,
                cover: "https://api.nomercy.tv/cors?url=https://freemusicarchive.org/img/default/artist.jpg",
                album_track: [
                    {
                        name: "-",
                        url: "https://freemusicarchive.org/music/grumplefunk/singles"
                    }
                ],
                artist_track: [
                    {
                        name: "Grumplefunk",
                        url: "https://freemusicarchive.org/music/grumplefunk/"
                    }
                ],
                name: "Far Gone",
                path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/kM92Jp2OD5ryz1zaxLmQhcFqEgNB1KbtWrBwa0dD.mp3"
            },
            {
                id: 239733,
                cover: "https://api.nomercy.tv/cors?url=https://freemusicarchive.org/img/default/artist.jpg",
                album_track: [
                    {
                        name: "-",
                        url: "https://freemusicarchive.org/music/grumplefunk/singles"
                    }
                ],
                artist_track: [
                    {
                        name: "Grumplefunk",
                        url: "https://freemusicarchive.org/music/grumplefunk/"
                    }
                ],
                name: "Kitty Flip",
                path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/7kpHVD9w0423WGxzenCyaQiVOTxg4jNOqXHm9DKg.mp3"
            },
            {
                id: 244324,
                cover: "https://api.nomercy.tv/cors?url=https://freemusicarchive.org/img/default/artist.jpg",
                album_track: [
                    {
                        name: "-",
                        url: "https://freemusicarchive.org/music/grumplefunk/singles"
                    }
                ],
                artist_track: [
                    {
                        name: "Grumplefunk",
                        url: "https://freemusicarchive.org/music/grumplefunk/"
                    }
                ],
                name: "On Board",
                path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/G86eOf4ONw0Rg6r0IGnu7gcJ8XPSmsC32CwaVYnM.mp3"
            },
            {
                id: 238602,
                cover: "https://api.nomercy.tv/cors?url=https://freemusicarchive.org/img/default/artist.jpg",
                album_track: [
                    {
                        name: "-",
                        url: "https://freemusicarchive.org/music/grumplefunk/singles"
                    }
                ],
                artist_track: [
                    {
                        name: "Grumplefunk",
                        url: "https://freemusicarchive.org/music/grumplefunk/"
                    }
                ],
                name: "Park in a Walk",
                path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/bGRXnJYp5hs2DYayjj6vWHcNWkNFPYop7P8eDd6t.mp3"
            },
            {
                id: 239734,
                cover: "https://api.nomercy.tv/cors?url=https://freemusicarchive.org/img/default/artist.jpg",
                album_track: [
                    {
                        name: "-",
                        url: "https://freemusicarchive.org/music/grumplefunk/singles"
                    }
                ],
                artist_track: [
                    {
                        name: "Grumplefunk",
                        url: "https://freemusicarchive.org/music/grumplefunk/"
                    }
                ],
                name: "Patience",
                path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/CvWRxexR324rdbZMupHfGE6C6GaQszKoISALYqAO.mp3"
            },
            {
                id: 239732,
                cover: "https://api.nomercy.tv/cors?url=https://freemusicarchive.org/img/default/artist.jpg",
                album_track: [
                    {
                        name: "-",
                        url: "https://freemusicarchive.org/music/grumplefunk/singles"
                    }
                ],
                artist_track: [
                    {
                        name: "Grumplefunk",
                        url: "https://freemusicarchive.org/music/grumplefunk/"
                    }
                ],
                name: "Pressurized",
                path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/OitOVNVtyHb1OVT0OUeN5yt90fmTcJc0eRCMQ6ZR.mp3"
            },
            {
                id: 239735,
                cover: "https://api.nomercy.tv/cors?url=https://freemusicarchive.org/img/default/artist.jpg",
                album_track: [
                    {
                        name: "-",
                        url: "https://freemusicarchive.org/music/grumplefunk/singles"
                    }
                ],
                artist_track: [
                    {
                        name: "Grumplefunk",
                        url: "https://freemusicarchive.org/music/grumplefunk/"
                    }
                ],
                name: "Pushing It",
                path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/xJkb301RNSQZncBzk6R1yLyYJGPuYJQqBL1FILF4.mp3"
            },
            {
                id: 238604,
                cover: "https://api.nomercy.tv/cors?url=https://freemusicarchive.org/img/default/artist.jpg",
                album_track: [
                    {
                        name: "-",
                        url: "https://freemusicarchive.org/music/grumplefunk/singles"
                    }
                ],
                artist_track: [
                    {
                        name: "Grumplefunk",
                        url: "https://freemusicarchive.org/music/grumplefunk/"
                    }
                ],
                name: "Snake Parade",
                path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/8ctdL6YL8tR7U5c2i8eaBompiLU1AZeiJJAvMug9.mp3"
            },
            {
                id: 239728,
                cover: "https://api.nomercy.tv/cors?url=https://freemusicarchive.org/img/default/artist.jpg",
                album_track: [
                    {
                        name: "-",
                        url: "https://freemusicarchive.org/music/grumplefunk/singles"
                    }
                ],
                artist_track: [
                    {
                        name: "Grumplefunk",
                        url: "https://freemusicarchive.org/music/grumplefunk/"
                    }
                ],
                name: "Storm Chase",
                path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/FoTE62VEFDCdyG1wxjGkBOBfPZMqsmoYjVYzyQnT.mp3"
            },
            {
                id: 244810,
                cover: "https://api.nomercy.tv/cors?url=https://freemusicarchive.org/img/default/artist.jpg",
                album_track: [
                    {
                        name: "-",
                        url: "https://freemusicarchive.org/music/grumplefunk/singles"
                    }
                ],
                artist_track: [
                    {
                        name: "Grumplefunk",
                        url: "https://freemusicarchive.org/music/grumplefunk/"
                    }
                ],
                name: "Valley of Debt",
                path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/KmH8RY7mHAjgm78QaLCzQmRameiNlbSqBK8chdms.mp3"
            },
            {
                id: 242610,
                cover: "https://api.nomercy.tv/cors?url=https://freemusicarchive.org/img/default/artist.jpg",
                album_track: [
                    {
                        name: "-",
                        url: "https://freemusicarchive.org/music/grumplefunk/singles"
                    }
                ],
                artist_track: [
                    {
                        name: "Grumplefunk",
                        url: "https://freemusicarchive.org/music/grumplefunk/"
                    }
                ],
                name: "Waggish",
                path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/ob6gCw0oN0B8z3OVMGmWV1nDYgrg53NzG0xCNrUD.mp3"
            },
            {
                id: 239730,
                cover: "https://api.nomercy.tv/cors?url=https://freemusicarchive.org/img/default/artist.jpg",
                album_track: [
                    {
                        name: "-",
                        url: "https://freemusicarchive.org/music/grumplefunk/singles"
                    }
                ],
                artist_track: [
                    {
                        name: "Grumplefunk",
                        url: "https://freemusicarchive.org/music/grumplefunk/"
                    }
                ],
                name: "Water",
                path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/SDO7c8lbgr5nK6As1XSt6rg4tlNPLXXLlMbrl9CM.mp3"
            }
        ]
    },
    {
        name: 'KJC',
        cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org//album_image%2FgZt6aTYfjcAqp2CKZASY3BXjvtfvxRykspd9pCRk.jpg',
        artist: 'Derek Clegg',
        tracks: [
            {
                id: 236749,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org//album_image%2FgZt6aTYfjcAqp2CKZASY3BXjvtfvxRykspd9pCRk.jpg',
                album_track: [
                    {
                        name: 'KJC',
                        url: 'https://freemusicarchive.org/music/Derek_Clegg/kjc'
                    }
                ],
                artist_track: [
                    {
                        name: 'Derek Clegg',
                        url: 'https://freemusicarchive.org/music/Derek_Clegg/'
                    }
                ],
                name: 'Thaw You Out',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/NymH6FhDuUw7dbHWMt2o0nTMUCwRScApTLHTlhBl.mp3'
            },
            {
                id: 236748,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org//album_image%2FgZt6aTYfjcAqp2CKZASY3BXjvtfvxRykspd9pCRk.jpg',
                album_track: [
                    {
                        name: 'KJC',
                        url: 'https://freemusicarchive.org/music/Derek_Clegg/kjc'
                    }
                ],
                artist_track: [
                    {
                        name: 'Derek Clegg',
                        url: 'https://freemusicarchive.org/music/Derek_Clegg/'
                    }
                ],
                name: 'Hope',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/pbsz7VtrVWPFFb8cTuV4dPfO4bKH6aYPbVyfMVXq.mp3'
            },
            {
                id: 236750,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org//album_image%2FgZt6aTYfjcAqp2CKZASY3BXjvtfvxRykspd9pCRk.jpg',
                album_track: [
                    {
                        name: 'KJC',
                        url: 'https://freemusicarchive.org/music/Derek_Clegg/kjc'
                    }
                ],
                artist_track: [
                    {
                        name: 'Derek Clegg',
                        url: 'https://freemusicarchive.org/music/Derek_Clegg/'
                    }
                ],
                name: 'The Good Die Young',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/Rsgn7UIB3HUWTG8YRkWIsPsSRaAC02Oh66bFLnWt.mp3'
            },
            {
                id: 236751,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org//album_image%2FgZt6aTYfjcAqp2CKZASY3BXjvtfvxRykspd9pCRk.jpg',
                album_track: [
                    {
                        name: 'KJC',
                        url: 'https://freemusicarchive.org/music/Derek_Clegg/kjc'
                    }
                ],
                artist_track: [
                    {
                        name: 'Derek Clegg',
                        url: 'https://freemusicarchive.org/music/Derek_Clegg/'
                    }
                ],
                name: 'Home',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/BhMNw3y2bBmYz8tsPvs6NkDTheTxAPi5eSaoBysm.mp3'
            },
            {
                id: 236752,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org//album_image%2FgZt6aTYfjcAqp2CKZASY3BXjvtfvxRykspd9pCRk.jpg',
                album_track: [
                    {
                        name: 'KJC',
                        url: 'https://freemusicarchive.org/music/Derek_Clegg/kjc'
                    }
                ],
                artist_track: [
                    {
                        name: 'Derek Clegg',
                        url: 'https://freemusicarchive.org/music/Derek_Clegg/'
                    }
                ],
                name: 'Friends',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/XzIlIhDRM1z77GY8kOZTuykJIsXnjZsKWPYUlHSH.mp3'
            },
            {
                id: 236753,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org//album_image%2FgZt6aTYfjcAqp2CKZASY3BXjvtfvxRykspd9pCRk.jpg',
                album_track: [
                    {
                        name: 'KJC',
                        url: 'https://freemusicarchive.org/music/Derek_Clegg/kjc'
                    }
                ],
                artist_track: [
                    {
                        name: 'Derek Clegg',
                        url: 'https://freemusicarchive.org/music/Derek_Clegg/'
                    }
                ],
                name: 'Quirky Little Love Song',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/AZYO9lDPnCnXJ1P0jLErSvAh95CgH1GXb4V2nGzx.mp3'
            },
            {
                id: 236754,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org//album_image%2FgZt6aTYfjcAqp2CKZASY3BXjvtfvxRykspd9pCRk.jpg',
                album_track: [
                    {
                        name: 'KJC',
                        url: 'https://freemusicarchive.org/music/Derek_Clegg/kjc'
                    }
                ],
                artist_track: [
                    {
                        name: 'Derek Clegg',
                        url: 'https://freemusicarchive.org/music/Derek_Clegg/'
                    }
                ],
                name: 'Honest',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/5MCnpFqDIJ1v5Eh8mcwkUQ9dZIyg99CxgJXfZKlt.mp3'
            },
            {
                id: 236755,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org//album_image%2FgZt6aTYfjcAqp2CKZASY3BXjvtfvxRykspd9pCRk.jpg',
                album_track: [
                    {
                        name: 'KJC',
                        url: 'https://freemusicarchive.org/music/Derek_Clegg/kjc'
                    }
                ],
                artist_track: [
                    {
                        name: 'Derek Clegg',
                        url: 'https://freemusicarchive.org/music/Derek_Clegg/'
                    }
                ],
                name: 'Our Old Place',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/17ZCXPaquW6xbNuQOf42Uhq4zvlO516BcMw0bL2D.mp3'
            },
            {
                id: 236756,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org//album_image%2FgZt6aTYfjcAqp2CKZASY3BXjvtfvxRykspd9pCRk.jpg',
                album_track: [
                    {
                        name: 'KJC',
                        url: 'https://freemusicarchive.org/music/Derek_Clegg/kjc'
                    }
                ],
                artist_track: [
                    {
                        name: 'Derek Clegg',
                        url: 'https://freemusicarchive.org/music/Derek_Clegg/'
                    }
                ],
                name: 'Found',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/EU6zLdlUM3EVo8Mk4ingI2koW1Vz1xDLwzjc1f09.mp3'
            },
            {
                id: 236757,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org//album_image%2FgZt6aTYfjcAqp2CKZASY3BXjvtfvxRykspd9pCRk.jpg',
                album_track: [
                    {
                        name: 'KJC',
                        url: 'https://freemusicarchive.org/music/Derek_Clegg/kjc'
                    }
                ],
                artist_track: [
                    {
                        name: 'Derek Clegg',
                        url: 'https://freemusicarchive.org/music/Derek_Clegg/'
                    }
                ],
                name: 'Adore',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/dYZmQIMuRB1LdSaVUW95AvWTu6XoWmYJ5FPDjroJ.mp3'
            },
            {
                id: 236758,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org//album_image%2FgZt6aTYfjcAqp2CKZASY3BXjvtfvxRykspd9pCRk.jpg',
                album_track: [
                    {
                        name: 'KJC',
                        url: 'https://freemusicarchive.org/music/Derek_Clegg/kjc'
                    }
                ],
                artist_track: [
                    {
                        name: 'Derek Clegg',
                        url: 'https://freemusicarchive.org/music/Derek_Clegg/'
                    }
                ],
                name: 'Cannot Change',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/sMIxTOwOmnk8eYcpf60IDYKwSUy1s9TfigdXtZJn.mp3'
            },
            {
                id: 236759,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org//album_image%2FgZt6aTYfjcAqp2CKZASY3BXjvtfvxRykspd9pCRk.jpg',
                album_track: [
                    {
                        name: 'KJC',
                        url: 'https://freemusicarchive.org/music/Derek_Clegg/kjc'
                    }
                ],
                artist_track: [
                    {
                        name: 'Derek Clegg',
                        url: 'https://freemusicarchive.org/music/Derek_Clegg/'
                    }
                ],
                name: 'KJC',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/072ez0G0XxehOsBnjHTq1Ko7l3X1TKK6VLjJaj8y.mp3'
            },
        ],
    },
    {
        name: 'CC BY: FREE TO USE FOR ANYTHING',
        cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
        artist: 'Ketsa',
        tracks: [
            {
                id: 244544,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'Where Dreams Drift',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/hV3133slq4ks5GtkP9h3oHtI7VzvJaLHH5iMPMRl.mp3'
            },
            {
                id: 244540,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'Saviour Above',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/7JKoDXj27vmERlpJHAJ6sf6JYOVthcOxWiLKSs4k.mp3'
            },
            {
                id: 244546,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'Night Flow Day Grow',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/pTiSef01xUYvXOC3NIGAhtnrUbfCVlaxovnb95aK.mp3'
            },
            {
                id: 244794,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'The Road',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/HKJvtb8m2mwZbYi0MMoQKBRxUoDHnfuWiji3LXKY.mp3'
            },
            {
                id: 243404,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'Surroundings are Green',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/TieL2faUiJsfxRFFjiLZrRiwQtSw5hj2SzetFiq1.mp3'
            },
            {
                id: 243018,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'Soul Sync',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/x6ZAunZSf2YH8cR9s7IyIqwIsVNzTufg5L8NCyPs.mp3'
            },
            {
                id: 243825,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'Always Faithful',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/eVBAhEIYEYxRq4JzkIs7087QQD1et64YBbJBRO1f.mp3'
            },
            {
                id: 243387,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'Importance',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/2asRXm6Mt6ilsVKE3UFS4Cn1mWYgTBYcnPSTNMsd.mp3'
            },
            {
                id: 243942,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'Good Feel',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/yMvwBOezvkuvD1f53gma7vKa1GXaQ4swxyvHvJyH.mp3'
            },
            {
                id: 244328,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'Too Late',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/PvU1HMQob9KR42gH98n7Os7HCshrgqx3RAN9E459.mp3'
            },
            {
                id: 243949,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'Longer Wait',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/RzMlfED9PxsVMTa9csKtQptlJFDIYKxXtRa21BLG.mp3'
            },
            {
                id: 244585,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'Tide Turns',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/7YLIpqnoE0NRWWVnFhRegGUcRNR3g1dFQqvBqX49.mp3'
            },
            {
                id: 244862,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'Soul Trap',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/H9CpTealn3rwNSWZYhbjoCjdCUcpeQGS8ExW3rLn.mp3'
            },
            {
                id: 242364,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'What It Feels Like',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/v7hcBXVuPbM1GAMpdRbEl2mVZAFI5P2o4ELisbxu.mp3'
            },
            {
                id: 243785,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'Doobie',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/8R8MhqmCUrhdSZ2xqNlxOySjiCGy0aUnqqtZeaGF.mp3'
            },
            {
                id: 244881,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'Trench Work',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/DvcdtZivqRWnYi3fvnNgGmJ0qhr4RQMK4Fmwsc23.mp3'
            },
            {
                id: 243991,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'Inside Dead',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/F5LtvvsWcNZvWZICgZmR2aTz5kh7NDZJyn18VX0w.mp3'
            },
            {
                id: 242378,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'Here For You',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/yRAeNgm226t5BnDDkGRaZ11cUZlG5U9amo21xBqt.mp3'
            },
            {
                id: 243513,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'My Deal',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/nZSpOT2kAfoEV5PYjpqQpLjXnevw1a9mHq40TPoU.mp3'
            },
            {
                id: 243468,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'Ten out of Ten',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/JpE7zv82NDnRqTSIm7DpcMDrVtnYZ5RF7N8oPgPt.mp3'
            },
            {
                id: 244385,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'Still Dreams',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/bc25XqmTgdFk7tZcjh3zDOFBYtHwvzXsHvCOJiLt.mp3'
            },
            {
                id: 242379,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'Rockets',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/1MqouG8WFNzngLViIKD1maYZ2uiYCO8ZUiBqm9dA.mp3'
            },
            {
                id: 244338,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'Around the Corner',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/Z8Ukyx9gEau9sfRS9ZsnwFDz8cgpScUGykHTIWdT.mp3'
            },
            {
                id: 244213,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'A Little Faith',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/tpFJuJhwDqmQFEddKas69HlzsssOennAuR1t3v4V.mp3'
            },
            {
                id: 243262,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'Bright State',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/I8cDAscRZsoDLgMg5ZGQPE5IWrdCo3Zn8MjzNxEp.mp3'
            },
            {
                id: 244629,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'Off Days',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/3T2DAgSlHUcsbavs7eN0KNgdOlvM6psn3GSyI5Ao.mp3'
            },
            {
                id: 244998,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'The Road 2',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/EPrcOWLzdjeqKoZH9jt5s4UUMmPvUnAuj59hmhX0.mp3'
            },
            {
                id: 242361,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'New Starts Beat',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/OoraBwbMbjoBlwP9m2rtgtMlAji6Rf42GpwK28G8.mp3'
            },
            {
                id: 244031,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'Funk Trunk',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/KbSJhLvTG1GrS00RjkzZwIdLXssNmBkRfQP9hNj5.mp3'
            },
            {
                id: 244412,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'See Us',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/db12CdcqTbbX60cbeKblXxc9LiIGtgrcfu796liY.mp3'
            },
            {
                id: 244195,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'Her Memory Fading',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/7f33xw5VH4tJxHkuE3ee1bXUXppWltSFOkiFYojB.mp3'
            },
            {
                id: 243576,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'Jazz For The Soul',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/MWitdL9TTSkSkqlNeCXfAvJGgBX31uMvc0ACqvAU.mp3'
            },
            {
                id: 244750,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'Vision 2',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/GqfQZSgmDH8roos6sLxumB13Lz4WUDJPUqiBjKAj.mp3'
            },
            {
                id: 244111,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'Too Fly',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/DuMCQ7geQ4We0bI0HrMYdHDmgAuyWWDEKnd1dsK1.mp3'
            },
            {
                id: 242526,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'Drifting Space Jazz',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/YCAvNbAH9LfYV31nz3WhPOviv0SkFxJ9cKUjR9p7.mp3'
            },
            {
                id: 243343,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'Soul Syrup',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/Zs6XS76QBAMQFfaMEWBCNNEegFV3VrIlXLciu8gm.mp3'
            },
            {
                id: 242615,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'Turning Up',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/s1HK4UXtE9EbCeKTC1B0cKsQXtzcNMzeQ4aNqN7w.mp3'
            },
            {
                id: 244739,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FdRXohJqzrgGlRpDdgjtHBX8Ksrl5f9ZOU7el1Ve1.jpg',
                album_track: [
                    {
                        name: 'CC BY: FREE TO USE FOR ANYTHING',
                        url: 'https://freemusicarchive.org/music/Ketsa/cc-by-free-to-use-for-anything'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ketsa',
                        url: 'https://freemusicarchive.org/music/Ketsa/'
                    }
                ],
                name: 'Vision',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/3v9wGLz5O0T07aS6fhvLGcdhLih9ixI7H1fnMg4q.mp3'
            },
        ],
    },
    {
        name: 'Kerplunk',
        cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWEkGyMZBKh7n5eHbyoEFkCGMmdMzX35kSzdx0mI8.jpg',
        artist: 'Mr Smith',
        tracks: [
            {
                id: 243025,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWEkGyMZBKh7n5eHbyoEFkCGMmdMzX35kSzdx0mI8.jpg',
                album_track: [
                    {
                        name: 'Kerplunk',
                        url: 'https://freemusicarchive.org/music/mr-smith/kerplunk'
                    }
                ],
                artist_track: [
                    {
                        name: 'Mr Smith',
                        url: 'https://freemusicarchive.org/music/mr-smith/'
                    }
                ],
                name: 'Chang One',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/MSTuPOWy29PhxYPOcSsKpNgjn4ZQBhxXKAfSis6g.mp3'
            },
            {
                id: 239935,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWEkGyMZBKh7n5eHbyoEFkCGMmdMzX35kSzdx0mI8.jpg',
                album_track: [
                    {
                        name: 'Kerplunk',
                        url: 'https://freemusicarchive.org/music/mr-smith/kerplunk'
                    }
                ],
                artist_track: [
                    {
                        name: 'Mr Smith',
                        url: 'https://freemusicarchive.org/music/mr-smith/'
                    }
                ],
                name: 'Sherpa Foot',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/GC7musOwqYJxcay6wkqupNycemuHtGsdc3t4rW43.mp3'
            },
            {
                id: 241117,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWEkGyMZBKh7n5eHbyoEFkCGMmdMzX35kSzdx0mI8.jpg',
                album_track: [
                    {
                        name: 'Kerplunk',
                        url: 'https://freemusicarchive.org/music/mr-smith/kerplunk'
                    }
                ],
                artist_track: [
                    {
                        name: 'Mr Smith',
                        url: 'https://freemusicarchive.org/music/mr-smith/'
                    }
                ],
                name: 'Ridgeway Drive',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/7aMALsRGkIBUS8WyXOsA78r3VTiiiCCpe7z8Se9W.mp3'
            },
            {
                id: 240049,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWEkGyMZBKh7n5eHbyoEFkCGMmdMzX35kSzdx0mI8.jpg',
                album_track: [
                    {
                        name: 'Kerplunk',
                        url: 'https://freemusicarchive.org/music/mr-smith/kerplunk'
                    }
                ],
                artist_track: [
                    {
                        name: 'Mr Smith',
                        url: 'https://freemusicarchive.org/music/mr-smith/'
                    }
                ],
                name: 'Da Fixx',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/QgDecQLH4QCZt5r5CjtQU1G1GuiyquEK5CjTLvPZ.mp3'
            },
            {
                id: 241891,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWEkGyMZBKh7n5eHbyoEFkCGMmdMzX35kSzdx0mI8.jpg',
                album_track: [
                    {
                        name: 'Kerplunk',
                        url: 'https://freemusicarchive.org/music/mr-smith/kerplunk'
                    }
                ],
                artist_track: [
                    {
                        name: 'Mr Smith',
                        url: 'https://freemusicarchive.org/music/mr-smith/'
                    }
                ],
                name: 'Ricochet',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/GMN3z0HrQlhqMfXiuHBSicsXNIlGhOOhhZAy1pUx.mp3'
            },
            {
                id: 239959,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWEkGyMZBKh7n5eHbyoEFkCGMmdMzX35kSzdx0mI8.jpg',
                album_track: [
                    {
                        name: 'Kerplunk',
                        url: 'https://freemusicarchive.org/music/mr-smith/kerplunk'
                    }
                ],
                artist_track: [
                    {
                        name: 'Mr Smith',
                        url: 'https://freemusicarchive.org/music/mr-smith/'
                    }
                ],
                name: 'Kerplunk',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/arg2sAnVPo0QqQgCXkPRiF3SFitRuNeVsmMcvNu7.mp3'
            },
            {
                id: 244576,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWEkGyMZBKh7n5eHbyoEFkCGMmdMzX35kSzdx0mI8.jpg',
                album_track: [
                    {
                        name: 'Kerplunk',
                        url: 'https://freemusicarchive.org/music/mr-smith/kerplunk'
                    }
                ],
                artist_track: [
                    {
                        name: 'Mr Smith',
                        url: 'https://freemusicarchive.org/music/mr-smith/'
                    }
                ],
                name: 'Bulletproof',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/tFjx5SAtiXxCVV8SB55xcq40580dkVoZFCP4xz0E.mp3'
            },
            {
                id: 240770,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWEkGyMZBKh7n5eHbyoEFkCGMmdMzX35kSzdx0mI8.jpg',
                album_track: [
                    {
                        name: 'Kerplunk',
                        url: 'https://freemusicarchive.org/music/mr-smith/kerplunk'
                    }
                ],
                artist_track: [
                    {
                        name: 'Mr Smith',
                        url: 'https://freemusicarchive.org/music/mr-smith/'
                    }
                ],
                name: 'Satellite',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/QlIuRYW04a5puhB9rv7ew0iQyYermB9IB7eP0MOD.mp3'
            },
            {
                id: 241915,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWEkGyMZBKh7n5eHbyoEFkCGMmdMzX35kSzdx0mI8.jpg',
                album_track: [
                    {
                        name: 'Kerplunk',
                        url: 'https://freemusicarchive.org/music/mr-smith/kerplunk'
                    }
                ],
                artist_track: [
                    {
                        name: 'Mr Smith',
                        url: 'https://freemusicarchive.org/music/mr-smith/'
                    }
                ],
                name: 'So What',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/YzAjaj7e2VlYkgE5NijwCPlt6erczUSZp2asxaYe.mp3'
            },
            {
                id: 240833,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWEkGyMZBKh7n5eHbyoEFkCGMmdMzX35kSzdx0mI8.jpg',
                album_track: [
                    {
                        name: 'Kerplunk',
                        url: 'https://freemusicarchive.org/music/mr-smith/kerplunk'
                    }
                ],
                artist_track: [
                    {
                        name: 'Mr Smith',
                        url: 'https://freemusicarchive.org/music/mr-smith/'
                    }
                ],
                name: 'Fredsong',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/2jE4yLZWsMVQTnMRaqnJK7Oi16QynoDanq2AqHg4.mp3'
            },
            {
                id: 240503,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWEkGyMZBKh7n5eHbyoEFkCGMmdMzX35kSzdx0mI8.jpg',
                album_track: [
                    {
                        name: 'Kerplunk',
                        url: 'https://freemusicarchive.org/music/mr-smith/kerplunk'
                    }
                ],
                artist_track: [
                    {
                        name: 'Mr Smith',
                        url: 'https://freemusicarchive.org/music/mr-smith/'
                    }
                ],
                name: 'Down Time',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/Mvv1WBg66AU8qvBqGmADuGZ83zXKHmTPLvtLKoi5.mp3'
            },
            {
                id: 243043,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWEkGyMZBKh7n5eHbyoEFkCGMmdMzX35kSzdx0mI8.jpg',
                album_track: [
                    {
                        name: 'Kerplunk',
                        url: 'https://freemusicarchive.org/music/mr-smith/kerplunk'
                    }
                ],
                artist_track: [
                    {
                        name: 'Mr Smith',
                        url: 'https://freemusicarchive.org/music/mr-smith/'
                    }
                ],
                name: 'So Serious',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/QHTyLQhOVxuMWdAtW781IcqPQ30d64B6cwWOBAgR.mp3'
            },
            {
                id: 244607,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWEkGyMZBKh7n5eHbyoEFkCGMmdMzX35kSzdx0mI8.jpg',
                album_track: [
                    {
                        name: 'Kerplunk',
                        url: 'https://freemusicarchive.org/music/mr-smith/kerplunk'
                    }
                ],
                artist_track: [
                    {
                        name: 'Mr Smith',
                        url: 'https://freemusicarchive.org/music/mr-smith/'
                    }
                ],
                name: 'Dirty Honey',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/2VcTF407cWJgD8VYjbbst63sNxLZdtiORLbbA03V.mp3'
            },
            {
                id: 243861,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWEkGyMZBKh7n5eHbyoEFkCGMmdMzX35kSzdx0mI8.jpg',
                album_track: [
                    {
                        name: 'Kerplunk',
                        url: 'https://freemusicarchive.org/music/mr-smith/kerplunk'
                    }
                ],
                artist_track: [
                    {
                        name: 'Mr Smith',
                        url: 'https://freemusicarchive.org/music/mr-smith/'
                    }
                ],
                name: 'The Wire',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/Xux6yISFZCjYGRxswgCU5Y8za7tclawUCgtRlmtk.mp3'
            },
            {
                id: 243228,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWEkGyMZBKh7n5eHbyoEFkCGMmdMzX35kSzdx0mI8.jpg',
                album_track: [
                    {
                        name: 'Kerplunk',
                        url: 'https://freemusicarchive.org/music/mr-smith/kerplunk'
                    }
                ],
                artist_track: [
                    {
                        name: 'Mr Smith',
                        url: 'https://freemusicarchive.org/music/mr-smith/'
                    }
                ],
                name: 'Dark and Early',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/wM69MVdav8rsLUKoBi6UETF5REGv75PENMU2CNgg.mp3'
            },
            {
                id: 243519,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWEkGyMZBKh7n5eHbyoEFkCGMmdMzX35kSzdx0mI8.jpg',
                album_track: [
                    {
                        name: 'Kerplunk',
                        url: 'https://freemusicarchive.org/music/mr-smith/kerplunk'
                    }
                ],
                artist_track: [
                    {
                        name: 'Mr Smith',
                        url: 'https://freemusicarchive.org/music/mr-smith/'
                    }
                ],
                name: 'Fast Horse',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/CBd1Og6nWw5Lf105SFehL730istc1lGhvsDtGHlW.mp3'
            },
            {
                id: 243558,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWEkGyMZBKh7n5eHbyoEFkCGMmdMzX35kSzdx0mI8.jpg',
                album_track: [
                    {
                        name: 'Kerplunk',
                        url: 'https://freemusicarchive.org/music/mr-smith/kerplunk'
                    }
                ],
                artist_track: [
                    {
                        name: 'Mr Smith',
                        url: 'https://freemusicarchive.org/music/mr-smith/'
                    }
                ],
                name: 'Sneaking Around',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/vhyBXOmS8kTy1ux9Kbg98FHP06KShCSXGp4Xx8wA.mp3'
            },
            {
                id: 240045,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWEkGyMZBKh7n5eHbyoEFkCGMmdMzX35kSzdx0mI8.jpg',
                album_track: [
                    {
                        name: 'Kerplunk',
                        url: 'https://freemusicarchive.org/music/mr-smith/kerplunk'
                    }
                ],
                artist_track: [
                    {
                        name: 'Mr Smith',
                        url: 'https://freemusicarchive.org/music/mr-smith/'
                    }
                ],
                name: 'Vegas Baby',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/ZIP3xvYW7bfY1RHDU7tZAs7WJZVHYkrr1jkd0q1y.mp3'
            },
            {
                id: 244402,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWEkGyMZBKh7n5eHbyoEFkCGMmdMzX35kSzdx0mI8.jpg',
                album_track: [
                    {
                        name: 'Kerplunk',
                        url: 'https://freemusicarchive.org/music/mr-smith/kerplunk'
                    }
                ],
                artist_track: [
                    {
                        name: 'Mr Smith',
                        url: 'https://freemusicarchive.org/music/mr-smith/'
                    }
                ],
                name: 'Slo Bop',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/lar6GN7A7IEwKmHyosCZC5hk6jfILe01pvdBHyFm.mp3'
            },
            {
                id: 242216,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWEkGyMZBKh7n5eHbyoEFkCGMmdMzX35kSzdx0mI8.jpg',
                album_track: [
                    {
                        name: 'Kerplunk',
                        url: 'https://freemusicarchive.org/music/mr-smith/kerplunk'
                    }
                ],
                artist_track: [
                    {
                        name: 'Mr Smith',
                        url: 'https://freemusicarchive.org/music/mr-smith/'
                    }
                ],
                name: 'Patience Pt 1',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/sY0hd2kMguVtC9q0mc3qb9AwA52NTDbPXLFJEZwv.mp3'
            },
            {
                id: 240275,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWEkGyMZBKh7n5eHbyoEFkCGMmdMzX35kSzdx0mI8.jpg',
                album_track: [
                    {
                        name: 'Kerplunk',
                        url: 'https://freemusicarchive.org/music/mr-smith/kerplunk'
                    }
                ],
                artist_track: [
                    {
                        name: 'Mr Smith',
                        url: 'https://freemusicarchive.org/music/mr-smith/'
                    }
                ],
                name: 'Juno',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/zJERdWyXjVkVDUoJDkzl81BUeQ8a1MqgqXhlO4gM.mp3'
            },
            {
                id: 240254,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWEkGyMZBKh7n5eHbyoEFkCGMmdMzX35kSzdx0mI8.jpg',
                album_track: [
                    {
                        name: 'Kerplunk',
                        url: 'https://freemusicarchive.org/music/mr-smith/kerplunk'
                    }
                ],
                artist_track: [
                    {
                        name: 'Mr Smith',
                        url: 'https://freemusicarchive.org/music/mr-smith/'
                    }
                ],
                name: 'Mustang',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/uBUvh4cTTamErYYSPYMXTUhAWwvo4UlJtvhXKkci.mp3'
            },
            {
                id: 243280,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWEkGyMZBKh7n5eHbyoEFkCGMmdMzX35kSzdx0mI8.jpg',
                album_track: [
                    {
                        name: 'Kerplunk',
                        url: 'https://freemusicarchive.org/music/mr-smith/kerplunk'
                    }
                ],
                artist_track: [
                    {
                        name: 'Mr Smith',
                        url: 'https://freemusicarchive.org/music/mr-smith/'
                    }
                ],
                name: 'Patience Pt 2',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/dmuIvoZVuf2USVgsexTwxywTp2NW2Biq8S3UfJCZ.mp3'
            },
            {
                id: 244770,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWEkGyMZBKh7n5eHbyoEFkCGMmdMzX35kSzdx0mI8.jpg',
                album_track: [
                    {
                        name: 'Kerplunk',
                        url: 'https://freemusicarchive.org/music/mr-smith/kerplunk'
                    }
                ],
                artist_track: [
                    {
                        name: 'Mr Smith',
                        url: 'https://freemusicarchive.org/music/mr-smith/'
                    }
                ],
                name: 'Black Letter',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/J7hjFIY7FtMaEoVxvXFiVrJDU4IH32qiuGPsGuoY.mp3'
            },
            {
                id: 244134,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWEkGyMZBKh7n5eHbyoEFkCGMmdMzX35kSzdx0mI8.jpg',
                album_track: [
                    {
                        name: 'Kerplunk',
                        url: 'https://freemusicarchive.org/music/mr-smith/kerplunk'
                    }
                ],
                artist_track: [
                    {
                        name: 'Mr Smith',
                        url: 'https://freemusicarchive.org/music/mr-smith/'
                    }
                ],
                name: 'Drift',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/INDyNmWVNyyFsXTadHezhMxVxtIEwe8OJBrIFLp8.mp3'
            },
            {
                id: 243346,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWEkGyMZBKh7n5eHbyoEFkCGMmdMzX35kSzdx0mI8.jpg',
                album_track: [
                    {
                        name: 'Kerplunk',
                        url: 'https://freemusicarchive.org/music/mr-smith/kerplunk'
                    }
                ],
                artist_track: [
                    {
                        name: 'Mr Smith',
                        url: 'https://freemusicarchive.org/music/mr-smith/'
                    }
                ],
                name: 'Pushed',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/3MBQ12aRNfcSAjD1dSlKYBPboTJ5JkCtLLOvgmsR.mp3'
            },
            {
                id: 242123,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWEkGyMZBKh7n5eHbyoEFkCGMmdMzX35kSzdx0mI8.jpg',
                album_track: [
                    {
                        name: 'Kerplunk',
                        url: 'https://freemusicarchive.org/music/mr-smith/kerplunk'
                    }
                ],
                artist_track: [
                    {
                        name: 'Mr Smith',
                        url: 'https://freemusicarchive.org/music/mr-smith/'
                    }
                ],
                name: 'Head Bop',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/YLc3d1V9BkEOoJdHAv7ZpvfhioVcy1QP0ZgmgCr6.mp3'
            },
            {
                id: 241076,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWEkGyMZBKh7n5eHbyoEFkCGMmdMzX35kSzdx0mI8.jpg',
                album_track: [
                    {
                        name: 'Kerplunk',
                        url: 'https://freemusicarchive.org/music/mr-smith/kerplunk'
                    }
                ],
                artist_track: [
                    {
                        name: 'Mr Smith',
                        url: 'https://freemusicarchive.org/music/mr-smith/'
                    }
                ],
                name: 'Stacked',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/emnDQu0jnv587lBhwQX7qqM8nRHukMJyyOeaecXT.mp3'
            },
        ],
    },
    {
        name: 'legacyAlli 2025',
        cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FF0mIpTwRMCmqpuMxdMOQ2sF3MMFDYOI6GP7dOhoO.jpg',
        artist: 'legacyAlli',
        tracks: [
            {
                id: 245018,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FF0mIpTwRMCmqpuMxdMOQ2sF3MMFDYOI6GP7dOhoO.jpg',
                album_track: [
                    {
                        name: 'legacyAlli 2025',
                        url: 'https://freemusicarchive.org/music/legacyalli/legacyalli-2025'
                    }
                ],
                artist_track: [
                    {
                        name: 'legacyAlli',
                        url: 'https://freemusicarchive.org/music/legacyalli/'
                    }
                ],
                name: 'Ricochet',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/5vYWp0Iiv8x70Eio7osgIA9VjxLcLrG0zCjPUCfo.mp3'
            },
            {
                id: 244080,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FF0mIpTwRMCmqpuMxdMOQ2sF3MMFDYOI6GP7dOhoO.jpg',
                album_track: [
                    {
                        name: 'legacyAlli 2025',
                        url: 'https://freemusicarchive.org/music/legacyalli/legacyalli-2025'
                    }
                ],
                artist_track: [
                    {
                        name: 'legacyAlli',
                        url: 'https://freemusicarchive.org/music/legacyalli/'
                    }
                ],
                name: 'Because It\'s Spring',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/nER68hnZcrRgH4HbyjRFb5Pdt0Kg4dIXmceg5zbd.mp3'
            },
            {
                id: 244079,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FF0mIpTwRMCmqpuMxdMOQ2sF3MMFDYOI6GP7dOhoO.jpg',
                album_track: [
                    {
                        name: 'legacyAlli 2025',
                        url: 'https://freemusicarchive.org/music/legacyalli/legacyalli-2025'
                    }
                ],
                artist_track: [
                    {
                        name: 'legacyAlli',
                        url: 'https://freemusicarchive.org/music/legacyalli/'
                    }
                ],
                name: 'It\'s Just Happening Too Fast',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/GpbJxfcgxcgYi3GPhIZzOHlXCTWLP8bWN8jbW0n5.mp3'
            },
            {
                id: 244752,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FF0mIpTwRMCmqpuMxdMOQ2sF3MMFDYOI6GP7dOhoO.jpg',
                album_track: [
                    {
                        name: 'legacyAlli 2025',
                        url: 'https://freemusicarchive.org/music/legacyalli/legacyalli-2025'
                    }
                ],
                artist_track: [
                    {
                        name: 'legacyAlli',
                        url: 'https://freemusicarchive.org/music/legacyalli/'
                    }
                ],
                name: 'It\'s Just Happening Too Fast 2',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/NZVm2Ll6fMa394zMiPhJpnSUxkBWEajc6ZAqEIde.mp3'
            },
            {
                id: 243488,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FF0mIpTwRMCmqpuMxdMOQ2sF3MMFDYOI6GP7dOhoO.jpg',
                album_track: [
                    {
                        name: 'legacyAlli 2025',
                        url: 'https://freemusicarchive.org/music/legacyalli/legacyalli-2025'
                    }
                ],
                artist_track: [
                    {
                        name: 'legacyAlli',
                        url: 'https://freemusicarchive.org/music/legacyalli/'
                    }
                ],
                name: 'Chanson Douce (Smooth Song)',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/g1FkMeKs0yog23U0MES3sDlNvVj3A8K4RHqhy81k.mp3'
            },
            {
                id: 244356,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FF0mIpTwRMCmqpuMxdMOQ2sF3MMFDYOI6GP7dOhoO.jpg',
                album_track: [
                    {
                        name: 'legacyAlli 2025',
                        url: 'https://freemusicarchive.org/music/legacyalli/legacyalli-2025'
                    }
                ],
                artist_track: [
                    {
                        name: 'legacyAlli',
                        url: 'https://freemusicarchive.org/music/legacyalli/'
                    }
                ],
                name: 'My Brain Is Rotting',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/ezJK6MWZLQ15lMHwspe7A1HqNdCW1uni4jO2Eonf.mp3'
            },
            {
                id: 242381,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FF0mIpTwRMCmqpuMxdMOQ2sF3MMFDYOI6GP7dOhoO.jpg',
                album_track: [
                    {
                        name: 'legacyAlli 2025',
                        url: 'https://freemusicarchive.org/music/legacyalli/legacyalli-2025'
                    }
                ],
                artist_track: [
                    {
                        name: 'legacyAlli',
                        url: 'https://freemusicarchive.org/music/legacyalli/'
                    }
                ],
                name: 'Interlude',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/3799LDk2rrOca2lN2Oj5Vszg7dOA330RnQoqjgze.mp3'
            },
            {
                id: 242078,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FF0mIpTwRMCmqpuMxdMOQ2sF3MMFDYOI6GP7dOhoO.jpg',
                album_track: [
                    {
                        name: 'legacyAlli 2025',
                        url: 'https://freemusicarchive.org/music/legacyalli/legacyalli-2025'
                    }
                ],
                artist_track: [
                    {
                        name: 'legacyAlli',
                        url: 'https://freemusicarchive.org/music/legacyalli/'
                    }
                ],
                name: 'Breezing',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/2fgmVZbKKHCnrlN9Jaa2nbOMyLPmw462stKLU8rY.mp3'
            },
            {
                id: 242079,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FF0mIpTwRMCmqpuMxdMOQ2sF3MMFDYOI6GP7dOhoO.jpg',
                album_track: [
                    {
                        name: 'legacyAlli 2025',
                        url: 'https://freemusicarchive.org/music/legacyalli/legacyalli-2025'
                    }
                ],
                artist_track: [
                    {
                        name: 'legacyAlli',
                        url: 'https://freemusicarchive.org/music/legacyalli/'
                    }
                ],
                name: 'Holding Hands',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/RMaEOL3fBcbVr1fzvqJRj6TgwMBVXOP7pKOHcZu0.mp3'
            },
            {
                id: 241736,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FF0mIpTwRMCmqpuMxdMOQ2sF3MMFDYOI6GP7dOhoO.jpg',
                album_track: [
                    {
                        name: 'legacyAlli 2025',
                        url: 'https://freemusicarchive.org/music/legacyalli/legacyalli-2025'
                    }
                ],
                artist_track: [
                    {
                        name: 'legacyAlli',
                        url: 'https://freemusicarchive.org/music/legacyalli/'
                    }
                ],
                name: 'You Don\'t Have To Go It Alone',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/MlrpnhyxYud3uz2J45zJ74HySY1P573pJiPjEMHI.mp3'
            },
            {
                id: 240383,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FF0mIpTwRMCmqpuMxdMOQ2sF3MMFDYOI6GP7dOhoO.jpg',
                album_track: [
                    {
                        name: 'legacyAlli 2025',
                        url: 'https://freemusicarchive.org/music/legacyalli/legacyalli-2025'
                    }
                ],
                artist_track: [
                    {
                        name: 'legacyAlli',
                        url: 'https://freemusicarchive.org/music/legacyalli/'
                    }
                ],
                name: 'Free Flowing',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/zH68pngAH7B0JTAY6eiiNCHdjbiOeTVIQZqzdRRr.mp3'
            },
            {
                id: 240184,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FF0mIpTwRMCmqpuMxdMOQ2sF3MMFDYOI6GP7dOhoO.jpg',
                album_track: [
                    {
                        name: 'legacyAlli 2025',
                        url: 'https://freemusicarchive.org/music/legacyalli/legacyalli-2025'
                    }
                ],
                artist_track: [
                    {
                        name: 'legacyAlli',
                        url: 'https://freemusicarchive.org/music/legacyalli/'
                    }
                ],
                name: 'Carlotta',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/rCdL2WoLFsJD6bVA5QkU0CAMA29qGxiElAPQg1YQ.mp3'
            },
            {
                id: 240039,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FF0mIpTwRMCmqpuMxdMOQ2sF3MMFDYOI6GP7dOhoO.jpg',
                album_track: [
                    {
                        name: 'legacyAlli 2025',
                        url: 'https://freemusicarchive.org/music/legacyalli/legacyalli-2025'
                    }
                ],
                artist_track: [
                    {
                        name: 'legacyAlli',
                        url: 'https://freemusicarchive.org/music/legacyalli/'
                    }
                ],
                name: 'Stealthy',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/rTFAUsVQWyckc3c2kSbJsWpt0L77jinumWXX7ROO.mp3'
            },
            {
                id: 239937,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FF0mIpTwRMCmqpuMxdMOQ2sF3MMFDYOI6GP7dOhoO.jpg',
                album_track: [
                    {
                        name: 'legacyAlli 2025',
                        url: 'https://freemusicarchive.org/music/legacyalli/legacyalli-2025'
                    }
                ],
                artist_track: [
                    {
                        name: 'legacyAlli',
                        url: 'https://freemusicarchive.org/music/legacyalli/'
                    }
                ],
                name: 'Interrogation Bond-Style',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/D729ZJxMseYfzTtmIlXsNGPPr264Ew0u5IEJxdwF.mp3'
            },
        ],
    },
    {
        name: 'If Only Life Was This Easy Volume 5: The Beat Misdirect',
        cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWhm9kCbUsWLPZyLh74JuEHleGUJcpFT7139yLavd.jpg',
        artist: 'bent wyre',
        tracks: [
            {
                id: 244771,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWhm9kCbUsWLPZyLh74JuEHleGUJcpFT7139yLavd.jpg',
                album_track: [
                    {
                        name: 'If Only Life Was This Easy Volume 5: The Beat Misdirect',
                        url: 'https://freemusicarchive.org/music/bent-wyre/if-only-life-was-this-easy-volume-5-the-beat-misdirect'
                    }
                ],
                artist_track: [
                    {
                        name: 'bent wyre',
                        url: 'https://freemusicarchive.org/music/bent-wyre/'
                    }
                ],
                name: 'Ants Of The Beat',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/xNRLVeFXBtBzcVNxbQ926UHwtbJdwz9N6itt1Q5p.mp3'
            },
            {
                id: 244772,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWhm9kCbUsWLPZyLh74JuEHleGUJcpFT7139yLavd.jpg',
                album_track: [
                    {
                        name: 'If Only Life Was This Easy Volume 5: The Beat Misdirect',
                        url: 'https://freemusicarchive.org/music/bent-wyre/if-only-life-was-this-easy-volume-5-the-beat-misdirect'
                    }
                ],
                artist_track: [
                    {
                        name: 'bent wyre',
                        url: 'https://freemusicarchive.org/music/bent-wyre/'
                    }
                ],
                name: 'Beat of Trespass',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/4Bq94NTcowNuMyrBcrTtF3598xoGd2q7NQiiF2zV.mp3'
            },
            {
                id: 244773,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWhm9kCbUsWLPZyLh74JuEHleGUJcpFT7139yLavd.jpg',
                album_track: [
                    {
                        name: 'If Only Life Was This Easy Volume 5: The Beat Misdirect',
                        url: 'https://freemusicarchive.org/music/bent-wyre/if-only-life-was-this-easy-volume-5-the-beat-misdirect'
                    }
                ],
                artist_track: [
                    {
                        name: 'bent wyre',
                        url: 'https://freemusicarchive.org/music/bent-wyre/'
                    }
                ],
                name: 'Prequel To The Beat',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/jvzkaggmRgohM9NLkScFJxeGe76DMlAe9bbMXQC4.mp3'
            },
            {
                id: 244774,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWhm9kCbUsWLPZyLh74JuEHleGUJcpFT7139yLavd.jpg',
                album_track: [
                    {
                        name: 'If Only Life Was This Easy Volume 5: The Beat Misdirect',
                        url: 'https://freemusicarchive.org/music/bent-wyre/if-only-life-was-this-easy-volume-5-the-beat-misdirect'
                    }
                ],
                artist_track: [
                    {
                        name: 'bent wyre',
                        url: 'https://freemusicarchive.org/music/bent-wyre/'
                    }
                ],
                name: 'Silent Beat Parliament',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/roaC9WqIoGfdj8l2BIpq48dRsVdb6hjCQwWcEvAk.mp3'
            },
            {
                id: 244775,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWhm9kCbUsWLPZyLh74JuEHleGUJcpFT7139yLavd.jpg',
                album_track: [
                    {
                        name: 'If Only Life Was This Easy Volume 5: The Beat Misdirect',
                        url: 'https://freemusicarchive.org/music/bent-wyre/if-only-life-was-this-easy-volume-5-the-beat-misdirect'
                    }
                ],
                artist_track: [
                    {
                        name: 'bent wyre',
                        url: 'https://freemusicarchive.org/music/bent-wyre/'
                    }
                ],
                name: 'Swim To The Beat',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/Dd2m0kbETgiabGoreo90fWTklXguYwtzPCyfitsX.mp3'
            },
            {
                id: 244776,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FWhm9kCbUsWLPZyLh74JuEHleGUJcpFT7139yLavd.jpg',
                album_track: [
                    {
                        name: 'If Only Life Was This Easy Volume 5: The Beat Misdirect',
                        url: 'https://freemusicarchive.org/music/bent-wyre/if-only-life-was-this-easy-volume-5-the-beat-misdirect'
                    }
                ],
                artist_track: [
                    {
                        name: 'bent wyre',
                        url: 'https://freemusicarchive.org/music/bent-wyre/'
                    }
                ],
                name: 'Atmospheric Disturbances Part 5',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/fTI5dTCPTUmYG9cCcyuYtZu68Zi2N3wDFn2SC3Tx.mp3'
            },
        ],
    },
    {
        name: 'Deserted',
        cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FYSTwnrNHbF1z6F2KLcUqd3LL4HKDE65z9s81K2wx.jpg',
        artist: 'Ethos',
        tracks: [
            {
                id: 221880,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FYSTwnrNHbF1z6F2KLcUqd3LL4HKDE65z9s81K2wx.jpg',
                album_track: [
                    {
                        name: 'Deserted',
                        url: 'https://freemusicarchive.org/music/ethos/deserted'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ethos',
                        url: 'https://freemusicarchive.org/music/ethos/'
                    }
                ],
                name: 'Night of Betrayal',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/ljrOuYwbctFB7ydF6V4UiT7RjePORUuA6ogzkvkz.mp3'
            },
            {
                id: 228249,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FYSTwnrNHbF1z6F2KLcUqd3LL4HKDE65z9s81K2wx.jpg',
                album_track: [
                    {
                        name: 'Deserted',
                        url: 'https://freemusicarchive.org/music/ethos/deserted'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ethos',
                        url: 'https://freemusicarchive.org/music/ethos/'
                    }
                ],
                name: 'Shimmer in Thought',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/jS6cpIxCQUaDq0mB8eOO9MRWjnJq4HMgAmBdIj2t.mp3'
            },
            {
                id: 221879,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FYSTwnrNHbF1z6F2KLcUqd3LL4HKDE65z9s81K2wx.jpg',
                album_track: [
                    {
                        name: 'Deserted',
                        url: 'https://freemusicarchive.org/music/ethos/deserted'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ethos',
                        url: 'https://freemusicarchive.org/music/ethos/'
                    }
                ],
                name: 'Southern Skies',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/ip7N0VMMt9giOydW2bU0a2BFcZVPbOIp9ZtUwqFc.mp3'
            },
            {
                id: 233882,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FYSTwnrNHbF1z6F2KLcUqd3LL4HKDE65z9s81K2wx.jpg',
                album_track: [
                    {
                        name: 'Deserted',
                        url: 'https://freemusicarchive.org/music/ethos/deserted'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ethos',
                        url: 'https://freemusicarchive.org/music/ethos/'
                    }
                ],
                name: 'The Battle for Madrid II',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/b162FnoYBtAWskTJ9ZZPB4dUYqRSDx72RRrs675R.mp3'
            },
            {
                id: 233873,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FYSTwnrNHbF1z6F2KLcUqd3LL4HKDE65z9s81K2wx.jpg',
                album_track: [
                    {
                        name: 'Deserted',
                        url: 'https://freemusicarchive.org/music/ethos/deserted'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ethos',
                        url: 'https://freemusicarchive.org/music/ethos/'
                    }
                ],
                name: 'The Wit of Axis',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/hjBKOXtUp0rATSX3w2tbKhxxld4ZkyfcqJG7FWxA.mp3'
            },
            {
                id: 237081,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FYSTwnrNHbF1z6F2KLcUqd3LL4HKDE65z9s81K2wx.jpg',
                album_track: [
                    {
                        name: 'Deserted',
                        url: 'https://freemusicarchive.org/music/ethos/deserted'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ethos',
                        url: 'https://freemusicarchive.org/music/ethos/'
                    }
                ],
                name: 'Every Day to Play',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/GYCztAih9jSIbZcEtwpXOSewfkFqWTaeKJ1DV4Nk.mp3'
            },
            {
                id: 222012,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FYSTwnrNHbF1z6F2KLcUqd3LL4HKDE65z9s81K2wx.jpg',
                album_track: [
                    {
                        name: 'Deserted',
                        url: 'https://freemusicarchive.org/music/ethos/deserted'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ethos',
                        url: 'https://freemusicarchive.org/music/ethos/'
                    }
                ],
                name: 'Scapes of Dreams',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/BhWycGKNuABnq4kypXFWqUhkR7Cs6ApoHZsKdlHO.mp3'
            },
            {
                id: 222035,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FYSTwnrNHbF1z6F2KLcUqd3LL4HKDE65z9s81K2wx.jpg',
                album_track: [
                    {
                        name: 'Deserted',
                        url: 'https://freemusicarchive.org/music/ethos/deserted'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ethos',
                        url: 'https://freemusicarchive.org/music/ethos/'
                    }
                ],
                name: 'Blues and Tooth',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/0UHvULvW1QLOzWsnFwnEdszF9fRvEv2DPoWHvXG2.mp3'
            },
            {
                id: 244769,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FYSTwnrNHbF1z6F2KLcUqd3LL4HKDE65z9s81K2wx.jpg',
                album_track: [
                    {
                        name: 'Deserted',
                        url: 'https://freemusicarchive.org/music/ethos/deserted'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ethos',
                        url: 'https://freemusicarchive.org/music/ethos/'
                    }
                ],
                name: 'Something About the West',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/Yr4y1crWSkncMF54Ot7NoLwDx3S2ezWaXpFHJkI4.mp3'
            },
            {
                id: 227340,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FYSTwnrNHbF1z6F2KLcUqd3LL4HKDE65z9s81K2wx.jpg',
                album_track: [
                    {
                        name: 'Deserted',
                        url: 'https://freemusicarchive.org/music/ethos/deserted'
                    }
                ],
                artist_track: [
                    {
                        name: 'Ethos',
                        url: 'https://freemusicarchive.org/music/ethos/'
                    }
                ],
                name: 'Vedu',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/vbJ8k5Z4JbbLTIYMxUc8yyuEgA7vxKwWQhbEriJk.mp3'
            },
        ],
    },
    {
        name: 'Power Pop!',
        cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FI2odD8cOiITbu12KVloCCpxjBYS3WdnD7Mc3i7RI.png',
        artist: 'HoliznaCC0',
        tracks: [
            {
                id: 243306,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FI2odD8cOiITbu12KVloCCpxjBYS3WdnD7Mc3i7RI.png',
                album_track: [
                    {
                        name: 'Power Pop!',
                        url: 'https://freemusicarchive.org/music/holiznacc0/power-pop'
                    }
                ],
                artist_track: [
                    {
                        name: 'HoliznaCC0',
                        url: 'https://freemusicarchive.org/music/holiznacc0/'
                    }
                ],
                name: 'Funky Pop',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/c3qtEJjVKXI87BexJ5Ra4Sxy2iY9DAphxzqyrhg6.mp3'
            },
            {
                id: 212896,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FI2odD8cOiITbu12KVloCCpxjBYS3WdnD7Mc3i7RI.png',
                album_track: [
                    {
                        name: 'Power Pop!',
                        url: 'https://freemusicarchive.org/music/holiznacc0/power-pop'
                    }
                ],
                artist_track: [
                    {
                        name: 'HoliznaCC0',
                        url: 'https://freemusicarchive.org/music/holiznacc0/'
                    }
                ],
                name: 'Retro Soundtrack',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/EhxCaj2BvQji46bSXzj6Aj3IstCsMdSYT4JAOEBQ.mp3'
            },
            {
                id: 205189,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FI2odD8cOiITbu12KVloCCpxjBYS3WdnD7Mc3i7RI.png',
                album_track: [
                    {
                        name: 'Power Pop!',
                        url: 'https://freemusicarchive.org/music/holiznacc0/power-pop'
                    }
                ],
                artist_track: [
                    {
                        name: 'HoliznaCC0',
                        url: 'https://freemusicarchive.org/music/holiznacc0/'
                    }
                ],
                name: 'Back In The 80s',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/mwxiOyntd7joJQg0mRq9cJPqRq6NvnrK2Xc3QDUe.mp3'
            },
            {
                id: 208292,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FI2odD8cOiITbu12KVloCCpxjBYS3WdnD7Mc3i7RI.png',
                album_track: [
                    {
                        name: 'Power Pop!',
                        url: 'https://freemusicarchive.org/music/holiznacc0/power-pop'
                    }
                ],
                artist_track: [
                    {
                        name: 'HoliznaCC0',
                        url: 'https://freemusicarchive.org/music/holiznacc0/'
                    }
                ],
                name: 'transcendental earth people',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/LhGGrUWTsC36K5aX4Y2xKBbqrFJSn7I6enjSlifs.mp3'
            },
            {
                id: 208290,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FI2odD8cOiITbu12KVloCCpxjBYS3WdnD7Mc3i7RI.png',
                album_track: [
                    {
                        name: 'Power Pop!',
                        url: 'https://freemusicarchive.org/music/holiznacc0/power-pop'
                    }
                ],
                artist_track: [
                    {
                        name: 'HoliznaCC0',
                        url: 'https://freemusicarchive.org/music/holiznacc0/'
                    }
                ],
                name: 'Happy Dance',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/RW0ClzjYQLeklBk8rH87iOMymxlbShz12SXfzAQq.mp3'
            },
            {
                id: 208291,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FI2odD8cOiITbu12KVloCCpxjBYS3WdnD7Mc3i7RI.png',
                album_track: [
                    {
                        name: 'Power Pop!',
                        url: 'https://freemusicarchive.org/music/holiznacc0/power-pop'
                    }
                ],
                artist_track: [
                    {
                        name: 'HoliznaCC0',
                        url: 'https://freemusicarchive.org/music/holiznacc0/'
                    }
                ],
                name: 'A Small Town On Pluto',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/cLDFuQXsN4GF2UhvFPOgouQOGu2W36jOh8Las4Ay.mp3'
            },
            {
                id: 204493,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FI2odD8cOiITbu12KVloCCpxjBYS3WdnD7Mc3i7RI.png',
                album_track: [
                    {
                        name: 'Power Pop!',
                        url: 'https://freemusicarchive.org/music/holiznacc0/power-pop'
                    }
                ],
                artist_track: [
                    {
                        name: 'HoliznaCC0',
                        url: 'https://freemusicarchive.org/music/holiznacc0/'
                    }
                ],
                name: 'Day Dreams',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/rdmpcailrERfJHqDLx64rgA5NtvX0Yjadh0yXGcH.mp3'
            },
            {
                id: 205188,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FI2odD8cOiITbu12KVloCCpxjBYS3WdnD7Mc3i7RI.png',
                album_track: [
                    {
                        name: 'Power Pop!',
                        url: 'https://freemusicarchive.org/music/holiznacc0/power-pop'
                    }
                ],
                artist_track: [
                    {
                        name: 'HoliznaCC0',
                        url: 'https://freemusicarchive.org/music/holiznacc0/'
                    }
                ],
                name: 'Dear Mr Super Computer',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/6mRjlU0gvJgHShEyDHlHSmlctyrROaF8dHy7qRC5.mp3'
            },
            {
                id: 217338,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FI2odD8cOiITbu12KVloCCpxjBYS3WdnD7Mc3i7RI.png',
                album_track: [
                    {
                        name: 'Power Pop!',
                        url: 'https://freemusicarchive.org/music/holiznacc0/power-pop'
                    }
                ],
                artist_track: [
                    {
                        name: 'HoliznaCC0',
                        url: 'https://freemusicarchive.org/music/holiznacc0/'
                    }
                ],
                name: 'Mutant Club',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/01HWIPso52L6soAVjWsXl3zchU3ea9PuoVfWhXJ8.mp3'
            },
            {
                id: 204494,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FI2odD8cOiITbu12KVloCCpxjBYS3WdnD7Mc3i7RI.png',
                album_track: [
                    {
                        name: 'Power Pop!',
                        url: 'https://freemusicarchive.org/music/holiznacc0/power-pop'
                    }
                ],
                artist_track: [
                    {
                        name: 'HoliznaCC0',
                        url: 'https://freemusicarchive.org/music/holiznacc0/'
                    }
                ],
                name: 'Love Love Love',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/QyOdjJhuXLVTQJykleAL7negVj97mpFr63vt4sPO.mp3'
            },
            {
                id: 204495,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FI2odD8cOiITbu12KVloCCpxjBYS3WdnD7Mc3i7RI.png',
                album_track: [
                    {
                        name: 'Power Pop!',
                        url: 'https://freemusicarchive.org/music/holiznacc0/power-pop'
                    }
                ],
                artist_track: [
                    {
                        name: 'HoliznaCC0',
                        url: 'https://freemusicarchive.org/music/holiznacc0/'
                    }
                ],
                name: 'Retro Synths',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/iWRFaLOfYZ7uoW1ugOUUUlfHkpsZnLzTQJ0CUWqr.mp3'
            },
            {
                id: 204496,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FI2odD8cOiITbu12KVloCCpxjBYS3WdnD7Mc3i7RI.png',
                album_track: [
                    {
                        name: 'Power Pop!',
                        url: 'https://freemusicarchive.org/music/holiznacc0/power-pop'
                    }
                ],
                artist_track: [
                    {
                        name: 'HoliznaCC0',
                        url: 'https://freemusicarchive.org/music/holiznacc0/'
                    }
                ],
                name: '50 Over The Speed Limit',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/nBHRjy9qqBbnbEEJHQAWphNq016wwx2z22RBGkO7.mp3'
            },
            {
                id: 212617,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FI2odD8cOiITbu12KVloCCpxjBYS3WdnD7Mc3i7RI.png',
                album_track: [
                    {
                        name: 'Power Pop!',
                        url: 'https://freemusicarchive.org/music/holiznacc0/power-pop'
                    }
                ],
                artist_track: [
                    {
                        name: 'HoliznaCC0',
                        url: 'https://freemusicarchive.org/music/holiznacc0/'
                    }
                ],
                name: 'Drama',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/FlryAAAFEblQ2Vmd9eIJN3FtlTyrElVoahvfmoOb.mp3'
            },
            {
                id: 205350,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2FI2odD8cOiITbu12KVloCCpxjBYS3WdnD7Mc3i7RI.png',
                album_track: [
                    {
                        name: 'Power Pop!',
                        url: 'https://freemusicarchive.org/music/holiznacc0/power-pop'
                    }
                ],
                artist_track: [
                    {
                        name: 'HoliznaCC0',
                        url: 'https://freemusicarchive.org/music/holiznacc0/'
                    }
                ],
                name: 'Bouncing',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/jlbq3zqaGWo0V4gnuXk0cF9e5GVUbKGAqNb2C9T5.mp3'
            },
        ],
    },
    {
        name: 'Sound Works: Volume 2',
        cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2Fjkp5vrXTA5R0T5QyANjNZFKvSCqdllXoYISLCXmU.jpg',
        artist: 'Jon Shuemaker',
        tracks: [
            {
                id: 244782,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2Fjkp5vrXTA5R0T5QyANjNZFKvSCqdllXoYISLCXmU.jpg',
                album_track: [
                    {
                        name: 'Sound Works: Volume 2',
                        url: 'https://freemusicarchive.org/music/jon-shuemaker/sound-works-volume-2'
                    }
                ],
                artist_track: [
                    {
                        name: 'Jon Shuemaker',
                        url: 'https://freemusicarchive.org/music/jon-shuemaker/'
                    }
                ],
                name: 'Soundwork XI',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/SLrlClVxpebqyO2E2gQXQ9LIU7fVUkAKeShgBwQh.mp3'
            },
            {
                id: 244783,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2Fjkp5vrXTA5R0T5QyANjNZFKvSCqdllXoYISLCXmU.jpg',
                album_track: [
                    {
                        name: 'Sound Works: Volume 2',
                        url: 'https://freemusicarchive.org/music/jon-shuemaker/sound-works-volume-2'
                    }
                ],
                artist_track: [
                    {
                        name: 'Jon Shuemaker',
                        url: 'https://freemusicarchive.org/music/jon-shuemaker/'
                    }
                ],
                name: 'Soundwork XII',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/JCy5KbSFOK9Jdq64kYQ4gQnTjyU0sOPE5cWwUBIF.mp3'
            },
            {
                id: 244784,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2Fjkp5vrXTA5R0T5QyANjNZFKvSCqdllXoYISLCXmU.jpg',
                album_track: [
                    {
                        name: 'Sound Works: Volume 2',
                        url: 'https://freemusicarchive.org/music/jon-shuemaker/sound-works-volume-2'
                    }
                ],
                artist_track: [
                    {
                        name: 'Jon Shuemaker',
                        url: 'https://freemusicarchive.org/music/jon-shuemaker/'
                    }
                ],
                name: 'Soundwork XIII',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/HxwEnm4sO1Qhd6DYTEDcUQGCc5BeA34WoK2bn3n5.mp3'
            },
            {
                id: 244785,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2Fjkp5vrXTA5R0T5QyANjNZFKvSCqdllXoYISLCXmU.jpg',
                album_track: [
                    {
                        name: 'Sound Works: Volume 2',
                        url: 'https://freemusicarchive.org/music/jon-shuemaker/sound-works-volume-2'
                    }
                ],
                artist_track: [
                    {
                        name: 'Jon Shuemaker',
                        url: 'https://freemusicarchive.org/music/jon-shuemaker/'
                    }
                ],
                name: 'Soundwork XIV',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/Z8MfX3eGiW3rd8su2r6e5QK5NnMZL0PKAbqF0BBx.mp3'
            },
            {
                id: 244786,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2Fjkp5vrXTA5R0T5QyANjNZFKvSCqdllXoYISLCXmU.jpg',
                album_track: [
                    {
                        name: 'Sound Works: Volume 2',
                        url: 'https://freemusicarchive.org/music/jon-shuemaker/sound-works-volume-2'
                    }
                ],
                artist_track: [
                    {
                        name: 'Jon Shuemaker',
                        url: 'https://freemusicarchive.org/music/jon-shuemaker/'
                    }
                ],
                name: 'Soundwork XV',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/znEvOnzHpykRmOJpAWdi6WfjfcKbJt6vuKGylQEY.mp3'
            },
            {
                id: 244787,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2Fjkp5vrXTA5R0T5QyANjNZFKvSCqdllXoYISLCXmU.jpg',
                album_track: [
                    {
                        name: 'Sound Works: Volume 2',
                        url: 'https://freemusicarchive.org/music/jon-shuemaker/sound-works-volume-2'
                    }
                ],
                artist_track: [
                    {
                        name: 'Jon Shuemaker',
                        url: 'https://freemusicarchive.org/music/jon-shuemaker/'
                    }
                ],
                name: 'Soundwork XVI',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/vSpN3iecoPmRDWRTc6Xb47X5sD9EppOdJA6iA5sR.mp3'
            },
            {
                id: 244788,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2Fjkp5vrXTA5R0T5QyANjNZFKvSCqdllXoYISLCXmU.jpg',
                album_track: [
                    {
                        name: 'Sound Works: Volume 2',
                        url: 'https://freemusicarchive.org/music/jon-shuemaker/sound-works-volume-2'
                    }
                ],
                artist_track: [
                    {
                        name: 'Jon Shuemaker',
                        url: 'https://freemusicarchive.org/music/jon-shuemaker/'
                    }
                ],
                name: 'Soundwork XVII',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/QRR6KMmgnESGPlzXhknAts3yggTVCqf1i9iEuyH8.mp3'
            },
            {
                id: 244789,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2Fjkp5vrXTA5R0T5QyANjNZFKvSCqdllXoYISLCXmU.jpg',
                album_track: [
                    {
                        name: 'Sound Works: Volume 2',
                        url: 'https://freemusicarchive.org/music/jon-shuemaker/sound-works-volume-2'
                    }
                ],
                artist_track: [
                    {
                        name: 'Jon Shuemaker',
                        url: 'https://freemusicarchive.org/music/jon-shuemaker/'
                    }
                ],
                name: 'Soundwork XVIII',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/67AXJsoKn5xvJnYu1l47e3AFZ1o8lTFrOMJjJgrA.mp3'
            },
            {
                id: 244790,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2Fjkp5vrXTA5R0T5QyANjNZFKvSCqdllXoYISLCXmU.jpg',
                album_track: [
                    {
                        name: 'Sound Works: Volume 2',
                        url: 'https://freemusicarchive.org/music/jon-shuemaker/sound-works-volume-2'
                    }
                ],
                artist_track: [
                    {
                        name: 'Jon Shuemaker',
                        url: 'https://freemusicarchive.org/music/jon-shuemaker/'
                    }
                ],
                name: 'Soundwork XIX',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/gkjSFASIuynsyx5MNjbqibHFmCJ0LZ4Y5HeSxmiU.mp3'
            },
            {
                id: 244791,
                cover: 'https://api.nomercy.tv/cors?url=https://files.freemusicarchive.org/storage-freemusicarchive-org/album_image%2Fjkp5vrXTA5R0T5QyANjNZFKvSCqdllXoYISLCXmU.jpg',
                album_track: [
                    {
                        name: 'Sound Works: Volume 2',
                        url: 'https://freemusicarchive.org/music/jon-shuemaker/sound-works-volume-2'
                    }
                ],
                artist_track: [
                    {
                        name: 'Jon Shuemaker',
                        url: 'https://freemusicarchive.org/music/jon-shuemaker/'
                    }
                ],
                name: 'Soundwork XX',
                path: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/j8pLsLY8xTIj78GrN2b2YnJlTCzGYZ1hId4zqT5d.mp3'
            },
        ],
    },
]);

export default playlists;