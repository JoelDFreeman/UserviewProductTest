import { useState } from 'react';
import { Badge, type BadgeTone } from '../../components/Badge/Badge.js';
import { Button } from '../../components/Button/Button.js';
import { Card } from '../../components/Card/Card.js';
import { DataTable, type DataTableColumn } from '../../components/DataTable/DataTable.js';
import { Icon } from '../../components/Icon/Icon.js';
import { Pagination } from '../../components/Pagination/Pagination.js';
import { Tabs } from '../../components/Tabs/Tabs.js';
import { AppShell } from '../AppShell/AppShell.js';
import layout from '../UserViewPageLayout.module.css';
import { RequestAccessSideSheet } from './RequestAccessSideSheet.js';
import styles from './UserViewAccessPage.module.css';

type AccessStatus = 'active' | 'pending' | 'inactive' | 'revoked';

type AccessRecord = {
  id: string;
  objectType: string;
  objectName: string;
  status: AccessStatus;
  about: string;
  timeRemaining: string;
  autoExtend: 'On' | 'Off' | 'Disabled';
};

const ACCESS_RECORDS: AccessRecord[] = [
  { id: 'finance-admin-group', objectName: 'Finance-Admin-Group', objectType: 'Group', status: 'active', about: 'Administrative access to finance resources', timeRemaining: '4h 15m', autoExtend: 'On' },
  { id: 'hr-policy-read', objectName: 'HR-Policy-Read', objectType: 'Policy', status: 'pending', about: 'Read-only policy for HR files', timeRemaining: '19h 30m', autoExtend: 'Off' },
  { id: 'it-ops-directory', objectName: 'IT-Ops-Directory', objectType: 'Directory', status: 'active', about: 'Full directory access for operations and monitoring', timeRemaining: 'Long term', autoExtend: 'On' },
  { id: 'shared-documents-folder', objectName: 'Shared-Documents-Folder', objectType: 'Folder', status: 'active', about: 'Shared documentation and collaboration workspace', timeRemaining: '1d 22h 45m', autoExtend: 'Off' },
  { id: 'database-admin-group', objectName: 'Database-Admin-Group', objectType: 'Group', status: 'revoked', about: 'Database privilege access revoked following violation', timeRemaining: 'Long term', autoExtend: 'Disabled' },
  { id: 'guest-access-policy', objectName: 'Guest-Access-Policy', objectType: 'Policy', status: 'inactive', about: 'Temporary guest permissions for consultants', timeRemaining: 'Expired', autoExtend: 'Disabled' },
  { id: 'engineering-folder', objectName: 'Engineering-Folder', objectType: 'Folder', status: 'active', about: 'Developer codebase and platform architecture wiki', timeRemaining: 'Long term', autoExtend: 'On' },
  { id: 'marketing-directory', objectName: 'Marketing-Directory', objectType: 'Directory', status: 'pending', about: 'Campaign assets and public relations directories', timeRemaining: '3d 14h 22m', autoExtend: 'Off' },
];

const ACCESS_TABS = [
  { value: 'all', label: 'All Access (8)' },
  { value: 'active', label: 'Active (4)' },
  { value: 'pending', label: 'Pending (2)' },
  { value: 'inactive', label: 'Inactive (1)' },
  { value: 'revoked', label: 'Revoked (1)' },
];

const STATUS_TONES: Record<AccessStatus, BadgeTone> = {
  active: 'success',
  pending: 'warning',
  inactive: 'neutral',
  revoked: 'error',
};

const STATUS_LABELS: Record<AccessStatus, string> = {
  active: 'Active',
  pending: 'Pending',
  inactive: 'Inactive',
  revoked: 'Revoked',
};

const COLUMNS: DataTableColumn<AccessRecord>[] = [
  { key: 'objectName', header: 'Object Name', icon: 'Folder', width: 220, cell: (row) => row.objectName },
  { key: 'objectType', header: 'Object Type', icon: 'GridFour', width: 120, cell: (row) => row.objectType },
  { key: 'status', header: 'Status', icon: 'CheckCircle', width: 120, cell: (row) => <Badge tone={STATUS_TONES[row.status]}>{STATUS_LABELS[row.status]}</Badge> },
  { key: 'about', header: 'About', grow: 1, minWidth: 280, cell: (row) => row.about },
  { key: 'timeRemaining', header: 'Time Remaining', icon: 'ClockClockwise', width: 140, cell: (row) => row.timeRemaining },
  {
    key: 'autoExtend',
    header: 'Auto Extend',
    width: 100,
    cell: (row) => <span className={styles.autoExtend}>{row.autoExtend}</span>,
  },
];

export function UserViewAccessPage() {
  const [requestAccessOpen, setRequestAccessOpen] = useState(false);

  return (
    <AppShell
      breadcrumb={[{ label: 'UserView' }, { label: 'My Access' }]}
      activeGlobalItem="user-view-access"
      showSecondarySidebar={false}
    >
      <div className={`${layout.userViewPage} ${styles.page}`}>
        <section className={`${layout.userViewContentPanel} ${styles.contentPanel}`}>
          <header className={styles.titleBar}>
            <div>
              <h1>My Access</h1>
              <p>Manage your time-based access requests and permissions</p>
            </div>
            <div className={styles.actions}>
              <Button variant="secondary">Export</Button>
              <Button onClick={() => setRequestAccessOpen(true)}>Request Access</Button>
            </div>
          </header>

          <div className={styles.metricRow}>
            <Card className={styles.metricCard}><span>Active Access</span><strong>4</strong><small>Current permissions</small></Card>
            <Card className={styles.metricCard}><span>Pending Approval</span><strong>2</strong><small>Awaiting review</small></Card>
            <Card className={styles.metricCard}><span>Inactive</span><strong>1</strong><small>Expired access</small></Card>
            <Card className={styles.metricCard}><span>Revoked</span><strong>1</strong><small>Access withdrawn</small></Card>
          </div>

          <Tabs items={ACCESS_TABS} value="all" onChange={() => undefined} ariaLabel="Access record filters" />

          <div className={styles.tableSection}>
            <DataTable
              rows={ACCESS_RECORDS}
              columns={COLUMNS}
              ariaLabel="My access records"
              rowLabel={(row) => row.objectName}
              showRowActions={false}
            />
          </div>

          <div className={styles.pagination}>
            <Pagination page={1} pageCount={154} onPageChange={() => undefined} ariaLabel="Access records pagination" />
          </div>
        </section>
      </div>
      <RequestAccessSideSheet
        open={requestAccessOpen}
        onClose={() => setRequestAccessOpen(false)}
      />
    </AppShell>
  );
}
