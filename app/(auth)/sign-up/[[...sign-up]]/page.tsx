import { SignUp, useUser } from '@clerk/nextjs'
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useEffect } from 'react';

export default function Page() {
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    if (
      user &&
      user.primaryEmailAddress?.emailAddress &&
      user.fullName &&
      user.imageUrl
    ) {
      createUser({
        email: user.primaryEmailAddress.emailAddress,
        userName: user.fullName,
        imageUrl: user.imageUrl,
      });
    }
  }, [user]);

  return (
    <div className="
    flex 
    justify-center 
    items-center 
    h-screen"
    >
      <SignUp />
    </div>
  );
}