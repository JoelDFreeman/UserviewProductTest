import { useEffect, useState } from 'react';

/**
 * Tiny hash-based router for the PoC. No deps.
 *
 *   parseHash('#/users/abc')        -> { name: 'userDetail', params: { id: 'abc' } }
 *   parseHash('#/users')            -> { name: 'usersList',  params: {} }
 *   anything else                    -> { name: 'usersList', params: {} }
 *
 * To navigate: `navigate('#/users/abc')`. Components subscribe via `useRoute()`.
 */

export type Route =
  | { name: 'userViewHome'; params: Record<string, never> }
  | { name: 'userViewProfile'; params: Record<string, never> }
  | { name: 'userViewApprovals'; params: Record<string, never> }
  | { name: 'userViewAccess'; params: Record<string, never> }
  | { name: 'userDetail'; params: { id: string } }
  | { name: 'usersList'; params: Record<string, never> }
  | { name: 'treeRoot'; params: Record<string, never> }
  | { name: 'treeList'; params: { nodeId: string } }
  | { name: 'treeDetail'; params: { nodeId: string; objectId: string } }
  | { name: 'favoritesList'; params: Record<string, never> }
  | { name: 'groups'; params: Record<string, never> }
  | { name: 'devices'; params: Record<string, never> }
  | { name: 'agents'; params: Record<string, never> }
  | { name: 'applications'; params: Record<string, never> }
  | { name: 'accessTemplates'; params: Record<string, never> }
  | { name: 'managementUnits'; params: Record<string, never> }
  | { name: 'insights'; params: Record<string, never> }
  | { name: 'services'; params: Record<string, never> }
  | { name: 'identityHome'; params: Record<string, never> }
  | { name: 'safeguardHome'; params: Record<string, never> };

export type RouteName = Route['name'];

interface RouteDef {
  name: RouteName;
  pattern: RegExp;
  keys: string[];
}

const ROUTES: RouteDef[] = [
  { name: 'userViewHome', pattern: /^#\/user-view\/home$/, keys: [] },
  { name: 'userViewProfile', pattern: /^#\/user-view\/profile$/, keys: [] },
  { name: 'userViewApprovals', pattern: /^#\/user-view\/approvals$/, keys: [] },
  { name: 'userViewAccess', pattern: /^#\/user-view\/my-access$/, keys: [] },
];

const DEFAULT = '#/user-view/home';

function parseHash(hash: string | null | undefined): Route {
  const h = hash || DEFAULT;
  for (const r of ROUTES) {
    const m = h.match(r.pattern);
    if (m) {
      const params: Record<string, string> = {};
      r.keys.forEach((k, i) => {
        params[k] = decodeURIComponent(m[i + 1]);
      });
      return { name: r.name, params } as Route;
    }
  }
  return { name: 'userViewHome', params: {} };
}

/**
 * Programmatic navigation. Updates the URL hash (and triggers `hashchange`
 * which `useRoute` listens to).
 */
export function navigate(path: string): void {
  if (typeof window === 'undefined') return;
  if (window.location.hash === path) return;
  window.location.hash = path;
  // Always scroll to top on route change for a real-page-navigation feel.
  window.scrollTo(0, 0);
}

/**
 * useRoute — returns the currently active route.
 */
function normalizeAddressBar(): void {
  if (typeof window === 'undefined') return;
  const isKnownRoute = ROUTES.some((route) => route.pattern.test(window.location.hash));
  if (!isKnownRoute) {
    window.history.replaceState(null, '', DEFAULT);
  }
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() =>
    typeof window === 'undefined'
      ? { name: 'userViewHome', params: {} }
      : parseHash(window.location.hash),
  );

  useEffect(() => {
    const onHashChange = () => {
      // Re-normalize whenever the hash is cleared (e.g. user edits the URL).
      normalizeAddressBar();
      setRoute(parseHash(window.location.hash));
    };
    window.addEventListener('hashchange', onHashChange);
    normalizeAddressBar();
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return route;
}
