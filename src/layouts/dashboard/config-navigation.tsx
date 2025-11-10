import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

// import { hasClientPermission } from 'src/utils/hasClientPermission';

import { useTranslations } from 'next-intl';

import SvgColor from 'src/components/svg-color';

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  main: icon('ic_main'),
  orders: icon('ic_orders'),
  notifications: icon('ic_notifications'),
  reports: icon('ic_reports'),
  settings: icon('ic_settings'),
  categories: icon('bi:grid-fill'),
  products: icon('ic_products'),
  inProgress: icon('tabler--progress'),
  createOrder: icon('material-symbols--note-add-sharp'),
  mailings: icon('tabler--mail'),
  electronic_app: icon('streamline--qr-code'),
  pending: icon('fa6-solid--hourglass-end'),
  Payment: icon('solar--card-bold'),
  Puzzle: icon('fluent--puzzle-piece-24-filled'),
  branches: icon('ph--storefront-duotone'),
  citiesAndAreas: icon('ic_location'),
  clients: icon('mdi--users'),
  megaphone: icon('mi--megaphone'),
  packages: icon('ic_packages'),
  menu: icon('healthicons--ui-menu-grid-outline'),
  addons: icon('game-icons--ketchup'),
  global: icon('global'),
  drivers: icon('healthicons--truck-driver-outline'),
  driversWallet: icon('ph:wallet-duotone'),
  about: icon('about-svg'),
  terms: icon('term-svg'),
  privacy: icon('privacy-svg'),
  app: icon('mobile'),
  transactions: icon('ic_currencies'),
  dashboard: icon('icons8-home'),
};

export function useNavData() {
  const t = useTranslations();
  const data = useMemo(
    () => [
      {
        items: [{ title: t('Nav.main'), path: paths.dashboard.root, icon: ICONS.dashboard }],
      },
    ],
    [t]
  );

  return data;
}
