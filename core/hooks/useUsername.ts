import { useAuth, useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";

export const useUsername = () => {
  const { user } = useUser();
  const { isSignedIn } = useAuth();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const checkUsername = async () => {
      if (isSignedIn && user) {
        if (!user.username) {
          try {
            const newUsername = `${user.firstName?.toLowerCase()}${user.lastName?.toLowerCase()}`;
            await user.update({ username: newUsername });
            setUsername(newUsername);
          } catch (err: any) {
            if (err.message === "That username is taken. Please try another.") {
              const uniqueUsername = `${user.firstName?.toLowerCase()}${user.lastName?.toLowerCase()}${Date.now()}`;
              await user.update({ username: uniqueUsername });
              setUsername(uniqueUsername);
            }
          } finally {
            await user.reload();
          }
        } else {
          setUsername(user.username);
        }
      }
      setIsLoaded(true);
    };

    checkUsername();
  }, [user]);

  return { isLoaded, username };
};
