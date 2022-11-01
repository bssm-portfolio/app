import Link from 'next/link';

const Navigator = () => {
  return (
    <div className='m-4'>
      <Link href='signin'>로그인</Link>
      <Link href='signup'>회원가입</Link>
    </div>
  );
};

export default Navigator;
