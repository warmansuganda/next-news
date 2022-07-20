import { News } from '@services/news/types';
import dateAdapter from './dateAdapter';

function getPrice(news: News) {
  const price = 0;
  if (news.pub_date) {
    const now = new Date();
    const days = dateAdapter.getDiff(now, news.pub_date, 'days');
    if (days <= 1) return 50000;
    if (days > 1 && days <= 7) return 20000;
  }
  return price;
}

export default getPrice;
