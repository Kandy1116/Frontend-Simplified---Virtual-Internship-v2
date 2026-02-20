'use client';

import { useRouter } from 'next/navigation';

const ChoosePlanPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-10 bg-white rounded-lg shadow-xl text-center">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-gray-600 mb-8">This page is under construction. Please check back later to subscribe to a plan.</p>
        <button
          onClick={() => router.back()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ChoosePlanPage;
