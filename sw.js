/* ============================================================
 * v4.12.44 — 옥길점 웹앱 최소 서비스워커 (설치 자격 충족 전용)
 * ------------------------------------------------------------
 * 안드로이드 크롬·삼성 인터넷이 '설치(WebAPK)'를 내밀려면
 * 매니페스트 + 서비스워커가 있어야 한다(2026-11-28 전수조사 H-1).
 * 여기서는 아무것도 캐시하지 않는다 — fetch 핸들러만 두고 그대로
 * 네트워크로 보낸다. 그래서 지금의 로딩 속도·캐시 체계(?v=, TTL)를
 * 건드리지 않고, 설치 자격만 채운다.
 *   · 앱 화면(app.html)·데이터·아이콘 모두 매번 네트워크에서 받는다.
 *   · 오프라인 캐시는 하지 않는다(직원 화면이 옛 재고를 보여 주면 더 위험).
 * ============================================================ */
self.addEventListener('install', function () {
  /* 새 워커가 대기하지 않고 바로 활성화된다(설치 자격 판정을 늦추지 않게) */
  try { self.skipWaiting(); } catch (e) {}
});

self.addEventListener('activate', function (e) {
  try {
    e.waitUntil(self.clients && self.clients.claim ? self.clients.claim() : Promise.resolve());
  } catch (err) {}
});

/* 네트워크 패스스루 — respondWith 를 부르지 않으므로 기본 동작(네트워크) 그대로다. */
self.addEventListener('fetch', function (e) {
  /* no-op */
});
