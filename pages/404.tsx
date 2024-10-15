import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Button } from '@nextui-org/button';

const Custom404: NextPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-8">The page you are looking for does not exist.</p>
      <Button color="primary" onClick={() => router.push('/')}>
        Go back to home
      </Button>
    </div>
  );
};

export default Custom404;