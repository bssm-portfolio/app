import { urlState } from '@/store';
import { useRecoilState } from 'recoil';

const SideMenu = () => {
  const [_, setUrl] = useRecoilState(urlState);
  return (
    <div className='bg-blue-100 w-full h-full flex flex-col gap-2'>
      <button
        className='bg-blue-50 p-10'
        onClick={() => setUrl('https://www.nexon.com/Home/Game')}
      >
        nexon
      </button>
      <button
        className='bg-blue-50 p-10'
        onClick={() =>
          setUrl(
            'https://section.blog.naver.com/BlogHome.naver?directoryNo=0&currentPage=1&groupId=0'
          )
        }
      >
        naver blog
      </button>
      <button
        className='bg-blue-50 p-10'
        onClick={() => setUrl('https://comic.naver.com/webtoon/weekday')}
      >
        naver webtoon
      </button>
    </div>
  );
};

export default SideMenu;
