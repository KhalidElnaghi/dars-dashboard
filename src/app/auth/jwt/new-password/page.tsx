import ModernNewPasswordView from 'src/sections/auth/jwt/modern-new-password-view';

export const metadata = {
  title: 'New Password',
};
interface IProps {
  searchParams: Promise<{ email: string }>;
}
export default async function ModernNewPasswordPage({ searchParams }: IProps) {
  const params = await searchParams;
  return <ModernNewPasswordView email={params?.email} />;
}
