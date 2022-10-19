type infoDeviceType = [
  {
    createdAt: string;
    description: string;
    deviceId: number;
    id: number;
    title: string;
    updatedAt: string;
  }
];

export type deviceType = [
  {
    brandId: number;
    createdAt: string;
    id: number;
    img: string;
    info: infoDeviceType;
    name: string;
    price: number;
    rating: number;
    typeId: number;
    updatedAt: string;
  }
];
