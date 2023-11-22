import { formatDistanceToNow } from 'date-fns';

const timeAgo = (isoString?: string) => {
  const date = new Date(isoString || Date.now());
  return formatDistanceToNow(date, { addSuffix: true });
};

export { timeAgo };
