// @preval
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from './tailwind.config';

const config = resolveConfig(tailwindConfig);

module.exports =  {colors: config.theme.colors, }