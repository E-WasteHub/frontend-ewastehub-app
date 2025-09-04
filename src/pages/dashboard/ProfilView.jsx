import { useState } from 'react';
import { Alert } from '../../components/elements';
import {
  FormProfilData,
  FormUbahKataSandi,
  FormUploadDokumen,
} from '../../components/fragments';
import useDarkMode from '../../hooks/useDarkMode';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useProfil from '../../hooks/useProfil';

const ProfilView = () => {
  useDocumentTitle('Pengaturan Profil');
  const { isDarkMode } = useDarkMode();

  // 🔹 Ambil data & actions dari hook profil
  const {
    form,
    setForm,
    files,
    setFiles,
    peran,
    isLoading,
    error,
    updateProfil,
    ubahPassword,
    uploadDokumen,
  } = useProfil();

  // ===== STATE UI =====
  const [activeTab, setActiveTab] = useState('profil');
  const [alert, setAlert] = useState({ open: false, type: '', message: '' });

  // ===== HANDLER: SIMPAN PROFIL =====
  const handleSaveProfil = async () => {
    const result = await updateProfil();
    setAlert({
      open: true,
      type: result.success ? 'success' : 'error',
      message: result.success
        ? 'Profil berhasil diperbarui ✅'
        : result.error || 'Gagal memperbarui profil ❌',
    });
  };

  // ===== HANDLER: UBAH PASSWORD =====
  const handleUbahKataSandi = async (payload) => {
    const result = await ubahPassword(payload);
    setAlert({
      open: true,
      type: result.success ? 'success' : 'error',
      message: result.success
        ? 'Kata sandi berhasil diubah ✅'
        : result.error || 'Gagal mengubah kata sandi ❌',
    });
  };

  // ===== HANDLER: UPLOAD DOKUMEN =====
  const handleUploadDokumen = async () => {
    const result = await uploadDokumen();
    setAlert({
      open: true,
      type: result.success ? 'success' : 'error',
      message: result.success
        ? 'Dokumen berhasil diunggah ✅'
        : result.error || 'Gagal mengunggah dokumen ❌',
    });
  };

  // ===== MENU PROFIL =====
  const menuItems = [
    { key: 'profil', label: 'Data Profil' },
    { key: 'password', label: 'Ubah Password' },
    // Cek peran dengan enum backend yang exact
    ...(peran === 'Mitra Kurir'
      ? [{ key: 'dokumen', label: 'Unggah Dokumen' }]
      : []),
  ];

  return (
    <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 p-6'>
      {/* ===== SIDEBAR MENU ===== */}
      <div className='md:col-span-1'>
        <div
          className={`shadow rounded-lg p-4 space-y-2 ${
            isDarkMode ? 'bg-slate-800' : 'bg-white'
          }`}
        >
          <h2
            className={`text-lg font-semibold mb-4 ${
              isDarkMode ? 'text-slate-100' : 'text-gray-800'
            }`}
          >
            Menu Profil
          </h2>
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                activeTab === item.key
                  ? isDarkMode
                    ? 'bg-green-900 text-green-300 font-medium'
                    : 'bg-green-100 text-green-700 font-medium'
                  : isDarkMode
                  ? 'hover:bg-slate-700 text-slate-200'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className='md:col-span-3'>
        <div
          className={`shadow rounded-lg p-6 ${
            isDarkMode
              ? 'bg-slate-800 text-slate-100'
              : 'bg-white text-gray-900'
          }`}
        >
          {error && <Alert type='error' message={error} />}

          {activeTab === 'profil' && (
            <FormProfilData
              {...form}
              isLoading={isLoading}
              onChange={(field, value) =>
                setForm((prev) => ({ ...prev, [field]: value }))
              }
              onPhotoChange={(file) =>
                setForm((prev) => ({ ...prev, gambar_pengguna: file }))
              }
              onSave={handleSaveProfil}
            />
          )}

          {activeTab === 'password' && (
            <FormUbahKataSandi
              onSave={handleUbahKataSandi}
              isLoading={isLoading}
            />
          )}

          {activeTab === 'dokumen' && peran === 'Mitra Kurir' && (
            <FormUploadDokumen
              files={files}
              onFileChange={(key, file) =>
                setFiles((prev) => ({ ...prev, [key]: file }))
              }
              onSave={handleUploadDokumen}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>

      {/* ===== ALERT INFO ===== */}
      {alert.open && <Alert type={alert.type} message={alert.message} />}
    </div>
  );
};

export default ProfilView;
