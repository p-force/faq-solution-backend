export interface PriceConfig {
  deliveryTimeToPrice: { [key: string]: number };
  writerAndEditorLevelToPrice: { [key: string]: number };
}

export const PRICE_CONFIG: PriceConfig = {
  deliveryTimeToPrice: {
    '24h': 8,
    '2d': 7,
    '3d': 6,
    '4-5d': 5,
    '6-9d': 4.5,
    '11-15d': 4,
    '15+d': 3.5,
  },
  writerAndEditorLevelToPrice: {
    'A level / O level': 0.5,
    Undergraduate: 1,
    'Graduate/Masters': 1.5,
    PhD: 2,
  },
};
