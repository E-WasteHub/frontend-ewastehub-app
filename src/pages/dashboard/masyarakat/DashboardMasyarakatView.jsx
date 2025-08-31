import { Gift, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, SapaanDashboard } from '../../../components/elements';
import { RiwayatCard, StatCard } from '../../../components/fragments';
import useDashboardMasyarakat from '../../../hooks/masyarakat/useDashboardMasyarakat';
import useDarkMode from '../../../hooks/useDarkMode';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import usePengguna from '../../../hooks/usePengguna';

const DashboardMasyarakatView = () => {
  useDocumentTitle('Dashboard Masyarakat');
  const { isDarkMode } = useDarkMode();
  const { stats, requests, loading } = useDashboardMasyarakat();
  const { pengguna } = usePengguna();

  const safeStats = stats || {
    totalPoin: 0,
    totalPenjemputan: 0,
    sedangBerlangsung: 0,
  };

  return (
    <div
      className={`max-w-7xl mx-auto px-4 md:px-6 lg:px-8 ${
        isDarkMode ? 'bg-slate-900' : 'bg-slate-50'
      } space-y-3`}
    >
      <SapaanDashboard
        pengguna={pengguna}
        subtitle='Selamat datang di EWasteHub. Yuk kelola sampah elektronik kamu!'
      />

      {/* Statistik */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <StatCard
          label='Total Poin'
          value={safeStats.totalPoin}
          icon={<Gift className='w-6 h-6 text-green-500' />}
        />
        <StatCard
          label='Total Penjemputan'
          value={safeStats.totalPenjemputan}
          icon={<Truck className='w-6 h-6 text-green-500' />}
        />
        <StatCard
          label='Sedang Berlangsung'
          value={safeStats.sedangBerlangsung}
          icon={<Truck className='w-6 h-6 text-green-500' />}
        />
      </div>

      {/* Riwayat */}
      <Card
        className={`${
          isDarkMode
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-slate-200'
        } border`}
      >
        <div className='p-4 md:p-6 space-y-6'>
          <div className='flex justify-between items-center'>
            <h2
              className={`text-lg font-semibold ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              Riwayat Penjemputan Terbaru
            </h2>
            <Link
              to='/dashboard/masyarakat/riwayat'
              className='text-sm font-medium text-green-600 hover:underline'
            >
              Lihat Semua
            </Link>
          </div>

          {loading ? (
            <p className='text-center text-gray-400'>⏳ Memuat data...</p>
          ) : requests.length > 0 ? (
            <div className='grid gap-4'>
              {requests.slice(0, 3).map((req) => (
                <RiwayatCard key={req.kodePenjemputan || req.kode} req={req} />
              ))}
            </div>
          ) : (
            <p
              className={`text-sm text-center ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Belum ada riwayat penjemputan
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default DashboardMasyarakatView;
