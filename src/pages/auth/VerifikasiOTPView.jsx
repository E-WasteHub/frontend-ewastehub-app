import { FormVerifikasiOTP } from '../../components/fragments';
import AuthLayout from '../../components/layouts/AuthLayout';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const VerifikasiOTPView = () => {
  useDocumentTitle('Verifikasi OTP - E-WasteHub');

  return (
    <AuthLayout namaApp='EwasteHub'>
      <FormVerifikasiOTP />
    </AuthLayout>
  );
};

export default VerifikasiOTPView;
