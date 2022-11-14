import { atom } from 'recoil';

export const userState = atom({
  key: 'user',
  default: {
    name: 'user',
    email: 'test@test.com',
  },
});

export const urlState = atom({
  key: 'portfolioUrl',
  default: 'https://comic.naver.com/webtoon/weekday',
});
