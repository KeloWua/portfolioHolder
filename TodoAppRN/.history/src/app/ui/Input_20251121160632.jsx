export default function Input({
  label,
  className = "",
  ...props
}) {
  return (
    <View className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-200">
          {label}
        </label>
      )}

      <input
        className={`
          w-full rounded-xl px-3 py-2
          bg-gray-800 text-white
          border border-gray-600
          focus:border-blue-400
          focus:ring-2 focus:ring-blue-500
          outline-none transition
          ${className}
        `}
        {...props}
      />
    </View>
  );
}
