import { Box, Card } from '@mui/material';

import { paths } from 'src/routes/paths';

import { fCurrency } from 'src/utils/format-number';

import { useLocales, useTranslate } from 'src/locales';

import Scrollbar from 'src/components/scrollbar';
import Chart, { useChart } from 'src/components/chart';

import HomeCardHeader from './card-header';

interface Series {
  name_ar: string;
  name_en: string;
  data: number[];
}

interface IChart {
  xaxis: {
    categories_ar: string[];
    categories_en: string[];
  };
  series: Series[];
}

interface Props {
  chart: IChart;
}

export default function BestSellerCard({ chart }: Props) {
  const { t } = useTranslate();

  const { currentLang } = useLocales();

  const chartOptions = useChart({
    plotOptions: {
      bar: {
        columnWidth: 10,
        borderRadius: 3,
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories:
        currentLang.value === 'en'
          ? chart.xaxis.categories_en
          : chart.xaxis.categories_ar.toReversed(),
    },
    yaxis: {
      opposite: currentLang.value === 'ar', // reverse the y-axis
      labels: {
        formatter: (value: number) => `${fCurrency(value)}`,
      },
    },
    tooltip: {
      y: {
        formatter: (value: number) => `${fCurrency(value)}`,
      },
    },
    colors: ['#1F7BF4', '#00AAFF'],
  });

  return (
    <Card sx={{ p: 2.5 }}>
      <HomeCardHeader
        title={t('Best seller')}
        icon="solar:diagram-up-outline"
        link={t('Show All')}
        href={paths.dashboard.root}
      />
      <Scrollbar>
        <Box width="max(35rem, 100%)" overflow="hidden">
          <Chart
            dir="ltr"
            type="bar"
            series={chart.series.map((item: Series) => ({
              data: currentLang.value === 'en' ? item.data : item.data.toReversed(),
              name: currentLang.value === 'en' ? item.name_en : item.name_ar,
            }))}
            options={chartOptions}
            width="100%"
            height={320}
          />
        </Box>
      </Scrollbar>
    </Card>
  );
}
