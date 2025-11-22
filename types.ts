export enum AppState {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export enum CharcoalStyle {
  STANDARD = 'STANDARD',
  LIGHT = 'LIGHT',
  HEAVY = 'HEAVY',
  CROSS_HATCH = 'CROSS_HATCH'
}

export const CHARCOAL_STYLE_LABELS: Record<CharcoalStyle, string> = {
  [CharcoalStyle.STANDARD]: 'Standart',
  [CharcoalStyle.LIGHT]: 'Hafif Eskiz',
  [CharcoalStyle.HEAVY]: 'Yoğun Gölge',
  [CharcoalStyle.CROSS_HATCH]: 'Tarama (Hatching)',
};

export interface GeneratedImage {
  originalUrl: string;
  generatedUrl: string;
}

export interface ErrorState {
  message: string;
  details?: string;
}