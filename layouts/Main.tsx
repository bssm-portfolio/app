import { ReactNode } from 'react';
import { Header, Navigator } from '@/components';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <Navigator />
      <div className='m-6'>{children}</div>
    </>
  );
};

export default MainLayout;
