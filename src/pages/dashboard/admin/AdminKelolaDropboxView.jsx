// src/pages/admin/dropbox/AdminKelolaDropboxView.jsx
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import DropboxCrudModal from '../../../components/fragments/admincrud/DropboxCrudModal';
import AlertModal from '../../../components/fragments/modals/AlertModal';
import ConfirmModal from '../../../components/fragments/modals/ConfirmModal';
import useAdminCrud from '../../../hooks/useAdminCrud';
import * as dropboxService from '../../../services/dropboxService';

const AdminKelolaDropboxView = () => {
  const {
    data: dropbox,
    isLoading,
    error,
    tambah,
    ubah,
    hapus,
    isSubmitting,
  } = useAdminCrud(dropboxService);

  const [crudOpen, setCrudOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState(null);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: '',
    message: '',
    type: 'info',
  });

  // Tambah / Ubah
  const handleCrudSubmit = async (formValues) => {
    if (editTarget) {
      const res = await ubah(editTarget.id_dropbox, formValues);
      setAlertConfig({
        title: res.success ? 'Berhasil' : 'Gagal',
        message: res.success
          ? 'Dropbox berhasil diperbarui'
          : res.error || 'Dropbox gagal diperbarui',
        type: res.success ? 'success' : 'error',
      });
    } else {
      const res = await tambah(formValues);
      setAlertConfig({
        title: res.success ? 'Berhasil' : 'Gagal',
        message: res.success
          ? 'Dropbox berhasil ditambahkan'
          : res.error || 'Dropbox gagal ditambahkan',
        type: res.success ? 'success' : 'error',
      });
    }

    setCrudOpen(false);
    setEditTarget(null);
    setAlertOpen(true);
  };

  // Hapus
  const handleDelete = async () => {
    if (!confirmTarget) return;
    const res = await hapus(confirmTarget);
    setAlertConfig({
      title: res.success ? 'Berhasil' : 'Gagal',
      message: res.success
        ? 'Dropbox berhasil dihapus'
        : res.error || 'Dropbox gagal dihapus',
      type: res.success ? 'success' : 'error',
    });
    setConfirmOpen(false);
    setAlertOpen(true);
  };

  const columns = [
    {
      name: 'Nama Dropbox',
      selector: (row) => row.nama_dropbox,
      sortable: true,
    },
    {
      name: 'Koordinat',
      selector: (row) => `${row.latitude}, ${row.longitude}`,
    },
    {
      name: 'Daerah',
      selector: (row) => row.nama_daerah || '-',
    },
    {
      name: 'Aksi',
      cell: (row) => (
        <div className='flex gap-2'>
          <button
            onClick={() => {
              setEditTarget(row);
              setCrudOpen(true);
            }}
            className='px-3 py-1 bg-yellow-500 text-white rounded'
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => {
              setConfirmTarget(row.id_dropbox);
              setConfirmOpen(true);
            }}
            className='px-3 py-1 bg-red-600 text-white rounded'
          >
            🗑 Hapus
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className='max-w-7xl mx-auto p-6 space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Kelola Dropbox</h1>
        <button
          onClick={() => {
            setEditTarget(null);
            setCrudOpen(true);
          }}
          className='px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700'
        >
          ➕ Tambah Dropbox
        </button>
      </div>

      {isLoading ? (
        <p>⏳ Memuat data...</p>
      ) : error ? (
        <p className='text-red-500'>{error}</p>
      ) : (
        <DataTable
          columns={columns}
          data={dropbox}
          pagination
          highlightOnHover
          striped
          dense
        />
      )}

      {/* Modal CRUD */}
      <DropboxCrudModal
        isOpen={crudOpen}
        onClose={() => {
          setCrudOpen(false);
          setEditTarget(null);
        }}
        onSubmit={handleCrudSubmit}
        initialData={editTarget}
        isLoading={isSubmitting}
        title={editTarget ? 'Edit Dropbox' : 'Tambah Dropbox'}
      />

      {/* Modal Confirm */}
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title='Konfirmasi Hapus'
        message='Apakah Anda yakin ingin menghapus dropbox ini?'
        confirmType='danger'
        confirmText='Hapus'
        cancelText='Batal'
        isLoading={isSubmitting}
      />

      {/* Modal Alert */}
      <AlertModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
      />
    </div>
  );
};

export default AdminKelolaDropboxView;
