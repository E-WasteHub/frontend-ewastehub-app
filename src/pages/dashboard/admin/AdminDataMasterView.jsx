import DatamasterCard from '../../../components/fragments/dashboard/DatamasterCard';
import useDarkMode from '../../../hooks/useDarkMode';

const AdminDataMasterView = () => {
  const { isDarkMode } = useDarkMode();
  return (
    <div className='max-w-7xl mx-auto p-4 md:p-6'>
      <div className='space-y-6'>
        {/* Header */}
        <div>
          <h1
            className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Data Master
          </h1>
          <p
            className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            } mt-1`}
          >
            Kelola semua data master sistem E-WasteHub
          </p>
        </div>

        {/* Cards Grid */}
        <div>
          <DatamasterCard />
        </div>
      </div>
    </div>
  );
};

export default AdminDataMasterView;
