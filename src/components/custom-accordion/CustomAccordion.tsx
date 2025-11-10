import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';

export default function CustomAccordion() {
  const data = [
    {
      title: 'What is a domain/name?',
      description: 'The domain is the address you type in the browser to access it (store link).',
    },
    {
      title: 'Do I purchase the domain once or does it need renewal like a subscription?',
      description: 'You need to renew domain subscriptions recently',
    },
    {
      title: 'How do you get a domain as a gift?',
      description: 'You get the domain when you subscribe to the cart addition.',
    },
    {
      title: 'How long does it take to activate the domain in the store?',
      description:
        'The domain is activated within 24-48 hours after booking and linking it to your store.',
    },
  ];
  const { t } = useTranslation();
  return (
    <div style={{ padding: '0 12px', margin: "10px 0" }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          {t('common questions')}
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1}>
            {data?.map((item) => (
              <Grid item xs={6} sx={{marginY: "20px"}}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sx={{fontWeight: "bold"}}>{t(item?.title)}</Grid>
                  <Grid item xs={12}>{t(item?.description)}</Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
