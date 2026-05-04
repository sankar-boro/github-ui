import { Code2, Clock } from 'lucide-react';

export const generateTabs = (isAuthUser: boolean) => {
  const common = [
    { id: 'code', label: 'Code', icon: Code2 },
    { id: 'issues', label: 'Issues', icon: Code2, count: 0 },
    { id: 'pulls', label: 'Pull requests', icon: Code2, count: 0 },
    { id: 'actions', label: 'Actions', icon: Clock },
    { id: 'projects', label: 'Projects' },
    { id: 'wiki', label: 'Wiki' },
    { id: 'security', label: 'Security' },
    { id: 'insights', label: 'Insights' },
  ];
  const auth = [{ id: 'settings', label: 'Settings' }];
  return isAuthUser ? common.concat(auth) : common;
};
