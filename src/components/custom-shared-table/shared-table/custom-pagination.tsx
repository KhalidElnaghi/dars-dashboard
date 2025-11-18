import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useTranslate } from 'src/locales';
import { useTheme } from '@emotion/react';
// Custom chevron icons using SVG
const ChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
);

const ChevronDoubleLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 7.41L16.59 6l-6 6 6 6L18 16.59 12.83 12zm-7 0L9.59 6l-6 6 6 6L11 16.59 5.83 12z" />
  </svg>
);

const ChevronDoubleRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 18l1.41 1.41 6-6-6-6L6 7.41 10.59 12zm7 0l1.41 1.41 6-6-6-6L13 7.41 17.59 12z" />
  </svg>
);

interface CustomPaginationProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange?: (newRowsPerPage: number) => void;
}

export default function CustomPagination({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: CustomPaginationProps) {
  const { t } = useTranslate();
  const theme = useTheme();
  const totalPages = Math.ceil(count / rowsPerPage);
  const currentPage = page + 1;
  const pageSizeOptions = [10, 20, 30, 50];

  // Debug logging

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i += 1) {
        pages.push(i);
      }
    } else if (currentPage <= 3) {
      for (let i = 1; i <= 4; i += 1) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - 3; i <= totalPages; i += 1) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = currentPage - 1; i <= currentPage + 1; i += 1) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      // The useTable hook expects (event, newPage) signature
      onPageChange(null, newPage - 1);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 2,
        px: 1,
        borderTop: '1px solid',
        borderColor: 'divider',
        flexWrap: 'nowrap',
        minHeight: 56,
      }}
    >
      {/* Page size selector */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
        <TextField
          select
          size="small"
          value={rowsPerPage}
          onChange={(event) => onRowsPerPageChange?.(Number(event.target.value))}
          sx={{ width: 80 }}
        >
          {pageSizeOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
          {t('Label.results_per_page')}
        </Typography>
      </Box>

      {/* Page info */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          flexShrink: 0,
          whiteSpace: 'nowrap',
          mx: 2,
        }}
      >
        {t('Label.page')} {currentPage} {t('Label.of')} {totalPages}
      </Typography>

      {/* Pagination controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
        {/* First button */}
        <IconButton
          onClick={() => handlePageChange(1)}
          disabled={currentPage <= 1}
          sx={{
            color: currentPage <= 1 ? 'text.disabled' : 'primary.main',
            border: '1px solid',
            borderColor: currentPage <= 1 ? 'divider' : 'primary.main',
            borderRadius: 1,
            width: 32,
            height: 32,
            p: 0,
          }}
        >
          <ChevronDoubleRightIcon />
        </IconButton>

        {/* Previous button */}
        <IconButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          sx={{
            color: currentPage <= 1 ? 'text.disabled' : 'primary.main',
            border: '1px solid black',
            borderColor: currentPage <= 1 ? 'divider' : 'primary.main',
            borderRadius: 1,
            width: 32,
            height: 32,
            p: 0,
            transform: (theme as any)?.direction === 'rtl' ? 'rotate(180deg)' : 'none',
          }}
        >
          <ChevronLeftIcon />
        </IconButton>

        {/* Page numbers */}
        <Box
          sx={{
            mx: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            minWidth: 'fit-content',
          }}
        >
          {getPageNumbers().map((pageNum, index) => (
            <React.Fragment key={index}>
              {pageNum === '...' ? (
                <Box
                  sx={{
                    px: 0.75,
                    color: 'text.secondary',
                    userSelect: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 24,
                    height: 32,
                    fontSize: 13,
                  }}
                >
                  ...
                </Box>
              ) : (
                <Button
                  variant={pageNum === currentPage ? 'contained' : 'text'}
                  onClick={() => handlePageChange(pageNum as number)}
                  sx={{
                    minWidth: 32,
                    height: 32,
                    borderRadius: 1,
                    fontWeight: 600,
                    fontSize: 13,
                    lineHeight: 1,
                    px: 1,
                    color: pageNum === currentPage ? 'white' : 'text.primary',
                    bgcolor: pageNum === currentPage ? 'primary.main' : 'transparent',
                    '&:hover': {
                      bgcolor: pageNum === currentPage ? 'primary.dark' : 'action.hover',
                    },
                  }}
                >
                  {pageNum}
                </Button>
              )}
            </React.Fragment>
          ))}
        </Box>

        {/* Next button */}
        <IconButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          sx={{
            // color: currentPage >= totalPages ? 'text.disabled' : 'primary.main',
            border: '1px solid black',
            borderColor: currentPage >= totalPages ? 'divider' : 'primary.main',
            borderRadius: 1,
            width: 32,
            height: 32,
            p: 0,
            transform: (theme as any)?.direction === 'rtl' ? 'rotate(180deg)' : 'none',
          }}
        >
          <ChevronRightIcon />
        </IconButton>

        {/* Last button */}
        <IconButton
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage >= totalPages}
          sx={{
            color: currentPage >= totalPages ? 'text.disabled' : 'primary.main',
            border: '1px solid',
            borderColor: currentPage >= totalPages ? 'divider' : 'primary.main',
            borderRadius: 1,
            width: 32,
            height: 32,
            p: 0,
          }}
        >
          <ChevronDoubleLeftIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
