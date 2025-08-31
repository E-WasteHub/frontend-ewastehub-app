// src/components/fragments/lacak/ItemSampahCard.jsx
const ItemSampahCard = ({ s, isDarkMode }) => (
  <div
    className={`flex items-start gap-4 p-4 rounded-lg border shadow-sm transition-colors
      ${
        isDarkMode
          ? 'bg-slate-700 border-slate-600'
          : 'bg-white border-gray-200'
      }
    `}
  >
    {/* Foto */}
    {s.gambar_url ? (
      <img
        src={s.gambar_url}
        alt={s.nama_jenis}
        className='w-20 h-20 rounded-lg object-cover shadow-md'
      />
    ) : (
      <div
        className={`w-20 h-20 flex items-center justify-center rounded-lg text-xs shadow-inner
          ${
            isDarkMode
              ? 'bg-slate-600 text-gray-400'
              : 'bg-gray-200 text-gray-500'
          }
        `}
      >
        No Foto
      </div>
    )}

    {/* Detail */}
    <div className='flex-1 text-sm'>
      <p className='font-semibold'>{s.nama_kategori}</p>
      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
        {s.nama_jenis} •{' '}
        <span className='font-medium'>{s.jumlah_sampah} pcs</span> •{' '}
        <span className='font-medium text-green-500'>
          {s.poin_sampah || 0} poin
        </span>
      </p>
      {s.catatan_sampah && (
        <p className='text-xs italic mt-1 text-gray-500'>
          Catatan: {s.catatan_sampah}
        </p>
      )}
    </div>
  </div>
);

export default ItemSampahCard;
