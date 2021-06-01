import Redlight from './images/redlight.png';
import Floorlava from './images/floorlava.png';
import Music from './images/music.png';

const games = [
  {
    name: 'Red Light, Green Light',
    slug: 'redlight',
    img: Redlight,
    desc: [
      'Red means stop. Green means go. But you gotta hurry before time runs out!',
    ],
    settings: [{ Time: 2 }, { Players: 2 }, { sound: 'on' }],
  },
  {
    name: 'The Floor is Lava',
    slug: 'floorislava',
    img: Floorlava,
    desc: [
      'Only your furniture can save you from the hot, bubbling, molten lava!',
    ],
    id: 1,
  },
  {
    name: 'Musical Chairs',
    slug: 'musicalchairs',
    img: Music,
    desc: ['Now is your chance to show off those sweet dance moves!'],
    id: 2,
  },
];

export default games;
