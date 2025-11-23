export default function Modal({ children, onClose }) {
  return (
    <View
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/50 backdrop-blur-sm
        animate-fadeIn
      "
      onPress={onClose}
    >
      <View
        className="
          bg-white dark:bg-gray-800 
          text-gray-900 dark:text-gray-100
          p-6 rounded-2xl shadow-2xl
          w-[90%] max-w-md
          border border-gray-200 dark:border-gray-700
          animate-fadeIn
        "
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </View>
    </View>
  );
}
