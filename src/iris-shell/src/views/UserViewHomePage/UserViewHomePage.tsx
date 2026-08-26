import { Card } from '../../components/Card/Card.js';
import { Badge } from '../../components/Badge/Badge.js';
import { BarChart } from '../../components/BarChart/BarChart.js';
import { DonutChart } from '../../components/DonutChart/DonutChart.js';
import { Icon } from '../../components/Icon/Icon.js';
import { AppShell } from '../AppShell/AppShell.js';
import layout from '../UserViewPageLayout.module.css';
import styles from './UserViewHomePage.module.css';

const QUICK_NAV_ITEMS = [
  {
    title: 'User Profile',
    description: 'View or change your personal account information',
    icon: 'User',
    iconTone: 'blue',
    badge: 'Active',
    badgeTone: 'success' as const,
  },
  {
    title: 'Approvals',
    description: 'Work with approval tasks at this time',
    icon: 'CheckCircle',
    iconTone: 'green',
    badge: '3 Pending',
    badgeTone: 'warning' as const,
  },
  {
    title: 'My Managed Resources',
    description: 'View objects managed by self-service user',
    icon: 'FolderUser',
    iconTone: 'purple',
    badge: '4 Objects',
    badgeTone: 'info' as const,
  },
  {
    title: 'My Access',
    description: 'View your access requests and access',
    icon: 'Key',
    iconTone: 'orange',
    badge: '20 Total',
    badgeTone: 'neutral' as const,
  },
] as const;

const APPROVALS_BY_MONTH = [
  { label: 'Jan', value: 35 },
  { label: 'Feb', value: 48 },
  { label: 'Mar', value: 28 },
  { label: 'Apr', value: 55 },
  { label: 'May', value: 40 },
  { label: 'Jun', value: 22 },
];

const APPROVAL_DISTRIBUTION = [
  { label: 'Approved', value: 75 },
  { label: 'Rejected', value: 15 },
  { label: 'Pending', value: 10 },
];

export function UserViewHomePage() {
  return (
    <AppShell
      breadcrumb={[{ label: 'UserView' }, { label: 'Homepage' }]}
      activeGlobalItem="user-view-home"
      showSecondarySidebar={false}
    >
      <div className={`${layout.userViewPage} ${styles.page}`}>
        <section className={`${layout.userViewContentPanel} ${styles.contentPanel}`}>
          <header className={styles.welcome}>
            <h1>Welcome to Active Roles</h1>
            <p>Quick access to your most used features</p>
          </header>

          <div className={styles.quickNavRow}>
            {QUICK_NAV_ITEMS.map((item) => (
              <Card key={item.title} className={styles.quickNavCard}>
                <div className={styles.cardHeader}>
                  <span className={`${styles.iconBox} ${styles[`icon_${item.iconTone}`]}`}>
                    <Icon name={item.icon} size="18px" />
                  </span>
                  <Badge tone={item.badgeTone}>{item.badge}</Badge>
                </div>
                <div className={styles.cardInfo}>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className={styles.chartsRow}>
            <Card className={styles.chartCard}>
              <div className={styles.chartHeader}>
                <div className={styles.chartTitleRow}>
                  <Icon name="ChartBar" size="24px" />
                  <h2>Approvals by Month</h2>
                </div>
                <p>Last 6 months</p>
              </div>
              <BarChart data={APPROVALS_BY_MONTH} height={120} />
            </Card>

            <Card className={styles.donutCard}>
              <div className={styles.chartHeader}>
                <div className={styles.chartTitleRow}>
                  <Icon name="CheckCircle" size="24px" />
                  <h2>Approval Distribution</h2>
                </div>
                <p>Current period</p>
              </div>
              <DonutChart segments={APPROVAL_DISTRIBUTION} />
            </Card>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
