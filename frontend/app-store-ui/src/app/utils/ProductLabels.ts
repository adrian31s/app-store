import { ProductCategory } from 'client/src/app/api/models/product-category';

export const productCommonFieldsUtil: any[] = [
  {
    type: 'text',
    label: 'name',
    label_pl: 'nazwa produktu',
    filtering: true,
  },
  {
    type: 'text',
    label: 'producer',
    label_pl: 'producent',
    filtering: true,
  },
  {
    type: 'text',
    label: 'guarantee',
    label_pl: 'gwarancja',
  },
  {
    type: 'text',
    label: 'model',
    label_pl: 'model',
    filtering: true,
  },
  {
    type: 'number',
    label: 'price',
    label_pl: 'cena',
    filtering: true,
  },
  {
    type: 'number',
    label: 'quantity',
    label_pl: 'dostepna ilosc',
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
        filtering: true,
      },
      {
        type: 'text',
        label: 'standard',
        label_pl: 'standard',
        selecting: true,
        selectOptions: ['ATX', 'SFX', 'SFX-L', 'TFX'],
      },
      {
        type: 'number',
        label: 'noise',
        label_pl: 'poziom halasu (db)',
        filtering: true,
      },
      {
        type: 'text',
        label: 'coolingType',
        label_pl: 'rodzaj chlodzenia',
        selecting: true,
        selectOptions: ['wentylator', 'brak', 'wodne'],
      },
      {
        type: 'number',
        label: 'width',
        label_pl: 'szerokosc',
        filtering: true,
      },
      {
        type: 'number',
        label: 'height',
        label_pl: 'wysokosc',
        filtering: true,
      },
      {
        type: 'number',
        label: 'depth',
        label_pl: 'glebokosc',
        filtering: true,
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
        selecting: true,
        selectOptions: ['aktywne', 'pasywne'],
      },
      {
        type: 'number',
        label: 'maxRotationSpeed',
        label_pl: 'maksymalna predkosc obrotu (rpm)',
        filtering: true,
      },
      {
        type: 'number',
        label: 'maxVolume',
        label_pl: 'maksymalny halas (db)',
        filtering: true,
      },
      {
        type: 'number',
        label: 'supplyVoltage',
        label_pl: 'zuzywane napiecie',
        filtering: true,
      },
      {
        type: 'text',
        label: 'coolerType',
        label_pl: 'typ chlodzenia',
        selecting: true,
        selectOptions: [
          'wodne chłodzenie procesora',
          'chłodzenie procesora',
          'radiator',
        ],
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
        selecting: true,
        selectOptions: ['DDR3', 'DDR4', 'DDR5'],
      },
      {
        type: 'text',
        label: 'frequency',
        label_pl: 'czestotliwosc',
        selecting: true,
        selectOptions: ['2166', '3200', '3600', '4166'],
      },
      {
        type: 'number',
        label: 'memory',
        label_pl: 'pamiec (gb)',
        selecting: true,
        selectOptions: [2, 4, 8, 16, 32, 64, 128],
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
        selecting: true,
        selectOptions: ['NVIDIA', 'AMD', 'Intel'],
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
        selecting: true,
        selectOptions: ['GDDR6', 'GDDR6X', 'GDDR5', 'GDDR3'],
      },
      {
        type: 'text',
        label: 'memoryClocking',
        label_pl: 'taktowanie pamieci',
        selecting: true,
        selectOptions: ['2.5 GHz', '8 GHz', '16 GHz', '18 GHz'],
      },
      {
        type: 'number',
        label: 'memory',
        label_pl: 'pamiec (gb)',
        selecting: true,
        selectOptions: [2, 4, 8, 16],
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
        selecting: true,
        selectOptions: ['Serial ATA III', 'SAS 3', 'PCIe x4', 'U.2'],
      },
      {
        type: 'text',
        label: 'memoryType',
        label_pl: 'rodzaj pamieci',
        selecting: true,
        selectOptions: ['HDD (magnetyczny)', 'hybrydowy', 'SSD'],
      },
      {
        type: 'number',
        label: 'memory',
        label_pl: 'pamiec (gb)',
        selecting: true,
        selectOptions: [256, 512, 1024, 2048],
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
        selecting: true,
        selectOptions: ['ATX', 'micro-ATX', 'mini-ITX', 'extended ATX'],
      },
      {
        type: 'text',
        label: 'processorSocket',
        label_pl: 'gniazdo procesora',
        selecting: true,
        selectOptions: [
          'Socket 1700',
          'Socket AM4',
          'Socket AM5',
          'Socket 1200',
        ],
      },
      {
        type: 'text',
        label: 'memoryType',
        label_pl: 'rodzaj pamieci',
        selecting: true,
        selectOptions: [' DDR4', ' DDR5', ' DDR3 '],
      },
      {
        type: 'number',
        label: 'maxMemory',
        label_pl: 'maksymalna obslugiwana pamiec (gb)',
        selecting: true,
        selectOptions: [32, 64, 128, 256, 512],
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
        filtering: true,
      },
      {
        type: 'number',
        label: 'length',
        label_pl: 'dlugosc',
        filtering: true,
      },
      {
        type: 'number',
        label: 'depth',
        label_pl: 'glebokosc',
        filtering: true,
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
        selecting: true,
        selectOptions: [
          ' AMD Ryzen 5',
          ' Intel Core i5',
          ' Intel Core i9',
          ' Intel Core i7',
        ],
      },
      {
        type: 'text',
        label: 'socketType',
        label_pl: 'typ gniazda',
        selecting: true,
        selectOptions: [
          'Socket 1151',
          'Socket 1200',
          'Socket 1700',
          'Socket 2011-v3',
          'Socket 3647',
          'Socket 4189',
          'Socket AM4',
          'Socket AM5',
          'Socket sTRX4',
        ],
      },
      {
        type: 'number',
        label: 'numberOfCores',
        label_pl: 'ilosc rdzeni',
        selecting: true,
        selectOptions:[
          1,2,4,8,12,16,24
        ]
      },
      {
        type: 'number',
        label: 'numberOfThreads',
        label_pl: 'ilosc watkow',
        selecting: true,
        selectOptions:[
          1,2,4,8,12,16,24,32,48,
        ]
      },
      {
        type: 'number',
        label: 'l3Capacity',
        label_pl: 'pamiec 3 poziomu',
        selecting: true,
        selectOptions:[
          2,4,8,12,16,24
        ]
      },
    ],
  },
];
