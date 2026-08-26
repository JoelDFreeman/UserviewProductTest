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
import { ReviewRequestSideSheet } from './ReviewRequestSideSheet.js';
import styles from './UserViewApprovalsPage.module.css';

type ApprovalRecord = {
  id: string;
  requester: string;
  object: string;
  objectType: string;
  owner: string;
  duration: string;
  status: 'pending' | 'approved' | 'denied';
};

const APPROVAL_RECORDS: ApprovalRecord[] = [
  { id: 'REQ-001', requester: 'John Smith', object: 'Finance-Admin Group', objectType: 'JIT', owner: 'Sarah Mitchell', duration: '24 Hours', status: 'pending' },
  { id: 'REQ-002', requester: 'Sarah Johnson', object: 'IT-Support Role', objectType: 'PIM', owner: 'David Chen', duration: 'Permanent', status: 'pending' },
  { id: 'REQ-003', requester: 'Michael Chen', object: 'Database Access', objectType: 'Attestation', owner: 'Emily Rodriguez', duration: '7 Days', status: 'approved' },
  { id: 'REQ-004', requester: 'Lisa Park', object: 'Marketing Portal', objectType: 'JIT', owner: 'James Wilson', duration: '48 Hours', status: 'denied' },
  { id: 'REQ-005', requester: 'Robert Kim', object: 'Cloud Infrastructure', objectType: 'PIM', owner: 'Amanda Torres', duration: 'Permanent', status: 'pending' },
];

const FILTERS = [
  { value: 'all', label: 'All (16)' },
  { value: 'pending', label: 'Pending (3)' },
  { value: 'previous', label: 'Previous (13)' },
];

const STATUS_TONES: Record<ApprovalRecord['status'], BadgeTone> = {
  pending: 'warning',
  approved: 'success',
  denied: 'error',
};

const STATUS_LABELS: Record<ApprovalRecord['status'], string> = {
  pending: 'Pending',
  approved: 'Approved',
  denied: 'Denied',
};

const COLUMNS: DataTableColumn<ApprovalRecord>[] = [
  { key: 'id', header: 'Request ID', icon: 'Hash', width: 120, cell: (row) => row.id },
  { key: 'requester', header: 'Requester', icon: 'User', width: 180, cell: (row) => row.requester },
  { key: 'object', header: 'Requested Object', icon: 'Folder', grow: 1, minWidth: 220, cell: (row) => row.object },
  { key: 'objectType', header: 'Object Type', icon: 'GridFour', width: 120, cell: (row) => row.objectType },
  { key: 'owner', header: 'Owner', icon: 'ShieldCheck', width: 180, cell: (row) => row.owner },
  { key: 'duration', header: 'Access Duration', icon: 'ClockClockwise', width: 140, cell: (row) => row.duration },
  {
    key: 'status',
    header: 'Status',
    icon: 'CheckCircle',
    width: 120,
    cell: (row) => <Badge tone={STATUS_TONES[row.status]}>{STATUS_LABELS[row.status]}</Badge>,
  },
];

export function UserViewApprovalsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [reviewRequestOpen, setReviewRequestOpen] = useState(false);

  return (
    <AppShell
      breadcrumb={[{ label: 'UserView' }, { label: 'Approvals' }]}
      activeGlobalItem="user-view-approvals"
      showSecondarySidebar={false}
    >
      <div className={`${layout.userViewPage} ${styles.page}`}>
        <section className={`${layout.userViewContentPanel} ${styles.contentPanel}`}>
          <header className={styles.titleBar}>
            <div>
              <h1>Approvals</h1>
              <p>Review and approve access requests</p>
            </div>
            <Button variant="secondary" iconOnly aria-label="Search approvals">
              <Icon name="MagnifyingGlass" size="20px" />
            </Button>
          </header>

          <div className={styles.metricRow}>
            <Card className={styles.metricCard}>
              <div className={styles.metricHeader}><span>Pending Approvals</span><span className={`${styles.dot} ${styles.dot_warning}`} /></div>
              <strong>3</strong>
              <small>Awaiting your review</small>
            </Card>
            <Card className={styles.metricCard}>
              <div className={styles.metricHeader}><span>Approved Today</span><span className={`${styles.dot} ${styles.dot_success}`} /></div>
              <strong>12</strong>
              <small>Successfully provisioned</small>
            </Card>
            <Card className={styles.metricCard}>
              <div className={styles.metricHeader}><span>Rejected Today</span><span className={`${styles.dot} ${styles.dot_error}`} /></div>
              <strong>1</strong>
              <small>Access denied</small>
            </Card>
          </div>

          <Tabs items={FILTERS} value={activeFilter} onChange={setActiveFilter} ariaLabel="Approval filters" />

          <div className={styles.tableSection}>
            <DataTable
              rows={APPROVAL_RECORDS}
              columns={COLUMNS}
              ariaLabel="Access approval requests"
              rowLabel={(row) => row.id}
              showRowActions={false}
              onRowClick={() => setReviewRequestOpen(true)}
            />
          </div>

          <div className={styles.pagination}>
            <Pagination page={page} pageCount={154} onPageChange={setPage} ariaLabel="Approval requests pagination" />
          </div>
        </section>
      </div>
      <ReviewRequestSideSheet
        open={reviewRequestOpen}
        onClose={() => setReviewRequestOpen(false)}
      />
    </AppShell>
  );
}
