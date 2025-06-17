'use client';

import { useQuery } from '@apollo/client';
import { GET_SAMPLE_DATA } from '@/graphql/queries/sample';

export default function SamplePage() {
  const { loading, error, data } = useQuery(GET_SAMPLE_DATA);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Sample Page</h1>
      <div className="space-y-4">
        <h2 className="text-xl">{data?.sample}</h2>
      </div>
    </div>
  );
}