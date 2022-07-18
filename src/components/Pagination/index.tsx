import { useMemo, ChangeEvent } from 'react';
import MuiPagination from '@mui/material/Pagination';

interface PaginationProps {
  total: number;
  page?: number;
  onChange?: (event: ChangeEvent<unknown>, page: number) => void;
}

function Pagination({ total, page = 1, onChange }: PaginationProps) {
  const count: number = useMemo(() => {
    if (total) {
      return Math.ceil(total / 30);
    }

    return 1;
  }, [total]);

  return <MuiPagination count={count} page={page} onChange={onChange} />;
}

export default Pagination;
