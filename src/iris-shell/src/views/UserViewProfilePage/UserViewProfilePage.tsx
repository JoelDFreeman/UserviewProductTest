import { Avatar } from '../../components/Avatar/Avatar.js';
import { Badge } from '../../components/Badge/Badge.js';
import { Button } from '../../components/Button/Button.js';
import { FormField } from '../../components/FormField/FormField.js';
import { IconButton } from '../../components/IconButton/IconButton.js';
import { Select } from '../../components/Select/Select.js';
import { Textarea } from '../../components/Textarea/Textarea.js';
import { TextInput } from '../../components/TextInput/TextInput.js';
import { AppShell } from '../AppShell/AppShell.js';
import layout from '../UserViewPageLayout.module.css';
import styles from './UserViewProfilePage.module.css';

function ReadOnlyValue({ value }: { value: string }) {
  return <div className={styles.readOnlyValue}>{value}</div>;
}

export function UserViewProfilePage() {
  return (
    <AppShell
      breadcrumb={[{ label: 'UserView' }, { label: 'User Profile' }]}
      activeGlobalItem="user-view-profile"
      showSecondarySidebar={false}
      mainClassName={styles.mainSurface}
    >
      <div className={`${layout.userViewPage} ${styles.page}`}>
        <section className={`${layout.userViewContentPanel} ${styles.contentPanel}`}>
          <div className={styles.profileScroll}>
            <div className={styles.profileHeader}>
            <div className={styles.avatarWrapper}>
              <Avatar name="John Doe" size="l" />
              <IconButton icon="Pencil" ariaLabel="Edit profile picture" size="s" className={styles.avatarEdit} />
            </div>
            <div className={styles.userMeta}>
              <h1>John Doe</h1>
              <p>Senior IT Administrator</p>
              <p>john.doe@company.com</p>
            </div>
            </div>

            <div className={styles.divider} />

            <section className={styles.profileSection}>
            <h2>Personal Information</h2>
            <div className={styles.formGrid}>
              <FormField label="First Name" required>
                <TextInput defaultValue="John" readOnly />
              </FormField>
              <FormField label="Last Name" required>
                <TextInput defaultValue="Doe" readOnly />
              </FormField>
              <FormField label="Display Name">
                <TextInput defaultValue="John Doe" readOnly />
              </FormField>
              <FormField label="Email Address" required>
                <TextInput defaultValue="john.doe@company.com" readOnly />
              </FormField>
              <FormField label="Phone Number">
                <TextInput defaultValue="+1 (555) 234-5678" readOnly />
              </FormField>
            </div>
            <FormField label="Description" helperText="Brief summary of your responsibilities or bio.">
              <Textarea
                defaultValue="IT Administrator managing Active Directory and identity governance"
                readOnly
                rows={4}
              />
            </FormField>
            </section>

            <div className={styles.divider} />

            <section className={styles.profileSection}>
            <h2>Work Information</h2>
            <div className={styles.formGrid}>
              <FormField label="Office Location">
                <TextInput defaultValue="New York - HQ" readOnly />
              </FormField>
              <FormField label="Department">
                <Select label="Information Technology" aria-label="Department" />
              </FormField>
              <FormField label="Job Title">
                <TextInput defaultValue="Senior IT Administrator" readOnly />
              </FormField>
              <FormField label="Web Page">
                <TextInput defaultValue="https://intranet.company.com/jdoe" readOnly />
              </FormField>
            </div>
            </section>

            <div className={styles.divider} />

            <section className={styles.profileSection}>
            <h2>Account Information</h2>
            <div className={styles.accountGrid}>
              <div>
                <h3>Login Name</h3>
                <ReadOnlyValue value="CORP\\john.doe" />
              </div>
              <div>
                <h3>Domain</h3>
                <ReadOnlyValue value="corp.company.com" />
              </div>
              <div>
                <h3>Account Status</h3>
                <Badge tone="success">Active</Badge>
              </div>
              <div>
                <h3>Last Login</h3>
                <ReadOnlyValue value="2026-07-16 09:42 AM" />
              </div>
            </div>
            </section>

            <div className={styles.divider} />
          </div>

          <div className={styles.formActions}>
            <Button variant="secondary" className={styles.ghostButton}>Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
