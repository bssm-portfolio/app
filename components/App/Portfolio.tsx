import { urlState } from '@/store';
import { useRecoilState } from 'recoil';

const Portfolio = () => {
  const [url] = useRecoilState(urlState);
  return (
    <div className='bg-red-100 w-full h-full'>
      <iframe className='w-full h-full' src={url}>
        portfolio 가 들어가야 할 곳
      </iframe>
    </div>
  );
};

export default Portfolio;
