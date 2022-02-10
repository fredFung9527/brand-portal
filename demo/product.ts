export const demoProducts = [
  {
    id: 'PROF00003153',
    name: 'Magic Slider Dual Adj.',
    description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
    seasons: ['FW21', 'FW22'],
    target: 'Custom',
    status: 'Completed',
    marketCodes: ['511T01', '686T01'],
    productType: 'Slider',
    materials: ['POM', 'rPA'],
    photo: '/demo/PROF00003153.jpg',
    threeDPhoto: '/demo/box.gltf',
    sizes: ['15mm', '38mm'],
    itemCodes: ['168-02328-000013', '168-02328-000014'],
    colors: ['S23923', 'S8848'],
    pullTest: 30,
    otherTest: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
    currency: 'USD',
    price: 0.195,
    unit: 'PCS',
    priceHistory: [
      { before: '01/01/2021', price: 0.160 },
      { before: '16/06/2021', price: 0.175 },
      { before: 'Now', price: 0.195 }
    ],
    moldCharge: 5000,
    incoTerm: 'ex-fty China',
    bulkLeadtime: 30,
    bulkColorMoq: 'Black: 30',
    bulkOrderMoq: 2500,
    supplier: 'YL',
    remarks: 'This is a demo product.\nIts information is not real.',
    forecastHistory: [
      { date: '01/01/2021', forecast: 115000 },
      { date: '01/06/2021', forecast: 165000 },
      { date: '01/01/2022', forecast: 257000 }
    ],
    lastUpdate: '01/01/2022',
    lastUpdateBy: 'Fred Fung',
    devSeason: 'FW20',
    designer: 'Kevin Chan'
  },
  {
    id: 'PROF00003147',
    name: 'Magic Slider Non Adj. with Pouch',
    description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
    seasons: ['S21'],
    target: 'General',
    status: 'In Progress',
    marketCodes: null,
    productType: 'Slider',
    materials: ['POM'],
    photo: '/demo/PROF00003147.jpg',
    threeDPhoto: null,
    sizes: ['Free'],
    itemCodes: ['268-02378-000018'],
    colors: ['S8848'],
    pullTest: 20,
    otherTest: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
    currency: 'CNY',
    price: 0.215,
    unit: 'PCS',
    priceHistory: [],
    moldCharge: 3000,
    incoTerm: 'ex-fty China',
    bulkLeadtime: 30,
    bulkColorMoq: 'Black: 30',
    bulkOrderMoq: 2500,
    supplier: 'YL',
    remarks: 'This is a demo product.\nIts information is not real.',
    forecastHistory: [
      { date: '01/01/2021', forecast: 115000 },
      { date: '01/06/2021', forecast: 175000 },
      { date: '01/01/2022', forecast: 157000 }
    ],
    lastUpdate: '01/01/2022',
    lastUpdateBy: 'Fred Fung',
    devSeason: 'W21',
    designer: 'Kevin Chan'
  },
  {
    id: 'PROF00000328',
    name: 'G.C. Cam+ Cam Buckle',
    description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
    seasons: ['W21'],
    target: 'Custom',
    status: 'Testing',
    marketCodes: ['ABLE99'],
    productType: 'Buckle',
    materials: ['Steel'],
    photo: '/demo/PROF00000328.jpg',
    threeDPhoto: null,
    sizes: ['15mm', '38mm'],
    itemCodes: ['568-02328-000083', '568-02328-000084'],
    colors: ['S12893'],
    pullTest: null,
    otherTest: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
    currency: 'USD',
    price: 0.155,
    unit: 'PCS',
    priceHistory: [
      { before: '01/01/2021', price: 0.130 },
      { before: 'Now', price: 0.155 }
    ],
    moldCharge: 5000,
    incoTerm: null,
    bulkLeadtime: 30,
    bulkColorMoq: '',
    bulkOrderMoq: 2500,
    supplier: null,
    remarks: 'This is a demo product.\nIts information is not real.',
    forecastHistory: [
      { date: '01/01/2021', forecast: 165000 },
      { date: '01/06/2021', forecast: 115000 },
      { date: '01/01/2022', forecast: 211000 }
    ],
    lastUpdate: '01/01/2022',
    lastUpdateBy: 'Fred Fung',
    devSeason: 'W20',
    designer: 'Dennis Chan'
  },
]

export const demoProductTypes = [
  'Adjusters',
  'Aluminium',
  'Attachments',
  'Belt Systems',
  'Buttons',
  'Cam Buckles',
  'Center Push Buckles',
  'Child Restraint Systems',
  'Cord Adjusters',
  'Cord Ends',
  'Cord Locks',
  'Cord Pulls',
  'Cords',
  'Cuff tabs',
  'Customer Examples',
  'D Rings',
  'Double Bar',
  'Dual Adj.',
  'Earphone Accessories',
  'Eyelets',
  'Garages',
  'General',
  'Helmet Systems',
  'Hooks',
  'Jeans Buttons',
  'Lash Tabs',
  'Lite',
  'Loops',
  'Marine Items',
  'Medium',
  'Metal Eyelets',
  'Military Items & Colors',
  'Non Adj.',
  'Others',
  'Plastic Eyelets',
  'Plastic Snaps',
  'Pouch',
  'Prong Snaps',
  'Pull Tabs',
  'Quik Attach Systems',
  'Ring Snaps',
  'Rivets',
  'Rubber Labels',
  'S-Spring & Ring-Spring',
  'Sewable',
  'Shoulder Pads & Handles',
  'Side Squeeze Buckles',
  'Single Adj.',
  'Single Bar',
  'Sliplok',
  'Small Hooks',
  'Snap Caps',
  'Snaphooks',
  'Snaps',
  'Specialties',
  'Sternum Straps',
  'Strap Systems',
  'Strong ',
  'Suspender Systems',
  'Systems',
  'Tensionlock',
  'Toggles',
  'Trousers Hooks',
  'Webbing Ends',
  'Webbings',
  'Zip Clips',
  'Zipper Pullers'
]

export const demoProdutcUnits = [
  'PCS', 'HPCS', 'set', 'yard'
]

export const demoCurrencies = [
  'USD', 'CNY'
]

export const demoIncoTerms = [
  'ex-fty China'
]

export const demoStatuses = [
  'Completed', 'In Progress', 'Testing'
]