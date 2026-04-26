import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';
import { API_URL } from '../config';
import type { User, Repository } from '../types';

export const useUserRepositories = (
  user: User | null,
): [Repository[], Dispatch<SetStateAction<Repository[]>>] => {
  const [state, setState] = useState<Repository[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        API_URL + '/' + user?.username + '/' + 'repos',
        {
          method: 'GET',
          credentials: 'include',
        },
      );
      const jsonResponse = await response.json();
      const userRepos = jsonResponse.data.repositories;
      setState(userRepos);
    })();
  }, [user]);
  return [state, setState];
};
