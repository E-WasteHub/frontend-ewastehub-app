// src/pages/auth/LoginPage.jsx
import FormLogin from '../../components/fragments/forms/FormLogin';
import AuthLayout from '../../components/layouts/AuthLayout';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const LoginView = () => {
  useDocumentTitle('Masuk - E-WasteHub');

  return (
    <AuthLayout namaApp='EwasteHub' maxWidth='max-w-2xl'>
      <FormLogin />
    </AuthLayout>
  );
};

export default LoginView;
