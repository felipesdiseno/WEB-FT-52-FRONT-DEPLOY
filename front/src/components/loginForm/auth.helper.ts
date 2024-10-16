'use client';

import { useAuth } from '@/context/AuthContext';

interface IUserObject {
  providerAccountId: string;
  email: string;
  name: string;
  accessToken: string;
  image: string;
}

export function usePostUserSessionData() {
  const { setToken, setSession } = useAuth();

  const postUserSessionData = async (userObject: IUserObject) => {
    try {
      const response = await fetch(
        'https://web-ft-52-back-1.onrender.com/users/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userObject),
        },
      );

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();

      setToken(data.token);
      setSession(data.user);
      return data;
    } catch (error) {
      console.error('Error al enviar los datos al backend:', error);
      throw error;
    }
  };

  return postUserSessionData;
}
