import { SignIn, useUser } from '@clerk/nextjs';
import { Roboto } from 'next/font/google';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'], // Specify weights if needed
  variable: '--font-roboto',
});

export default function Page() {
  const { user } = useUser();
  const router = useRouter();
  const userInfo = useQuery(api.user.GetUserInfo, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });

  useEffect(() => {
    if (user) {
      if (!userInfo) {
        router.push('/sign-up');
      } else {
        router.push('/dashboard');
      }
    }
  }, [user, userInfo, router]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: roboto.style.fontFamily, // Apply Roboto font
      }}
    >
      <SignIn />
    </div>
  );
}