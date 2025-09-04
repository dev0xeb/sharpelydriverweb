// Common CSS class combinations
export const buttonStyles = {
  primary: 'w-full bg-gray-800 text-white rounded-xl p-4 font-bold text-lg border-none cursor-pointer transition-colors hover:bg-gray-600',
  primaryAction: 'bg-red-600 text-white hover:bg-red-700 px-6 py-3 rounded-lg font-medium transition-colors',
  secondary: 'w-full px-6 py-4 text-center border border-gray-300 rounded-xl bg-white text-red-600 font-bold cursor-pointer transition-all duration-200 hover:bg-red-50 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50',
  secondaryAction: 'border border-gray-300 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium text-gray-700 transition-colors',
  outline: 'px-8 py-3 rounded-xl border-2 border-red-600 bg-white text-red-600 font-semibold text-lg transition-all duration-200 hover:bg-red-50',
  outlineActive: 'px-8 py-3 rounded-xl border-2 border-red-600 bg-red-50 text-red-600 font-semibold text-lg transition-all duration-200',
  danger: 'bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors'
};

export const inputStyles = {
  default: 'w-full p-4 border border-gray-300 rounded-xl text-base outline-none box-border transition-colors focus:border-blue-500',
  withBackground: 'w-full p-4 border border-gray-300 rounded-xl text-base outline-none box-border transition-colors focus:border-blue-500 bg-gray-50'
};

export const containerStyles = {
  page: 'min-h-screen bg-white flex flex-col p-4 sm:p-6 lg:p-8',
  pageCard: 'min-h-screen flex flex-col items-center bg-white p-4 sm:p-6 lg:p-8',
  card: 'w-full max-w-md lg:max-w-4xl bg-white rounded-2xl shadow-none lg:shadow-lg p-0 lg:p-10 flex flex-col items-center',
  cardShadow: 'bg-white rounded-xl shadow-sm',
  form: 'w-full max-w-md lg:max-w-lg mx-auto',
  formWide: 'w-full max-w-md lg:max-w-2xl mx-auto'
};

export const layoutStyles = {
  appLayout: 'min-h-screen bg-gray-100 flex flex-col lg:flex-row',
  sidebar: 'hidden lg:flex w-64 bg-white shadow-lg flex-col',
  mobileTopBar: 'lg:hidden bg-white shadow-sm border-b border-gray-200 p-4',
  mobileBottomNav: 'lg:hidden bg-white border-t border-gray-200 px-4 py-3',
  mainContent: 'flex-1 flex flex-col',
  contentHeader: 'hidden lg:block bg-white shadow-sm border-b border-gray-200 p-6'
};

export const textStyles = {
  title: 'font-bold text-xl lg:text-2xl text-gray-900',
  subtitle: 'font-normal text-lg lg:text-xl text-gray-700',
  sectionTitle: 'font-bold text-xl lg:text-2xl text-gray-900 mb-2',
  sectionSubtitle: 'font-normal text-sm lg:text-base text-gray-700 leading-relaxed',
  label: 'font-medium text-sm text-gray-900 mb-3',
  helper: 'font-normal text-xs lg:text-sm text-gray-600'
};

// Utility function to combine classes
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};
