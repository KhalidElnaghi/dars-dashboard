// import { redirect } from 'next/navigation';
// import { hasServerPermission } from 'src/utils/hasServerPermission';

import MainPage from 'src/sections/main/view';

export const metadata = {
  title: 'Dashboard | Main',
};

export default async function Page() {
  // if (!hasServerPermission('General.ViewHomePage')) {
  //   redirect('/dashboard/orders');
  // }

  return <MainPage />;
}
