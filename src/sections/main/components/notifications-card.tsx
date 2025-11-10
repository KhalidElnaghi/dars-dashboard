import { useRouter } from 'next/navigation';

import {
  Card,
  List,
  Avatar,
  Divider,
  ListItem,
  Typography,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import { useLocales, useTranslate } from 'src/locales';

import HomeCardHeader from './card-header';

interface Notification {
  avatar: string;
  title: string;
  date_en: string;
  date_ar: string;
  id: string;
}

interface Props {
  notifications: Notification[];
}

export default function NotificationsCard({ notifications }: Props) {
  const { t } = useTranslate();
  const { currentLang } = useLocales();

  const router = useRouter();

  return (
    <Card sx={{ height: '100%', p: 2.5 }}>
      <HomeCardHeader
        title={t('Notification')}
        icon="material-symbols:notifications-active"
        link={t('Show All')}
        href={paths.dashboard.root}
      />
      <List sx={{ height: '450px', p: 2.5, overflowY: 'scroll' }}>
        {notifications.map((notification, i) => (
          <>
            {i !== 0 && <Divider />}
            <ListItem key={notification.id} disablePadding>
              <ListItemButton
                onClick={() => router.push(`${paths.dashboard.root}/${notification.id}`)}
              >
                <ListItemAvatar>
                  <Avatar
                    alt="user"
                    src={notification.avatar}
                    sx={{ bgcolor: '#000', color: '#fff' }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" lineHeight={1.4} fontWeight="bold">
                      {notification.title}
                    </Typography>
                  }
                  secondary={
                    currentLang.value === 'en' ? notification.date_en : notification.date_ar
                  }
                />
              </ListItemButton>
            </ListItem>
          </>
        ))}
      </List>
    </Card>
  );
}
