import { ProductCategory } from 'client/src/app/api/models/product-category';

export const productCommonFieldsUtil: any[] = [
  {
    type: 'text',
    label: 'name',
    label_pl:'nazwa produktu',
  },
  {
    type: 'text',
    label: 'producer',
    label_pl:'producent',
  },
  {
    type: 'text',
    label: 'guarantee',
    label_pl:'gwarancja',
  },
  {
    type: 'text',
    label: 'model',
    label_pl:'model',
  },
  {
    type: 'number',
    label: 'price',
    label_pl:'cena',
  },
  {
    type: 'number',
    label: 'quantity',
    label_pl:'dostepna ilosc',
  },
];


export const productTypesFieldsUtil: any[] = [
  {
    category: ProductCategory.Charger,
    labels: [
      {
        type: 'text',
        label: 'power',
        label_pl: 'moc (W)',
      },
      {
        type: 'text',
        label: 'standard',
        label_pl: 'standard',
      },
      {
        type: 'number',
        label: 'noise',
        label_pl: 'poziom halasu (db)',
      },
      {
        type: 'text',
        label: 'coolingType',
        label_pl: 'rodzaj chlodzenia',
      },
      {
        type: 'number',
        label: 'width',
        label_pl: 'szerokosc',
      },
      {
        type: 'number',
        label: 'height',
        label_pl: 'wysokosc',
      },
      {
        type: 'number',
        label: 'depth',
        label_pl: 'glebokosc',
      },
    ],
  },
  {
    category: ProductCategory.Cooler,
    labels: [
      {
        type: 'text',
        label: 'type',
        label_pl: 'typ',
      },
      {
        type: 'number',
        label: 'maxRotationSpeed',
        label_pl: 'maksymalna predkosc obrotu (rpm)',
      },
      {
        type: 'number',
        label: 'maxVolume',
        label_pl: 'maksymalne halas (db)',
      },
      {
        type: 'number',
        label: 'supplyVoltage',
        label_pl: 'zuzywane napiecie',
      },
      {
        type: 'text',
        label: 'coolerType',
        label_pl: 'typ chlodzenia',
      },
    ],
  },
  {
    category: ProductCategory.DramMemory,
    labels: [
      {
        type: 'text',
        label: 'latencyCycle',
        label_pl: 'opoznienie w cyklach',
      },
      {
        type: 'text',
        label: 'memoryType',
        label_pl: 'rodzaj pamieci',
      },
      {
        type: 'text',
        label: 'frequency',
        label_pl: 'czestotliwosc',
      },
      {
        type: 'number',
        label: 'memory',
        label_pl: 'pamiec (gb)',
      },
    ],
  },
  {
    category: ProductCategory.GraphicCard,
    labels: [
      {
        type: 'text',
        label: 'memoryChipset',
        label_pl: 'chipset',
      },
      {
        type: 'text',
        label: 'connectorType',
        label_pl: 'rodzaj polaczenia',
      },
      {
        type: 'text',
        label: 'memoryType',
        label_pl: 'rodzaj pamieci',
      },
      {
        type: 'text',
        label: 'memoryClocking',
        label_pl: 'taktowanie pamieci',
      },
      {
        type: 'number',
        label: 'memory',
        label_pl: 'pamiec (gb)',
      },
    ],
  },
  {
    category: ProductCategory.HardDrive,
    labels: [
      {
        type: 'text',
        label: 'memoryInterface',
        label_pl: 'interfejs pamieci',
      },
      {
        type: 'text',
        label: 'memoryType',
        label_pl: 'rodzaj pamieci',
      },
      {
        type: 'number',
        label: 'memory',
        label_pl: 'pamiec (gb)',
      },
    ],
  },
  {
    category: ProductCategory.Motherboard,
    labels: [
      {
        type: 'text',
        label: 'motherboardStandard',
        label_pl: 'standard',
      },
      {
        type: 'text',
        label: 'processorSocket',
        label_pl: 'gniazdo procesora',
      },
      {
        type: 'text',
        label: 'memoryType',
        label_pl: 'rodzaj pamieci',
      },
      {
        type: 'number',
        label: 'maxMemory',
        label_pl: 'maksymalna obslugiwana pamiec (gb)',
      },
    ],
  },
  {
    category: ProductCategory.PcCase,
    labels: [
      {
        type: 'number',
        label: 'width',
        label_pl: 'wysokosc',
      },
      {
        type: 'number',
        label: 'length',
        label_pl: 'dlugosc',
      },
      {
        type: 'number',
        label: 'depth',
        label_pl: 'glebokosc',
      },
    ],
  },
  {
    category: ProductCategory.Processor,
    labels: [
      {
        type: 'text',
        label: 'processorType',
        label_pl: 'typ',
      },
      {
        type: 'text',
        label: 'socketType',
        label_pl: 'typ gniazda',
      },
      {
        type: 'number',
        label: 'numberOfCores',
        label_pl: 'ilosc rdzeni',
      },
      {
        type: 'number',
        label: 'numberOfThreads',
        label_pl: 'ilosc watkow',
      },
      {
        type: 'number',
        label: 'l3Capacity',
        label_pl: 'pamiec 3 poziomu',
      },
    ],
  },
];

