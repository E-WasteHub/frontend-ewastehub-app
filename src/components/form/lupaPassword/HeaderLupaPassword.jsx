import useDarkMode from '../../../hooks/useDarkMode';

const HeaderLupaPassword = ({ logo }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className='text-center mb-8'>
      {/* Logo dan Judul */}
      <img src={logo} alt='Logo EWasteHub' className='mx-auto mb-4 w-24 h-24' />
      <h2
        className={`text-2xl font-bold mb-2 ${
          isDarkMode ? 'text-green-400' : 'text-green-600'
        }`}
      >
        EwasteHub
      </h2>

      <h1
        className={`text-3xl font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        Lupa Kata Sandi?
      </h1>
      <p
        className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}
      >
        Masukkan email Anda dan kami akan mengirimkan tautan untuk mereset kata
        sandi
      </p>
    </div>
  );
};

export default HeaderLupaPassword;
