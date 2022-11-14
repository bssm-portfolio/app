import Link from 'next/link';
import { Logo } from '@/components';
import { useRecoilState } from 'recoil';
import { userState } from '@/store';
const Header = () => {
  const [user] = useRecoilState(userState);

  return (
    <div className='m-4' onClick={() => console.log('outer')}>
      <Link href='/'>
        <Logo />
        {user.name}
      </Link>
    </div>
  );
};

export default Header;
