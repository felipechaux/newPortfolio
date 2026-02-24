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
  android,
  flutter,
  swift,
  quicksite,
  kanguro,
  space,
  galaxySnap,
  dadomatch,
  dadomatchLogo
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
    name: 'Swift',
    icon: swift,
  },
  {
    name: 'Flutter',
    icon: flutter,
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
    title: 'Mobile Engineer',
    company_name: 'Kanguro Insurance',
    icon: kanguro,
    iconBg: '#FFFFFF',
    date: 'Sep 2024 - Present',
  },
  {
    title: 'Mobile Developer',
    company_name: 'Quicksite Guru',
    icon: quicksite,
    iconBg: '#FFFFFF',
    date: 'Jun 2024 - Aug 2024',
  },
  {
    title: 'Mobile Software Engineer V',
    company_name: 'Acid Labs',
    icon: acid,
    iconBg: '#FFFFFF',
    date: 'Sep 2022 - Oct 2023',
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
    id: 'project-dadomatch',
    name: 'DadoMatch',
    description: 'AI-Powered Social Icebreaker App - Less scroll, more action. Let AI generate the perfect opener based on your environment.',
    tags: [
      {
        name: 'kmp',
        color: 'blue-text-gradient',
      },
      {
        name: 'ai',
        color: 'green-text-gradient',
      },
      {
        name: 'compose',
        color: 'pink-text-gradient',
      },
    ],
    image: dadomatchLogo,
    demo: '/dadomatch',
    repo: ''
  },
  {
    id: 'project-0',
    name: 'Kanguro Insurance',
    description: 'Kotlin Multiplatform App for Pet & Health Insurance - iOS & Android',
    tags: [
      {
        name: 'kotlin-multiplatform',
        color: 'blue-text-gradient',
      },
      {
        name: 'swift',
        color: 'green-text-gradient',
      },
      {
        name: 'compose',
        color: 'pink-text-gradient',
      },
    ],
    image: kanguro,
    demo: 'https://apps.apple.com/us/app/kanguro/id1625776781',
    play_store: 'https://play.google.com/store/apps/details?id=com.insurtech.kanguro&hl=en',
    repo: ''
  },
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
    id: 'project-6',
    name: 'GalaxySnap',
    description: 'NASA Astronomy Picture of the Day App',
    tags: [
      {
        name: 'kotlin',
        color: 'blue-text-gradient',
      },
      {
        name: 'restapi',
        color: 'green-text-gradient',
      },
      {
        name: 'android',
        color: 'pink-text-gradient',
      },
    ],
    image: galaxySnap,
    demo: 'https://play.google.com/store/apps/details?id=com.chauxdev.nasaapp',
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
