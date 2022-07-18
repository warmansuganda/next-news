import Box from '@mui/material/Box';

interface TabLabelProps {
  title: string;
  subtitle?: string;
}

function TabLabel({ title, subtitle }: TabLabelProps) {
  return (
    <Box>
      <Box>{title}</Box>
      {subtitle && <Box>{subtitle}</Box>}
    </Box>
  );
}

export default TabLabel;
