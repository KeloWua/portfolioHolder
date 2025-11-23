import {}

export default function Button({ children, className = "", variant = "primary", ...props }) {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-200 active:scale-95";
  
const variants = {
  primary: "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-md hover:shadow-lg",
  secondary: "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-900 dark:text-white",
  danger: "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white shadow-md hover:shadow-lg",
  success: "bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-md hover:shadow-lg",

  // --- Nuevos Variant ---
  info: "bg-cyan-500 hover:bg-cyan-600 text-white shadow-sm hover:shadow-md",
  warning: "bg-yellow-400 hover:bg-yellow-500 text-gray-900 shadow-sm hover:shadow-md",

  outline: "border border-gray-400 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-500 dark:hover:bg-gray-700",

  ghost: "bg-transparent text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20",

  subtle: "bg-blue-100 hover:bg-blue-200 text-blue-800 dark:bg-blue-900 dark:hover:bg-blue-800 dark:text-blue-100",

  gradientBlue: "bg-gradient-to-r from-blue-500 to-indigo-500 hover:opacity-90 text-white shadow-md",

  gradientBluePrimary:
  "relative bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 \
   text-white font-semibold shadow-xl \
   hover:shadow-2xl hover:brightness-110 \
   active:scale-[0.98] \
   border border-blue-400/40 \
   dark:border-blue-300/30 \
   transition-all duration-200",

  
  gradientPink: "bg-gradient-to-r from-pink-500 to-rose-500 hover:opacity-90 text-white shadow-md",

  softGreen: "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 dark:text-green-100",

  elevated: "bg-white text-gray-900 shadow-lg hover:shadow-xl border border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600",
};


  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
