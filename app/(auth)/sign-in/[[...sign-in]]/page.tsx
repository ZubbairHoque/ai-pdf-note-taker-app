import { SignIn } from '@clerk/nextjs';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'], // Specify weights if needed
  variable: '--font-roboto',
});

export default function Page() {
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