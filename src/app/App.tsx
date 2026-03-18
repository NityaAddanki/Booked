import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AppProvider } from './context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-full max-w-[430px] h-screen bg-white shadow-2xl overflow-auto hide-scrollbar">
          <RouterProvider router={router} />
        </div>
      </div>
    </AppProvider>
  );
}