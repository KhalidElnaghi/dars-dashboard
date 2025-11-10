// eslint-disable-next-line import/no-extraneous-dependencies
import QRCode from 'qrcode';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import {
  IconButton,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import Card, { CardProps } from '@mui/material/Card';

import { useBoolean } from 'src/hooks/use-boolean';

import { shadows } from 'src/theme/shadows';

import Image from 'src/components/image';
import { QrCode } from 'src/components/qr-code/QrModel';
import { useSettingsContext } from 'src/components/settings';

import AddSettings from './settings/AddSettings';

// ----------------------------------------------------------------------
export type Ilink = {
  type: 'settings' | 'QRCode' | 'Analysis' | 'link';
};
interface Props extends CardProps {
  title: string;
  CardBgColor?: string;
  links: Ilink[];
}

export default function CenterCards({ title, links, sx,CardBgColor ,...other }: Props) {
  const settings = useSettingsContext();
  const router = useRouter();
  const [src, setSrc] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const OpenQRcode = useBoolean(false);
  const OpenSettings = useBoolean(false);

  const renderIcon = useCallback((type: string) => {
    if (type === 'QRCode') {
      return 'scan-qr';
    }
    if (type === 'settings') {
      return 'healthicons--ui-settings-outline';
    }
    if (type === 'Analysis') {
      return 'ep--data-analysis';
    }
    return 'link-alt';
  }, []);

  const handleClick = useCallback(
    (type: string, _title: string) => {
      if (type === 'QRCode') {
        QRCode?.toDataURL(type)
          .then((url) => {
            setSrc(url);
            OpenQRcode.onTrue();
            setSelectedTitle(_title);
          })
          .catch((err) => {
            console.error(err);
          });
      } else if (type === 'Analysis') {
        router.push('/dashboard/app-stats');
      } else if (type === 'settings') {
        OpenSettings.onTrue();
        setSelectedTitle(_title);
      } else {
        router.push('https://www.google.com');
      }
    },
    [OpenQRcode, OpenSettings, router]
  );

  return (
    <Card
      sx={{
        display: 'flex',
        my:1,
        bgcolor: CardBgColor ?'primary.main':"none",
        alignItems: 'center',
        minHeight: 100,
        p: 1.5,
        '&:hover': {
          boxShadow: shadows(settings.themeMode),
        },
        ...sx,
      }}
      {...other}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Box>
          <Typography variant="body2" sx={{color:CardBgColor?"#fff":"unset"}} >
            {title}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" gap={2} my={2}>
          {links?.map((link) => (
            <IconButton
              aria-label="link"
              size="small"
              sx={{ verticalAlign: 'middle', boxShadow: 4, bgcolor: '#fff' }}
              onClick={() => handleClick(link.type, title)}
            >
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  verticalAlign: 'middle',
                }}
              >
                <Image
                  sx={{ verticalAlign: 'middle' }}
                  effect="blur"
                  alt="rocket"
                  // eslint-disable-next-line no-nested-ternary
                  src={`/assets/icons/dashboard/main/${renderIcon(link?.type)}.svg`}
                />
              </Box>
            </IconButton>
          ))}
        </Box>
        {OpenQRcode.value && (
          <QrCode
            src={src}
            title={selectedTitle}
            open={OpenQRcode.value}
            onClose={() => {
              OpenQRcode.onFalse();
              setSrc(null);
              setSelectedTitle(null);
            }}
          />
        )}
        {OpenSettings.value && (
          <AddSettings
            Modeltitle={selectedTitle || ''}
            selectedSettings={undefined}
            open={OpenSettings.value}
            onClose={() => {
              OpenSettings.onFalse();
              setSelectedTitle(null);
            }}
          />
        )}
      </Box>
    </Card>
  );
}

