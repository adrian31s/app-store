import { ProductCategory } from 'client/src/app/api/models/product-category';

export const productCommonFieldsUtil: any[] = [
  {
    type: 'text',
    label: 'name',
  },
  {
    type: 'text',
    label: 'producer',
  },
  {
    type: 'text',
    label: 'guarantee',
  },
  {
    type: 'text',
    label: 'model',
  },
  {
    type: 'number',
    label: 'price',
  },
  {
    type: 'number',
    label: 'quantity',
  },
];


export const productTypesFieldsUtil: any[] = [
  {
    category: ProductCategory.Charger,
    labels: [
      {
        type: 'text',
        label: 'power',
      },
      {
        type: 'text',
        label: 'standard',
      },
      {
        type: 'number',
        label: 'noise',
      },
      {
        type: 'text',
        label: 'coolingType',
      },
      {
        type: 'number',
        label: 'width',
      },
      {
        type: 'number',
        label: 'height',
      },
      {
        type: 'number',
        label: 'depth',
      },
    ],
  },
  {
    category: ProductCategory.Cooler,
    labels: [
      {
        type: 'text',
        label: 'type',
      },
      {
        type: 'number',
        label: 'maxRotationSpeed',
      },
      {
        type: 'number',
        label: 'maxVolume',
      },
      {
        type: 'number',
        label: 'supplyVoltage',
      },
      {
        type: 'text',
        label: 'coolerType',
      },
    ],
  },
  {
    category: ProductCategory.DramMemory,
    labels: [
      {
        type: 'text',
        label: 'latencyCycle',
      },
      {
        type: 'text',
        label: 'memoryType',
      },
      {
        type: 'text',
        label: 'frequency',
      },
      {
        type: 'number',
        label: 'memory',
      },
    ],
  },
  {
    category: ProductCategory.GraphicCard,
    labels: [
      {
        type: 'text',
        label: 'memoryChipset',
      },
      {
        type: 'text',
        label: 'connectorType',
      },
      {
        type: 'text',
        label: 'memoryType',
      },
      {
        type: 'text',
        label: 'memoryClocking',
      },
      {
        type: 'number',
        label: 'memory',
      },
    ],
  },
  {
    category: ProductCategory.HardDrive,
    labels: [
      {
        type: 'text',
        label: 'memoryInterface',
      },
      {
        type: 'text',
        label: 'memoryType',
      },
      {
        type: 'number',
        label: 'memory',
      },
    ],
  },
  {
    category: ProductCategory.Motherboard,
    labels: [
      {
        type: 'text',
        label: 'motherboardStandard',
      },
      {
        type: 'text',
        label: 'processorSocket',
      },
      {
        type: 'text',
        label: 'memoryType',
      },
      {
        type: 'number',
        label: 'maxMemory',
      },
    ],
  },
  {
    category: ProductCategory.PcCase,
    labels: [
      {
        type: 'number',
        label: 'width',
      },
      {
        type: 'number',
        label: 'length',
      },
      {
        type: 'number',
        label: 'depth',
      },
    ],
  },
  {
    category: ProductCategory.Processor,
    labels: [
      {
        type: 'text',
        label: 'processorType',
      },
      {
        type: 'text',
        label: 'socketType',
      },
      {
        type: 'number',
        label: 'numberOfCores',
      },
      {
        type: 'number',
        label: 'numberOfThreads',
      },
      {
        type: 'number',
        label: 'l3Capacity',
      },
    ],
  },
];

