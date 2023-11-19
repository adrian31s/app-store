import { ProductCategory } from 'client/src/app/api/models/product-category';

export const productCommonFieldsUtil: any[] = [
  {
    type: 'alpha',
    label: 'name',
  },
  {
    type: 'alpha',
    label: 'producer',
  },
  {
    type: 'alpha',
    label: 'guarantee',
  },
  {
    type: 'alpha',
    label: 'model',
  },
  {
    type: 'num',
    label: 'price',
  },
  {
    type: 'int',
    label: 'quantity',
  },
];


export const productTypesFieldsUtil: any[] = [
  {
    category: ProductCategory.Charger,
    labels: [
      {
        type: 'alpha',
        label: 'power',
      },
      {
        type: 'alpha',
        label: 'standard',
      },
      {
        type: 'int',
        label: 'noise',
      },
      {
        type: 'alpha',
        label: 'coolingType',
      },
      {
        type: 'int',
        label: 'width',
      },
      {
        type: 'int',
        label: 'height',
      },
      {
        type: 'int',
        label: 'depth',
      },
    ],
  },
  {
    category: ProductCategory.Cooler,
    labels: [
      {
        type: 'alpha',
        label: 'type',
      },
      {
        type: 'int',
        label: 'maxRotationSpeed',
      },
      {
        type: 'int',
        label: 'maxVolume',
      },
      {
        type: 'int',
        label: 'supplyVoltage',
      },
      {
        type: 'alpha',
        label: 'coolerType',
      },
    ],
  },
  {
    category: ProductCategory.DramMemory,
    labels: [
      {
        type: 'alpha',
        label: 'latencyCycle',
      },
      {
        type: 'alpha',
        label: 'memoryType',
      },
      {
        type: 'alpha',
        label: 'frequency',
      },
      {
        type: 'int',
        label: 'memory',
      },
    ],
  },
  {
    category: ProductCategory.GraphicCard,
    labels: [
      {
        type: 'alpha',
        label: 'memoryChipset',
      },
      {
        type: 'alpha',
        label: 'connectorType',
      },
      {
        type: 'alpha',
        label: 'memoryType',
      },
      {
        type: 'alpha',
        label: 'memoryClocking',
      },
      {
        type: 'int',
        label: 'memory',
      },
    ],
  },
  {
    category: ProductCategory.HardDrive,
    labels: [
      {
        type: 'alpha',
        label: 'memoryInterface',
      },
      {
        type: 'alpha',
        label: 'memoryType',
      },
      {
        type: 'int',
        label: 'memory',
      },
    ],
  },
  {
    category: ProductCategory.Motherboard,
    labels: [
      {
        type: 'alpha',
        label: 'motherboardStandard',
      },
      {
        type: 'alpha',
        label: 'processorSocket',
      },
      {
        type: 'alpha',
        label: 'memoryType',
      },
      {
        type: 'int',
        label: 'maxMemory',
      },
    ],
  },
  {
    category: ProductCategory.PcCase,
    labels: [
      {
        type: 'num',
        label: 'width',
      },
      {
        type: 'num',
        label: 'length',
      },
      {
        type: 'num',
        label: 'depth',
      },
    ],
  },
  {
    category: ProductCategory.Processor,
    labels: [
      {
        type: 'alpha',
        label: 'processorType',
      },
      {
        type: 'alpha',
        label: 'socketType',
      },
      {
        type: 'int',
        label: 'numberOfCores',
      },
      {
        type: 'int',
        label: 'numberOfThreads',
      },
      {
        type: 'int',
        label: 'l3Capacity',
      },
    ],
  },
];

