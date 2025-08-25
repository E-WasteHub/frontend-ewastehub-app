// src/views/EdukasiView.jsx
import { BookOpen } from 'lucide-react';
import { motion as Motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../components/elements';
import Pagination from '../components/elements/Pagination';
import MainLayout from '../components/layouts/MainLayout';
import useDarkMode from '../hooks/useDarkMode';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { indexEdukasi } from '../services/edukasiService'; // ✅ langsung pakai service

const EdukasiView = () => {
  useDocumentTitle('Edukasi | E-wasteHub');
  const { isDarkMode } = useDarkMode();

  // state lokal
  const [edukasiData, setEdukasiData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError('');
        const res = await indexEdukasi();
        setEdukasiData(res.data || res); // tergantung format respons API
      } catch (err) {
        setError(err.message || 'Gagal memuat edukasi');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(edukasiData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTopics = edukasiData.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MainLayout>
      {/* Hero */}
      <section
        className={`px-4 py-12 mt-12 text-center ${
          isDarkMode ? 'bg-slate-900' : 'bg-slate-50'
        }`}
      >
        <div className='max-w-4xl mx-auto'>
          <Badge variant='solid' intent='success' size='md' className='mb-4'>
            <BookOpen className='w-4 h-4 mr-2' />
            Pusat Edukasi EwasteHub
          </Badge>
          <h1
            className={`text-3xl md:text-5xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Tingkatkan Pengetahuan Anda
          </h1>
          <p
            className={`max-w-2xl mx-auto text-base md:text-xl ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Jelajahi berbagai artikel untuk memahami pentingnya pengelolaan
            sampah elektronik yang bertanggung jawab.
          </p>
        </div>
      </section>

      {/* Content */}
      <section
        className={`px-4 py-8 ${isDarkMode ? 'bg-slate-900/50' : 'bg-white'}`}
      >
        <div className='max-w-6xl mx-auto'>
          {isLoading && (
            <p className='text-center text-slate-500'>Loading konten...</p>
          )}
          {error && <p className='text-center text-red-500'>{error}</p>}

          {!isLoading && !error && (
            <>
              <Motion.div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {currentTopics.map((topic, index) => (
                  <Motion.div
                    key={topic.id_konten}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      to={`/edukasi/${topic.id_konten}`}
                      className='block h-full'
                    >
                      <article
                        className={`border rounded-xl overflow-hidden hover:border-green-500 transition ${
                          isDarkMode
                            ? 'bg-slate-800 border-slate-700'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        {topic.gambar && (
                          <div className='w-full h-48'>
                            <img
                              src={topic.gambar}
                              alt={topic.judul_konten}
                              className='w-full h-full object-cover'
                            />
                          </div>
                        )}
                        <div className='flex flex-col text-center flex-1 p-6'>
                          <h3
                            className={`text-lg font-semibold mb-3 ${
                              isDarkMode ? 'text-white' : 'text-slate-900'
                            }`}
                          >
                            {topic.judul_konten}
                          </h3>
                          <p
                            className={`text-sm line-clamp-4 ${
                              isDarkMode ? 'text-slate-400' : 'text-slate-600'
                            }`}
                          >
                            {topic.isi_konten.substring(0, 150)}...
                          </p>
                          <div className='flex items-center justify-end text-sm mt-auto'>
                            <span
                              className={`font-medium ${
                                isDarkMode ? 'text-green-400' : 'text-green-600'
                              }`}
                            >
                              Baca selengkapnya →
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </Motion.div>
                ))}
              </Motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={goToPage}
                  isDarkMode={isDarkMode}
                />
              )}
            </>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default EdukasiView;
