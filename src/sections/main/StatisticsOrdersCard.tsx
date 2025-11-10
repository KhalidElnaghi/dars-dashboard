import { Grid } from '@mui/material';

import { useTranslate } from 'src/locales';

import AppWidgetSummary from './cards';

export interface ICard {
  href: string;
  icon: string;
  title: string;
  total: number;
}
interface IProps {
  cards: ICard[];
}
const StatisticsOrdersCard = ({ cards }: IProps) => {
  const { t } = useTranslate();
  return (
    <Grid container spacing={3}>
      {cards.map((card, index) => (
        <Grid item xs={6} md={4} key={card.title}>
          <AppWidgetSummary
            title={t(card.title)}
            total={card.total}
            icon={card.icon}
            href={card.href}
            customIcon
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default StatisticsOrdersCard;
