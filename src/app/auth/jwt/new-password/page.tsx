import ModernNewPasswordView from "src/sections/auth/jwt/modern-new-password-view";

export const metadata = {
  title: 'Auth Modern: New Password',
};
interface IProps{
  searchParams:{email:string}
}
export default function ModernNewPasswordPage({searchParams}:IProps) {
  return <ModernNewPasswordView email={searchParams?.email} />;
}
