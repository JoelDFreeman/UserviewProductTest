import { useRoute } from './lib/router.js';
import { UsersProvider } from './lib/usersStore.js';
import { AppShellProvider } from './lib/appShellContext.js';
import { useToastMessage } from './lib/toastStore.js';
import { CommandPalette } from './components/CommandPalette/CommandPalette.js';
import { Toast } from './components/Toast/Toast.js';
import { WipPage } from './views/WipPage/WipPage.js';
import { UserViewHomePage } from './views/UserViewHomePage/UserViewHomePage.js';
import { UserViewProfilePage } from './views/UserViewProfilePage/UserViewProfilePage.js';
import { UserViewApprovalsPage } from './views/UserViewApprovalsPage/UserViewApprovalsPage.js';
import { UserViewAccessPage } from './views/UserViewAccessPage/UserViewAccessPage.js';

export default function App() {
  const route = useRoute();
  const toast = useToastMessage();
  return (
    <UsersProvider>
      <AppShellProvider>
        {route.name === 'userViewHome' && <UserViewHomePage />}
        {route.name === 'userViewProfile' && <UserViewProfilePage />}
        {route.name === 'userViewApprovals' && <UserViewApprovalsPage />}
        {route.name === 'userViewAccess' && <UserViewAccessPage />}
        <CommandPalette />
        <Toast message={toast.message} onDismiss={toast.dismiss} />
      </AppShellProvider>
    </UsersProvider>
  );
}
