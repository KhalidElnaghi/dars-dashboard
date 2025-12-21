// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    reports: {
      root: `${ROOTS.DASHBOARD}/reports`,
      orders: `${ROOTS.DASHBOARD}/reports/orders`,
      salePerPeriod: `${ROOTS.DASHBOARD}/reports/sale-per-period`,
      salePerLocation: `${ROOTS.DASHBOARD}/reports/sale-per-location`,
      salesPerDetails: `${ROOTS.DASHBOARD}/reports/sales-per-details`,
      driver: `${ROOTS.DASHBOARD}/reports/driver`,
      customers: `${ROOTS.DASHBOARD}/reports/customers`,
      appDownloads: `${ROOTS.DASHBOARD}/reports/application-downloads`,
      ratings: `${ROOTS.DASHBOARD}/reports/ratings`,
      walletOrders: `${ROOTS.DASHBOARD}/reports/wallet-orders`,
      pointsOrders: `${ROOTS.DASHBOARD}/reports/points-orders`,
      walletLogs: `${ROOTS.DASHBOARD}/reports/wallet-logs`,
      pointsLogs: `${ROOTS.DASHBOARD}/reports/points-logs`,
    },
    ordersGroup: {
      root: `${ROOTS.DASHBOARD}/orders`,
      new: `${ROOTS.DASHBOARD}/orders/new`,
    },
    orders_report: `${ROOTS.DASHBOARD}/orders-report`,
    customers_report: `${ROOTS.DASHBOARD}/customersreport`,
    sale_per_period_report: `${ROOTS.DASHBOARD}/sale-per-period`,
    driver_report: `${ROOTS.DASHBOARD}/driver-report`,
    in_progress: `${ROOTS.DASHBOARD}/in-progress`,
    branches: {
      root: `${ROOTS.DASHBOARD}/branches`,
      new: `${ROOTS.DASHBOARD}/branches/new`,
      trash: `${ROOTS.DASHBOARD}/branches/trash`,
    },
    categories: `${ROOTS.DASHBOARD}/categories`,
    addons: `${ROOTS.DASHBOARD}/addons`,
    productsGroup: {
      root: `${ROOTS.DASHBOARD}/products?filter=all`,
      availableProducts: `${ROOTS.DASHBOARD}/products/availabe-products`,
      almostRanOut: `${ROOTS.DASHBOARD}/products/almost-ran-out`,
      unavailableProducts: `${ROOTS.DASHBOARD}/products/unavailable-products`,
      total: `${ROOTS.DASHBOARD}/products/total`,
      new: `${ROOTS.DASHBOARD}/products/new`,
    },
    driversWallet: `${ROOTS.DASHBOARD}/drivers-wallet`,
    usersGroup: {
      root: `${ROOTS.DASHBOARD}/users`,
      employee: `${ROOTS.DASHBOARD}/users/employee`,
      clients: `${ROOTS.DASHBOARD}/users/clients`,
      drivers: `${ROOTS.DASHBOARD}/users/drivers`,
    },
    marketing: {
      root: `${ROOTS.DASHBOARD}/marketing`,
      abandonedBaskets: { root: `${ROOTS.DASHBOARD}/marketing/abandoned-baskets` },
      discountCoupons: {
        root: `${ROOTS.DASHBOARD}/marketing/discount-coupons`,
        new: `${ROOTS.DASHBOARD}/marketing/discount-coupons/new`,
      },
      offersAndDiscounts: {
        root: `${ROOTS.DASHBOARD}/marketing/offers-and-discounts`,
        new: `${ROOTS.DASHBOARD}/marketing/offers-and-discounts/new`,
        edit: `${ROOTS.DASHBOARD}/marketing/offers-and-discounts/edit`,
      },
      marketingCampaigns: {
        root: `${ROOTS.DASHBOARD}/marketing/marketing-campaigns`,
      },
      banners: {
        root: `${ROOTS.DASHBOARD}/marketing/banners`,
        new: `${ROOTS.DASHBOARD}/marketing/banners/new`,
        edit: `${ROOTS.DASHBOARD}/marketing/banners/edit`,
      },
    },
    packages: `${ROOTS.DASHBOARD}/packages`,
    website: {
      root: `${ROOTS.DASHBOARD}/website`,
    },
    app: {
      root: `${ROOTS.DASHBOARD}/application`,
    },
    text_content: {
      root: `${ROOTS.DASHBOARD}/text-content`,
      terms_and_conditions: `${ROOTS.DASHBOARD}/text-content/terms`,
      privacy_policy: `${ROOTS.DASHBOARD}/text-content/privacy_policy`,
      about_us: `${ROOTS.DASHBOARD}/text-content/about_us`,
    },
    epayments: `${ROOTS.DASHBOARD}/e-payments`,
    electronicMenu: {
      root: `${ROOTS.DASHBOARD}/electronic-menu`,
      new: `${ROOTS.DASHBOARD}/electronic-menu/new`,
    },
    employee: {
      root: `${ROOTS.DASHBOARD}/employee`,
    },
    settings: {
      root: `${ROOTS.DASHBOARD}/settings`,
      'general-settings': `${ROOTS.DASHBOARD}/settings/general-settings`,
      orderSettings: `${ROOTS.DASHBOARD}/settings/order-settings`,
      notifications: `${ROOTS.DASHBOARD}/settings/notifications`,
      sendEmail: `${ROOTS.DASHBOARD}/settings/notifications/sendemail`,
      sendSMS: `${ROOTS.DASHBOARD}/settings/notifications/sendsms`,
      checkout: `${ROOTS.DASHBOARD}/settings/checkout`,
      ratings: `${ROOTS.DASHBOARD}/settings/ratings`,
      loyality: `${ROOTS.DASHBOARD}/settings/loyality`,
      allergens: `${ROOTS.DASHBOARD}/settings/allergens`,
      referralCode: `${ROOTS.DASHBOARD}/settings/referral-code`,
      paymentSettings: `${ROOTS.DASHBOARD}/settings/payment-settings`,
      cashback: {
        root: `${ROOTS.DASHBOARD}/settings/cashback`,
        new: `${ROOTS.DASHBOARD}/settings/cashback/new`,
        edit: `${ROOTS.DASHBOARD}/settings/cashback/edit`,
      },
    },
    app_store: {
      root: `${ROOTS.DASHBOARD}/app-store`,
    },
    transactions: {
      root: `${ROOTS.DASHBOARD}/transactions`,
    },
    citiesAndAreas: {
      root: `${ROOTS.DASHBOARD}/cities-and-areas`,
      new: `${ROOTS.DASHBOARD}/cities-and-areas/new`,
      areas: {
        new: `${ROOTS.DASHBOARD}/cities-and-areas/areas/new`,
        edit: `${ROOTS.DASHBOARD}/cities-and-areas/areas/edit`,
      },
    },
    countries: `${ROOTS.DASHBOARD}/countries`,
  },
};
