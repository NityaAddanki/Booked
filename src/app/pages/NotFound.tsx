import { useNavigate } from 'react-router';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
      <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
      <button
        onClick={() => navigate("/")}
        className="bg-orange-400 text-black font-bold px-6 py-3 rounded-lg"
      >
        Go to Home
      </button>
    </div>
  );
}
