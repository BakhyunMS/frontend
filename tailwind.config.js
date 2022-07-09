/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('/static/images/hero.webp')"
      },
      fontFamily: {
        'pretandard-regular': 'Pretendard-Regular',
        'pretandard-bold': 'Pretendard-Bold',
        'pretandard-extrabold': 'Pretendard-ExtraBold',
        'pretandard-light': 'Pretendard-Light',
        'pretandard-medium': 'Pretendard-Medium',
        'pretandard-semibold': 'Pretendard-SemiBold',
        'pretandard-thin': 'Pretendard-Thin',
        'pretandard-extralight': 'Pretendard-ExtraLight'
      }
    }
  },
  plugins: []
}
