import { useState } from 'react';
import { Avatar } from '../../components/Avatar/Avatar.js';
import { Button } from '../../components/Button/Button.js';
import { FormField } from '../../components/FormField/FormField.js';
import { Select } from '../../components/Select/Select.js';
import { SideSheet } from '../../components/SideSheet/SideSheet.js';
import { TextInput } from '../../components/TextInput/TextInput.js';
import { Textarea } from '../../components/Textarea/Textarea.js';
import styles from './RequestAccessSideSheet.module.css';

export interface RequestAccessSideSheetProps {
  open: boolean;
  onClose: () => void;
}

export function RequestAccessSideSheet({ open, onClose }: RequestAccessSideSheetProps) {
  const [reason, setReason] = useState('');

  return (
    <SideSheet
      open={open}
      onClose={onClose}
      title="Request Access"
      subtitle="Browse resources and enter details below to request temporary or permanent access permissions."
      className={styles.sheet}
      footer={
        <div className={styles.footerActions}>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Submit Request</Button>
        </div>
      }
    >
      <div className={styles.form}>
        <FormField label="Requested Object" required>
          <Select label="100 Available objects" aria-label="Requested Object" />
        </FormField>
        <FormField label="Object Type" required>
          <Select label="Directory" aria-label="Object Type" />
        </FormField>
        <FormField label="Description">
          <TextInput defaultValue="Campaign assets and public relations directories" />
        </FormField>
        <div className={styles.ownerSection}>
          <h3>Owner</h3>
          <div className={styles.ownerCard}>
            <Avatar name="Sarah Mitchell" size="default" />
            <div className={styles.ownerInfo}>
              <strong>Sarah Mitchell</strong>
              <span>sarah.mitchell@company.com</span>
            </div>
            <span className={styles.ownerRole}>Owner</span>
          </div>
        </div>
        <FormField label="Access Duration" required>
          <Select label="Permanent" aria-label="Access Duration" />
        </FormField>
        <FormField label="Reason for Request" required>
          <div className={styles.reasonField}>
            <Textarea
              value={reason}
              onChange={(event) => setReason(event.target.value.slice(0, 100))}
              placeholder="Please describe why you need access to this resource..."
              rows={4}
              maxLength={100}
            />
            <span className={styles.counter}>{reason.length}/100</span>
          </div>
        </FormField>
      </div>
    </SideSheet>
  );
}
