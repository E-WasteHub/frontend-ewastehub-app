import useDarkMode from '../../../hooks/useDarkMode';

const Badge = ({
  variant = 'solid', // bentuk: solid, soft, outline
  intent = 'secondary', // tujuan warna: success, danger, warning, secondary
  size = 'md', // ukuran: sm, md, lg
  className = '',
  children,
  ...props
}) => {
  const { isDarkMode } = useDarkMode();

  // ukuran badge
  const sizeMap = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  // warna & tema
  const colorMap = {
    success: {
      light: {
        solid: 'bg-green-100 text-green-700',
        soft: 'bg-green-50 text-green-700 border border-green-200',
        outline: 'border border-green-300 text-green-700',
      },
      dark: {
        solid: 'bg-green-600/30 text-green-300',
        soft: 'bg-green-500/10 text-green-400 border border-green-600/30',
        outline: 'border border-green-500/50 text-green-300',
      },
    },
    danger: {
      light: {
        solid: 'bg-red-100 text-red-700',
        soft: 'bg-red-50 text-red-700 border border-red-200',
        outline: 'border border-red-300 text-red-700',
      },
      dark: {
        solid: 'bg-red-600/30 text-red-300',
        soft: 'bg-red-500/10 text-red-400 border border-red-600/30',
        outline: 'border border-red-500/50 text-red-300',
      },
    },
    warning: {
      light: {
        solid: 'bg-yellow-100 text-yellow-800',
        soft: 'bg-yellow-50 text-yellow-800 border border-yellow-200',
        outline: 'border border-yellow-300 text-yellow-800',
      },
      dark: {
        solid: 'bg-yellow-600/30 text-yellow-300',
        soft: 'bg-yellow-500/10 text-yellow-400 border border-yellow-600/30',
        outline: 'border border-yellow-500/50 text-yellow-300',
      },
    },
    secondary: {
      light: {
        solid: 'bg-gray-200 text-gray-700',
        soft: 'bg-gray-100 text-gray-700 border border-gray-200',
        outline: 'border border-gray-400 text-gray-700',
      },
      dark: {
        solid: 'bg-slate-700 text-slate-300',
        soft: 'bg-slate-600/20 text-slate-300 border border-slate-600/30',
        outline: 'border border-slate-500/50 text-slate-300',
      },
    },
  };

  const themeMode = isDarkMode ? 'dark' : 'light';
  const styles = colorMap[intent]?.[themeMode]?.[variant] || '';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${sizeMap[size]} ${styles} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
