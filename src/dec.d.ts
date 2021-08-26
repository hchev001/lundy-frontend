declare module 'tailwindcss/resolveConfig';

declare module '~/common/tailwindcss.js' {

    interface TailwindColors {
      // 色定義
  
      [key: string]: string | Record<string, string>
    }
    export const colors: TailwindColors
  }