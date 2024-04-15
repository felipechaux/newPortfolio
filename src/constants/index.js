import {
  frontend,
  backend,
  javascript,
  html,
  reactjs,
  git,
  acid,
  movies,
  inproext,
  easy,
  horneo,
  todoPago,
  pagaTodo,
  meli,
  actpol,
  globant,
  mobile,
  game,
  asesoftware,
  umb,
  sinte,
  ugm,
  jazzplat,
  platzito,
  spaceman,
  pongx,
  montes,
  unity,
  android
} from '../assets';

export const navLinks = [
  {
    id: 'about',
    title: 'About',
  },
  {
    id: 'projects',
    title: 'Projects',
  },
  {
    id: 'contact',
    title: 'Contact',
  },
];

const services = [
  {
    title: 'Mobile Development',
    icon: mobile,
  },
  {
    title: 'Frontend Developer',
    icon: frontend,
  },
  {
    title: 'Game Development',
    icon: game,
  }
];

const technologies = [
  {
    name: 'Android',
    icon: android,
  },
  {
    name: 'Unity',
    icon: unity,
  },
  {
    name: 'React JS',
    icon: reactjs,
  },
  {
    name: 'HTML 5',
    icon: html,
  },
  {
    name: 'JavaScript',
    icon: javascript,
  },
  {
    name: 'git',
    icon: git,
  }
];

const experiences = [
  {
    title: 'Mobile Software Engineer V',
    company_name: 'Acid Labs',
    icon: acid,
    iconBg: '#FFFFFF',
    date: 'Sep 2022 - Present',
  },
  {
    title: 'Android Mobile Developer',
    company_name: 'Globant',
    icon: globant,
    iconBg: '#FFFFFF',
    date: 'Feb 2021 - Jul 2022',
  },
  {
    title: 'Mobile Developer',
    company_name: 'Asesoftware',
    icon: asesoftware,
    iconBg: '#FFFFFF',
    date: 'Abr 2019 - Feb 2021',
  },
  {
    title: 'Software Engineer',
    company_name: 'Manuela Beltran University',
    icon: umb,
    iconBg: '#FFFFFF',
    date: 'May 2018 - Oct 2018',
  },
  {
    title: 'Software Developer',
    company_name: 'Sinte Soluciones',
    icon: sinte,
    iconBg: '#333333',
    date: 'Jul 2017 - May 2018',
  },
  {
    title: 'e-learning Programmer',
    company_name: 'Unigermana',
    icon: ugm,
    iconBg: '#000000',
    date: 'Mar 2016 - May 2017',
  },
  {
    title: 'Programmer',
    company_name: 'Jazzplat Colombia',
    icon: jazzplat,
    iconBg: '#FFFFFF',
    date: 'Jul 2015 - Dic 2015',
  }
];

const projects = [
  {
    id: 'project-1',
    name: 'EasyApp',
    description: 'Retail App for Chile - buy whatever you want',
    tags: [
      {
        name: 'nextjs',
        color: 'blue-text-gradient',
      },
      {
        name: 'supabase',
        color: 'green-text-gradient',
      },
      {
        name: 'css',
        color: 'pink-text-gradient',
      },
    ],
    image: easy,
    demo: 'https://play.google.com/store/apps/details?id=com.cencosud.easy.cl&pli=1',
    repo: ''
  },
  {
    id: 'project-2',
    name: 'TodoPago',
    description: 'Digital wallet for Argentina',
    tags: [
      {
        name: 'nextjs',
        color: 'blue-text-gradient',
      },
      {
        name: 'supabase',
        color: 'green-text-gradient',
      },
      {
        name: 'css',
        color: 'pink-text-gradient',
      },
    ],
    image: todoPago,
    demo: 'https://play.google.com/store/apps/details?id=com.prisma.todopago2&hl=es_CR',
    repo: ''
  },
  {
    id: 'project-3',
    name: 'Horneo App',
    description: 'Coorporative App to get deliveries of products - Colombia',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'mongodb',
        color: 'green-text-gradient',
      },
      {
        name: 'tailwind',
        color: 'pink-text-gradient',
      },
    ],
    image: horneo,
    demo: 'https://play.google.com/store/apps/details?id=com.tostao.pedidos',
    repo: ''
  },
  {
    id: 'project-4',
    name: 'PagaTodo App',
    description: 'Digital wallet portfolio of products - Colombia',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'mongodb',
        color: 'green-text-gradient',
      },
      {
        name: 'tailwind',
        color: 'pink-text-gradient',
      },
    ],
    image: pagaTodo,
    demo: 'https://play.google.com/store/apps/details?id=pagatodo.datacenter.com.pagatodo&pli=1',
    repo: ''
  },
  {
    id: 'project-5',
    name: 'InproextApp',
    description:
      'Coorporative news tool App',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'restapi',
        color: 'green-text-gradient',
      },
      {
        name: 'scss',
        color: 'pink-text-gradient',
      },
    ],
    image: inproext,
    repo: 'https://github.com/felipechaux/flutter/tree/master/inproext_app',
    demo: 'https://apkcombo.com/inproextapp/com.inproext.inproextapp/',
  },
  {
    id: 'project-6',
    name: 'Movies Library DB App',
    description: 'Data Base of current Movies on Cinema',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'mongodb',
        color: 'green-text-gradient',
      },
      {
        name: 'tailwind',
        color: 'pink-text-gradient',
      },
    ],
    image: movies,
    demo: 'https://play.google.com/store/apps/details?id=com.felipechauxlab.movieslibrarydb&hl=es_CR',
    repo: ''
  }
];

const projectsTwo = [
  {
    id: 'project-7',
    name: 'Meli Challenge App',
    description: 'App that shows info of MercadoLibre API ',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'mongodb',
        color: 'green-text-gradient',
      },
      {
        name: 'tailwind',
        color: 'pink-text-gradient',
      },
    ],
    image: meli,
    repo: 'https://github.com/felipechaux/meliChallenge'
  }
  ,
  {
    id: 'project-8',
    name: 'ACTPOL App - Curazao',
    description: 'an App that helps the police of curacao to detect criminals by  license plate detection',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'mongodb',
        color: 'green-text-gradient',
      },
      {
        name: 'tailwind',
        color: 'pink-text-gradient',
      },
    ],
    image: actpol,
    demo: 'https://masnoticia.com/kpa-a-lansa-oficialmente-nan-mobile-actpol-app-pa-asina-facilita-e-trabou-y-siguridad-di-cada-agente-policial-riba-nos-isla/',
    repo: ''
  }
];

const projectGames = [
  {
    id: 'game-1',
    name: 'Platzito',
    description: 'Platzito',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'mongodb',
        color: 'green-text-gradient',
      },
      {
        name: 'tailwind',
        color: 'pink-text-gradient',
      },
    ],
    image: platzito,
    demo: 'https://constelaciongames.itch.io/platzito',
    repo: ''
  },
  {
    id: 'game-2',
    name: 'SpaceMan',
    description: 'SpaceMan',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'mongodb',
        color: 'green-text-gradient',
      },
      {
        name: 'tailwind',
        color: 'pink-text-gradient',
      },
    ],
    image: spaceman,
    demo: 'https://constelaciongames.itch.io/spaceman',
    repo: 'https://github.com/felipechaux/unityGames/tree/master/SpaceMan'
  },
  {
    id: 'game-3',
    name: 'Pongx',
    description: 'Pongx',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'mongodb',
        color: 'green-text-gradient',
      },
      {
        name: 'tailwind',
        color: 'pink-text-gradient',
      },
    ],
    image: pongx,
    demo: 'https://constelaciongames.itch.io/pongx',
    repo: 'https://github.com/felipechaux/unityGames/tree/master/PongPlatzi'
  },
  {
    id: 'game-4',
    name: 'Montes',
    description: 'Montes',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'mongodb',
        color: 'green-text-gradient',
      },
      {
        name: 'tailwind',
        color: 'pink-text-gradient',
      },
    ],
    image: montes,
    demo: 'https://constelaciongames.itch.io/montes-de-maria',
    repo: 'https://github.com/felipechaux/games/tree/master/phaser/game-feels'
  }
];

export { services, technologies, experiences, projects, projectsTwo, projectGames };
