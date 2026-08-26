import { useState } from 'react';
import { Avatar } from '../../components/Avatar/Avatar.js';
import { Button } from '../../components/Button/Button.js';
import { Modal } from '../../components/Modal/Modal.js';
import { SideSheet } from '../../components/SideSheet/SideSheet.js';
import { Textarea } from '../../components/Textarea/Textarea.js';
import { TextInput } from '../../components/TextInput/TextInput.js';
import styles from './ReviewRequestSideSheet.module.css';

export interface ReviewRequestSideSheetProps {
  open: boolean;
  onClose: () => void;
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={styles.detail}>
      <span className={styles.label}>{label}</span>
      <div className={styles.value}>{children}</div>
    </div>
  );
}

export function ReviewRequestSideSheet({ open, onClose }: ReviewRequestSideSheetProps) {
  const [state, setState] = useState<'review' | 'approved' | 'denied'>('review');
  const [modal, setModal] = useState<'approve' | 'deny' | 'escalate' | null>(null);

  const closeSheet = () => {
    setModal(null);
    setState('review');
    onClose();
  };

  return (
    <SideSheet
      open={open}
      onClose={closeSheet}
      title={state === 'review' ? 'Review Request' : 'Request Details'}
      subtitle={state === 'review' ? 'Review the access request details below and approve or deny.' : `This request has been ${state}.`}
      className={styles.sheet}
      footer={
        <div className={styles.footerActions}>
          {state === 'review' ? (
            <>
              <Button variant="secondary" onClick={() => setModal('deny')}>Deny</Button>
              <Button variant="secondary" onClick={() => setModal('escalate')}>Escalate</Button>
              <Button onClick={() => setModal('approve')}>Approve</Button>
            </>
          ) : (
            <Button onClick={closeSheet}>Close</Button>
          )}
        </div>
      }
    >
      <div className={styles.body}>
        {state === 'approved' && <div className={styles.successBanner}><strong>Approved</strong><span>This request has been approved and provisioned successfully.</span></div>}
        {state === 'denied' && <div className={styles.errorBanner}><strong>Denied</strong><span>This request has been denied due to policy or administrative reasons.</span></div>}
        <Detail label="Request ID"><strong>REQ-001</strong></Detail>
        <Detail label="Requester">
          <div className={styles.personCard}>
            <Avatar name="John Smith" size="default" />
            <div><strong>John Smith</strong><span>john.smith@company.com</span></div>
          </div>
        </Detail>
        <Detail label="Requested Object"><span className={styles.largeValue}>Finance-Admin Group</span></Detail>
        <Detail label="Object Type"><strong>Directory</strong></Detail>
        <Detail label="Description">Campaign assets and public relations directories</Detail>
        <Detail label="Owner">
          <div className={styles.personCard}>
            <Avatar name="Sarah Mitchell" size="default" />
            <div><strong>Sarah Mitchell</strong><span>sarah.mitchell@company.com</span></div>
            <span className={styles.ownerRole}>Owner</span>
          </div>
        </Detail>
        <Detail label="Access Duration"><strong>24 Hours</strong></Detail>
        <Detail label="Reason for Request">Need access to review Q4 financial reports for the upcoming board presentation.</Detail>
      </div>
      <Modal
        open={modal === 'approve'}
        onClose={() => setModal(null)}
        title="Approve Request"
        subtitle="Review and confirm this approval"
        size="s"
        footer={<div className={styles.modalActions}><Button variant="secondary" onClick={() => setModal(null)}>Cancel</Button><Button onClick={() => { setModal(null); setState('approved'); }}>Approve</Button></div>}
      >
        <DecisionSummary />
        <label className={styles.modalField}>Comments (Optional)<Textarea placeholder="Text area ..." rows={4} /></label>
        <p className={styles.feedback}>Add any optional notes for the audit log.</p>
      </Modal>
      <Modal
        open={modal === 'deny'}
        onClose={() => setModal(null)}
        title="Deny Request"
        subtitle="A reason is required to deny this request"
        size="s"
        footer={<div className={styles.modalActions}><Button variant="secondary" onClick={() => setModal(null)}>Cancel</Button><Button variant="danger" onClick={() => { setModal(null); setState('denied'); }}>Deny</Button></div>}
      >
        <p className={styles.denyPrompt}>Are you sure you want to deny this access request?</p>
        <DecisionSummary />
        <label className={styles.modalField}>Reason for Denial (Required)<Textarea placeholder="Text area ..." rows={4} /></label>
        <p className={styles.feedback}>Reason will be shared with the requester.</p>
      </Modal>
      <Modal
        open={modal === 'escalate'}
        onClose={() => setModal(null)}
        title="Escalate Request"
        subtitle="Send escalation message to the resource owner's manager"
        size="s"
        footer={<div className={styles.modalActions}><Button variant="secondary" onClick={() => setModal(null)}>Cancel</Button><Button onClick={() => setModal(null)}>Send Escalation</Button></div>}
      >
        <p className={styles.value}>Send an escalation email to the resource owner's manager for confirmation.</p>
        <label className={styles.modalField}>To (Required)<TextInput defaultValue="Input text" /></label>
        <label className={styles.modalField}>Subject (Required)<TextInput defaultValue="Input text" /></label>
        <label className={styles.modalField}>Message (Required)<Textarea placeholder="Text area ..." rows={4} /></label>
        <p className={styles.feedback}>Please review and confirm manager escalation terms.</p>
      </Modal>
    </SideSheet>
  );
}

function DecisionSummary() {
  return (
    <div className={styles.summary}>
      <Detail label="Request ID"><strong>REQ-001</strong></Detail>
      <Detail label="Requester"><strong>John Smith</strong></Detail>
      <Detail label="Resource"><strong>Finance-Admin Group</strong></Detail>
      <Detail label="Access Duration"><strong>24 Hours</strong></Detail>
    </div>
  );
}
