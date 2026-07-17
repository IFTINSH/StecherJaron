import { localeString } from './localeString';
import { localeText } from './localeText';
import { about } from './about';
import { howToBook } from './howToBook';
import { category } from './category';
import { tattoo } from './tattoo';
import { event } from './event';
import { studioImage } from './studioImage';
import { wannados } from './wannados';

export const schemaTypes = [
  // i18n field types (must be registered before the docs that use them)
  localeString,
  localeText,
  about,
  howToBook,
  category,
  tattoo,
  event,
  studioImage,
  wannados,
];
