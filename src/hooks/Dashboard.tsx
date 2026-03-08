import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';
import { REPOS_URL } from '../config';
import type { User, Repository } from '../types';
import type { AuthUser } from '../types/auth';

export const useRecentRepositories = (
  user: AuthUser | User | null,
): [Repository[], Dispatch<SetStateAction<Repository[]>>] => {
  const [state, setState] = useState<Repository[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        REPOS_URL + '/' + user?.username + '/' + 'recentRepos',
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
