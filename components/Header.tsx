import Link from 'next/link';
import Logo from './Logo';

const Header = () => {
  return (
    <div className='m-4' onClick={() => console.log('outer')}>
      <Link href='/'>
        <Logo />
      </Link>
    </div>
  );
};

export default Header;
