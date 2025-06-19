// Placeholder loader component for now
const Loader = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      <span className="ml-3 text-primary font-medium">Loading...</span>
    </div>
  );
};

export default Loader;