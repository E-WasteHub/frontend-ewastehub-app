import { BookText, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Badge from '../components/common/Badge';
import { panduanData } from '../data/panduanData';
import useDarkMode from '../hooks/useDarkMode';
import useDocumentTitle from '../hooks/useDocumentTitle';
import MainLayout from '../layouts/MainLayout';

const PanduanAplikasiPage = () => {
  useDocumentTitle('Panduan | E-wasteHub');
  const { isDarkMode } = useDarkMode();
  const [activeStep, setActiveStep] = useState(null);

  const toggleStep = (index) => {
    setActiveStep(activeStep === index ? null : index);
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section
        className={`px-4 py-12 mt-12 sm:py-16 md:py-20 text-center ${
          isDarkMode ? 'bg-slate-900' : 'bg-slate-50'
        }`}
      >
        <div className='max-w-4xl mx-auto'>
          <Badge
            variant='soft'
            color='green'
            size='md'
            className='mb-4 sm:mb-6'
          >
            <BookText className='w-4 h-4 mr-2' />
            Panduan Aplikasi
          </Badge>

          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Cara Menggunakan{' '}
            <span className={isDarkMode ? 'text-green-400' : 'text-green-600'}>
              E-wasteHub
            </span>
          </h1>

          <p
            className={`max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Ikuti 5 langkah mudah ini untuk mulai mengelola sampah elektronik
            Anda dan dapatkan reward menarik.
          </p>
        </div>
      </section>

      {/* Guide Steps */}
      <section
        className={`px-4 py-8 sm:py-12 ${
          isDarkMode ? 'bg-slate-900/50' : 'bg-white'
        }`}
      >
        <div className='max-w-4xl mx-auto'>
          <div className='space-y-6'>
            {panduanData.map((step, index) => {
              const isActive = activeStep === index;
              const { Icon } = step;

              return (
                <div
                  key={step.id}
                  className={`group rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? isDarkMode
                        ? 'border-green-500/50 bg-slate-800'
                        : 'border-green-500 bg-white shadow-md'
                      : isDarkMode
                      ? 'border-slate-700/50 bg-slate-800/50 hover:bg-slate-800'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  {/* Step Header */}
                  <div
                    className='flex items-center gap-4 p-6 cursor-pointer'
                    onClick={() => toggleStep(index)}
                  >
                    {/* Step Number & Icon */}
                    <div className='relative flex-shrink-0'>
                      <div className='w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center text-white font-bold'>
                        {step.number}
                      </div>
                      {Icon && (
                        <div
                          className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${
                            isDarkMode ? 'bg-slate-800' : 'bg-white'
                          }`}
                        >
                          <Icon size={14} className='text-green-600' />
                        </div>
                      )}
                    </div>

                    {/* Step Content */}
                    <div className='flex-1'>
                      <h3
                        className={`text-lg font-semibold mb-1 ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`text-sm ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>

                    {/* Expand Button */}
                    <div
                      className={`flex items-center gap-2 text-sm font-medium ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      <span>{isActive ? 'Tutup' : 'Detail'}</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${
                          isActive ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isActive && (
                    <div
                      className={`px-6 pb-6 border-t ${
                        isDarkMode ? 'border-slate-700' : 'border-gray-200'
                      }`}
                    >
                      <div className='pt-4 space-y-4'>
                        {/* Detailed Steps */}
                        <div className='space-y-3'>
                          <h4
                            className={`font-medium ${
                              isDarkMode ? 'text-white' : 'text-slate-900'
                            }`}
                          >
                            Langkah Detail:
                          </h4>
                          {step.steps?.map((stepItem, stepIndex) => (
                            <div
                              key={stepIndex}
                              className='flex items-start gap-3'
                            >
                              <div className='w-5 h-5 rounded-full bg-green-600 flex items-center justify-center text-xs text-white font-medium mt-0.5 flex-shrink-0'>
                                {stepIndex + 1}
                              </div>
                              <p
                                className={`text-sm ${
                                  isDarkMode
                                    ? 'text-slate-300'
                                    : 'text-slate-700'
                                }`}
                              >
                                {stepItem}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Tips */}
                        {step.tips && (
                          <div
                            className={`p-4 rounded-xl border-l-4 border-green-500 ${
                              isDarkMode ? 'bg-green-900/20' : 'bg-green-50'
                            }`}
                          >
                            <div className='flex items-start gap-2'>
                              <span
                                className={`font-medium ${
                                  isDarkMode
                                    ? 'text-green-300'
                                    : 'text-green-800'
                                }`}
                              >
                                💡 Tips:
                              </span>
                              <span
                                className={`text-sm ${
                                  isDarkMode
                                    ? 'text-green-400'
                                    : 'text-green-700'
                                }`}
                              >
                                {step.tips}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default PanduanAplikasiPage;
