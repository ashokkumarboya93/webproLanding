// WebPro Analytics — Interactive Engine & Telemetry Simulator
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Sticky Navbar Scroll Listener
  const mainNav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      mainNav.classList.add('scrolled');
    } else {
      mainNav.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('hidden');
    });
  }

  // Scroll Reveal Animations
  initScrollReveal();

  // Animated Counter Numbers
  initCounters();

  // Hero Interactive Area Physics & Clarity Scroll Line
  initHeroInteractivity();

  // Live Stream Feed Generator
  initLiveStreamTicker();
});

// Helper: Scroll to element
function scrollToElement(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

// -------------------------------------------------------------
// HERO INTERACTIVE DASHBOARD & CLARITY SCROLL DEPTH ENGINE
// -------------------------------------------------------------
function initHeroInteractivity() {
  const interactiveArea = document.getElementById('heroInteractiveArea');
  const scrollLine = document.getElementById('scrollDepthLine');
  const scrollTag = document.getElementById('scrollReachPercent');
  const heroCursor = document.getElementById('heroCursor');

  if (!interactiveArea || !scrollLine) return;

  interactiveArea.addEventListener('mousemove', (e) => {
    const rect = interactiveArea.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    const relativeX = e.clientX - rect.left;
    const percentY = Math.max(5, Math.min(95, (relativeY / rect.height) * 100));

    // Update scroll depth line position
    scrollLine.style.top = `${percentY}%`;
    
    // Invert percentage for realistic reach: 0% at top = 100% reach, 100% at bottom = ~12% reach
    const calculatedReach = (100 - (percentY * 0.88)).toFixed(1);
    if (scrollTag) {
      scrollTag.innerText = `${calculatedReach}% Users Reached This Point`;
    }

    // Move simulated cursor
    if (heroCursor) {
      heroCursor.style.transform = `translate(${relativeX}px, ${relativeY}px)`;
    }
  });

  interactiveArea.addEventListener('mouseleave', () => {
    scrollLine.style.top = '55%';
    if (scrollTag) {
      scrollTag.innerText = '65.4% Users Reached This Point';
    }
  });
}

// Hero View Mode Switcher
function setHeroMode(mode) {
  const tabHeatmap = document.getElementById('heroTabHeatmap');
  const tabScroll = document.getElementById('heroTabScroll');
  const tabStream = document.getElementById('heroTabStream');
  const heatmapOverlay = document.getElementById('heatmapOverlay');
  const scrollLine = document.getElementById('scrollDepthLine');

  // Reset tab styles
  [tabHeatmap, tabScroll, tabStream].forEach(tab => {
    if (tab) {
      tab.className = 'px-3 py-1 rounded-lg text-gray-300 hover:text-white transition-all';
    }
  });

  if (mode === 'heatmap') {
    tabHeatmap.className = 'px-3 py-1 rounded-lg bg-spring-green text-obsidian font-bold transition-all';
    if (heatmapOverlay) heatmapOverlay.classList.remove('opacity-0', 'pointer-events-none');
    if (scrollLine) scrollLine.style.opacity = '0.4';
  } else if (mode === 'scroll') {
    tabScroll.className = 'px-3 py-1 rounded-lg bg-spring-green text-obsidian font-bold transition-all';
    if (heatmapOverlay) heatmapOverlay.classList.add('opacity-0', 'pointer-events-none');
    if (scrollLine) scrollLine.style.opacity = '1';
  } else if (mode === 'stream') {
    tabStream.className = 'px-3 py-1 rounded-lg bg-spring-green text-obsidian font-bold transition-all';
    if (heatmapOverlay) heatmapOverlay.classList.add('opacity-0', 'pointer-events-none');
    if (scrollLine) scrollLine.style.opacity = '0.2';
  }
}

// Hotspot Popup Diagnostics
const hotspotData = {
  1: {
    badge: 'HOTSPOT #1 • CONVERSION CTA',
    title: 'Primary "Deploy in 30s" Button',
    desc: '4,821 Total Clicks (68.4% reach). High intent conversion cluster. 0.02% rage click rate.'
  },
  2: {
    badge: 'HOTSPOT #2 • PRICING SELECT',
    title: 'Annual Pro Plan Select',
    desc: '3,190 Interactions (45.2% reach). Highest average session duration before conversion.'
  },
  3: {
    badge: 'HOTSPOT #3 • FRUSTRATION / RAGE',
    title: 'Dead Click Alert: #coupon-apply',
    desc: '914 Dead Clicks recorded on Safari iOS 17. Button unclickable due to overlapping z-index modal.'
  },
  4: {
    badge: 'HOTSPOT #4 • NAVIGATION INTENT',
    title: 'Top Navigation Features Menu',
    desc: '1,200 Interactions. High exploratory interest in Heatmaps & Session Replay.'
  }
};

function showHotspotInfo(id) {
  const tooltip = document.getElementById('hotspotTooltip');
  const badge = document.getElementById('tooltipBadge');
  const title = document.getElementById('tooltipTitle');
  const desc = document.getElementById('tooltipDesc');

  if (tooltip && hotspotData[id]) {
    badge.innerText = hotspotData[id].badge;
    title.innerText = hotspotData[id].title;
    desc.innerText = hotspotData[id].desc;
    tooltip.classList.remove('hidden');
  }
}

function hideHotspotInfo() {
  const tooltip = document.getElementById('hotspotTooltip');
  if (tooltip) tooltip.classList.add('hidden');
}

// Live Stream Ticker Generator
function initLiveStreamTicker() {
  const feed = document.getElementById('liveStreamFeed');
  if (!feed) return;

  const sampleEvents = [
    { text: 'Click #checkout-btn', class: 'text-emerald-400', time: '4ms ago' },
    { text: 'Scroll reach 90%', class: 'text-blue-400', time: '18ms ago' },
    { text: 'DOM Snapshot (5.1KB)', class: 'text-spring-green', time: '42ms ago' },
    { text: '🚨 Rage Click: #coupon-apply', class: 'text-red-400', time: '65ms ago' },
    { text: 'Device: Safari iOS 17', class: 'text-purple-400', time: '88ms ago' },
    { text: 'Purchase Confirmed ($276)', class: 'text-spring-green font-bold', time: '120ms ago' }
  ];

  let index = 0;
  setInterval(() => {
    const item = sampleEvents[index % sampleEvents.length];
    const newRow = document.createElement('div');
    newRow.className = 'p-2 rounded bg-white/5 border border-white/5 flex items-center justify-between animate-fadeIn';
    newRow.innerHTML = `
      <span class="${item.class}">${item.text}</span>
      <span class="text-gray-400 text-[10px]">just now</span>
    `;
    feed.insertBefore(newRow, feed.firstChild);
    if (feed.children.length > 5) {
      feed.removeChild(feed.lastChild);
    }
    index++;
  }, 2400);
}

// -------------------------------------------------------------
// BENTO GRID CONTROLS (Heatmaps, Replay, AI, Funnels)
// -------------------------------------------------------------
function setBentoHeatmapMode(mode) {
  const clickTab = document.getElementById('bentoHeatmapClickTab');
  const scrollTab = document.getElementById('bentoHeatmapScrollTab');
  const rageTab = document.getElementById('bentoHeatmapRageTab');
  const thermalLayer = document.getElementById('bentoThermalLayer');
  const scrollOverlay = document.getElementById('bentoScrollOverlay');

  // Reset tab buttons
  [clickTab, scrollTab, rageTab].forEach(tab => {
    if (tab) {
      tab.className = 'px-3.5 py-1.5 rounded-xl text-text-muted hover:text-obsidian transition-all';
    }
  });

  if (mode === 'clicks') {
    clickTab.className = 'px-3.5 py-1.5 rounded-xl bg-obsidian text-white transition-all shadow-sm';
    if (thermalLayer) {
      thermalLayer.classList.remove('hidden');
      thermalLayer.innerHTML = `
        <div class="absolute top-[25%] left-[20%] w-36 h-36 rounded-full bg-red-500/40 blur-2xl"></div>
        <div class="absolute top-[40%] left-[60%] w-44 h-44 rounded-full bg-amber-400/40 blur-2xl"></div>
        <div class="absolute top-[70%] left-[30%] w-40 h-40 rounded-full bg-cyan-400/35 blur-2xl"></div>
        <div class="absolute top-[15%] left-[75%] w-32 h-32 rounded-full bg-spring-green/45 blur-2xl"></div>
      `;
    }
    if (scrollOverlay) scrollOverlay.classList.add('hidden');
  } else if (mode === 'scroll') {
    scrollTab.className = 'px-3.5 py-1.5 rounded-xl bg-obsidian text-white transition-all shadow-sm';
    if (thermalLayer) thermalLayer.classList.add('hidden');
    if (scrollOverlay) {
      scrollOverlay.classList.remove('hidden');
      scrollOverlay.classList.add('flex');
    }
  } else if (mode === 'rage') {
    rageTab.className = 'px-3.5 py-1.5 rounded-xl bg-red-600 text-white transition-all shadow-sm';
    if (thermalLayer) {
      thermalLayer.classList.remove('hidden');
      thermalLayer.innerHTML = `
        <div class="absolute top-[65%] left-[45%] w-48 h-48 rounded-full bg-red-600/75 blur-2xl animate-pulse"></div>
        <div class="absolute top-[30%] left-[80%] w-32 h-32 rounded-full bg-red-500/50 blur-2xl"></div>
      `;
    }
    if (scrollOverlay) scrollOverlay.classList.add('hidden');
  }
}

// Session Replay Player Controls
let isReplayPlaying = false;
let replayTimer = null;
let replayProgress = 45;

function toggleReplayPlay() {
  isReplayPlaying = !isReplayPlaying;
  const playBtn = document.getElementById('replayPlayBtn');
  const playIcon = document.getElementById('replayPlayIcon');
  const progressBar = document.getElementById('replayProgressBar');
  const timeDisplay = document.getElementById('replayTime');

  if (isReplayPlaying) {
    if (playIcon) playIcon.setAttribute('data-lucide', 'pause');
    if (window.lucide) lucide.createIcons();

    replayTimer = setInterval(() => {
      replayProgress += 2;
      if (replayProgress > 100) replayProgress = 0;
      if (progressBar) progressBar.style.width = `${replayProgress}%`;
      if (timeDisplay) {
        const totalSec = Math.floor((replayProgress / 100) * 165);
        const mins = Math.floor(totalSec / 60);
        const secs = totalSec % 60;
        timeDisplay.innerText = `0${mins}:${secs < 10 ? '0' : ''}${secs}`;
      }
    }, 150);
  } else {
    clearInterval(replayTimer);
    if (playIcon) playIcon.setAttribute('data-lucide', 'play');
    if (window.lucide) lucide.createIcons();
  }
}

function setReplaySpeed(speed) {
  // Visual speed switch feedback
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-4 right-4 bg-obsidian text-spring-green font-mono text-xs px-3 py-2 rounded-lg border border-spring-green/30 shadow-lg z-50 animate-fadeIn';
  toast.innerText = `Replay Playback Speed: ${speed}`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1500);
}

// AI Anomaly Detection Prompt Simulator
const aiPrompts = {
  checkout: {
    title: 'WebPro AI Assistant • Checkout Anomaly',
    text: '<strong>Anomaly Detected:</strong> On Safari iOS 17.4, <strong>+34.2% dead clicks</strong> occurred on <code class="bg-gray-100 px-1 py-0.5 rounded font-mono text-[11px]">#coupon-apply-btn</code>. The submit event is intercepted by an invisible overlapping sticky floating banner.',
    impact: 'Impact: ~$4,200 Lost MRR',
    fix: 'Fix: z-index + 10'
  },
  pricing: {
    title: 'WebPro AI Assistant • Pricing Table Radar',
    text: '<strong>Friction Insight:</strong> 61.8% of desktop visitors hover on the <strong>Annual Billing toggle</strong> for >4.2s without clicking. Adding a "Save $60/yr" tooltip increased click-through by +18.7%.',
    impact: 'Opportunity: +18.7% Upgrades',
    fix: 'Fix: Add Savings Pill'
  }
};

function triggerAiPrompt(key) {
  const data = aiPrompts[key];
  const responseCard = document.getElementById('aiResponseCard');
  if (!responseCard || !data) return;

  responseCard.innerHTML = `
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 rounded-md bg-obsidian flex items-center justify-center">
          <i data-lucide="sparkles" class="w-3.5 h-3.5 text-spring-green"></i>
        </div>
        <span class="text-xs font-bold text-obsidian">${data.title}</span>
      </div>
      <span class="text-[10px] font-mono text-emerald-700 bg-spring-green/20 px-2 py-0.5 rounded font-semibold">Grounded Root Cause</span>
    </div>
    <p class="text-xs text-obsidian leading-relaxed mt-2">${data.text}</p>
    <div class="pt-2 mt-2 border-t border-border-subdued flex items-center justify-between text-[11px] text-text-muted font-mono">
      <span class="text-red-500 font-semibold">${data.impact}</span>
      <span class="text-emerald-700 font-semibold">${data.fix}</span>
    </div>
  `;
  if (window.lucide) lucide.createIcons();
}

// -------------------------------------------------------------
// CODE PLAYGROUND & LIVE BEACON SIMULATOR
// -------------------------------------------------------------
const snippets = {
  html: `<span class="code-token-comment">&lt;!-- WebPro Analytics 1-Line Ingestion Snippet --&gt;</span>
<span class="code-token-tag">&lt;script</span>
  <span class="code-token-attr">defer</span>
  <span class="code-token-attr">src</span>=<span class="code-token-string">"https://cdn.webpro.io/tag.js"</span>
  <span class="code-token-attr">data-project-id</span>=<span class="code-token-string">"prj_live_994a02c"</span>
  <span class="code-token-attr">data-zero-cookie</span>=<span class="code-token-string">"true"</span>
  <span class="code-token-attr">data-privacy-mask</span>=<span class="code-token-string">"auto"</span><span class="code-token-tag">&gt;</span>
<span class="code-token-tag">&lt;/script&gt;</span>`,

  react: `<span class="code-token-comment">// app/layout.tsx or pages/_app.tsx (Next.js 14 / React)</span>
<span class="code-token-keyword">import</span> Script <span class="code-token-keyword">from</span> <span class="code-token-string">'next/script'</span>;

<span class="code-token-keyword">export default function</span> RootLayout({ children }) {
  <span class="code-token-keyword">return</span> (
    <span class="code-token-tag">&lt;html&gt;</span>
      <span class="code-token-tag">&lt;head&gt;</span>
        <span class="code-token-tag">&lt;Script</span>
          <span class="code-token-attr">src</span>=<span class="code-token-string">"https://cdn.webpro.io/tag.js"</span>
          <span class="code-token-attr">data-project-id</span>=<span class="code-token-string">"prj_live_994a02c"</span>
          <span class="code-token-attr">strategy</span>=<span class="code-token-string">"afterInteractive"</span>
        <span class="code-token-tag">/&gt;</span>
      <span class="code-token-tag">&lt;/head&gt;</span>
      <span class="code-token-tag">&lt;body&gt;</span>{children}<span class="code-token-tag">&lt;/body&gt;</span>
    <span class="code-token-tag">&lt;/html&gt;</span>
  );
}`,

  vue: `<span class="code-token-comment">// nuxt.config.ts or App.vue</span>
<span class="code-token-keyword">export default</span> defineNuxtConfig({
  <span class="code-token-attr">app</span>: {
    <span class="code-token-attr">head</span>: {
      <span class="code-token-attr">script</span>: [
        {
          <span class="code-token-attr">src</span>: <span class="code-token-string">'https://cdn.webpro.io/tag.js'</span>,
          <span class="code-token-attr">'data-project-id'</span>: <span class="code-token-string">'prj_live_994a02c'</span>,
          <span class="code-token-attr">defer</span>: <span class="code-token-keyword">true</span>
        }
      ]
    }
  }
});`,

  shopify: `<span class="code-token-comment">&lt;!-- Inside theme.liquid before &lt;/head&gt; --&gt;</span>
<span class="code-token-tag">&lt;script</span>
  <span class="code-token-attr">defer</span>
  <span class="code-token-attr">src</span>=<span class="code-token-string">"https://cdn.webpro.io/shopify.min.js"</span>
  <span class="code-token-attr">data-store-id</span>=<span class="code-token-string">"{{ shop.permanent_domain }}"</span>
  <span class="code-token-attr">data-ecom-funnels</span>=<span class="code-token-string">"true"</span><span class="code-token-tag">&gt;</span>
<span class="code-token-tag">&lt;/script&gt;</span>`
};

let currentTab = 'html';

function setCodeTab(tab) {
  currentTab = tab;
  const tabIds = ['tabHtml', 'tabReact', 'tabVue', 'tabShopify'];
  const map = { html: 'tabHtml', react: 'tabReact', vue: 'tabVue', shopify: 'tabShopify' };

  tabIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      if (id === map[tab]) {
        el.className = 'px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-spring-green text-obsidian transition-all';
      } else {
        el.className = 'px-3 py-1.5 rounded-lg text-xs font-mono text-gray-300 hover:text-white transition-all';
      }
    }
  });

  const display = document.getElementById('codeContentDisplay');
  if (display && snippets[tab]) {
    display.innerHTML = `<code>${snippets[tab]}</code>`;
  }
}

function copySnippetCode() {
  const rawCodes = {
    html: '<script defer src="https://cdn.webpro.io/tag.js" data-project-id="prj_live_994a02c" data-zero-cookie="true" data-privacy-mask="auto"></script>',
    react: '<Script src="https://cdn.webpro.io/tag.js" data-project-id="prj_live_994a02c" strategy="afterInteractive" />',
    vue: '{ src: "https://cdn.webpro.io/tag.js", "data-project-id": "prj_live_994a02c", defer: true }',
    shopify: '<script defer src="https://cdn.webpro.io/shopify.min.js" data-store-id="{{ shop.permanent_domain }}" data-ecom-funnels="true"></script>'
  };

  const textToCopy = rawCodes[currentTab] || rawCodes.html;
  navigator.clipboard.writeText(textToCopy).then(() => {
    const copyText = document.getElementById('copyText');
    const copyIcon = document.getElementById('copyIcon');
    if (copyText) copyText.innerText = 'Copied to Clipboard!';
    if (copyIcon) copyIcon.setAttribute('data-lucide', 'check');
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
      if (copyText) copyText.innerText = 'Copy Snippet';
      if (copyIcon) copyIcon.setAttribute('data-lucide', 'copy');
      if (window.lucide) lucide.createIcons();
    }, 2000);
  });
}

function simulateTestBeacon() {
  const beaconIndicator = document.getElementById('beaconIndicator');
  const beaconStatusText = document.getElementById('beaconStatusText');
  const beaconLatency = document.getElementById('beaconLatency');

  if (beaconStatusText) {
    beaconStatusText.innerHTML = '<span class="text-spring-green font-bold">Beacon Received!</span> Packet: 512B • DOM Fingerprint verified.';
  }
  if (beaconLatency) {
    beaconLatency.innerText = 'Latency: 1.1ms (Ultra-Fast)';
  }

  // Trigger celebration confetti
  if (window.confetti) {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#00ED64', '#00684A', '#001E2B', '#FFFFFF']
    });
  }
}

// -------------------------------------------------------------
// PRICING CALCULATOR & SLIDER ENGINE
// -------------------------------------------------------------
let isAnnual = true;

function toggleBillingPeriod() {
  isAnnual = !isAnnual;
  const knob = document.getElementById('billingToggleKnob');
  const proPrice = document.getElementById('proPriceValue');
  const proInterval = document.getElementById('proBillingInterval');
  const enterprisePrice = document.getElementById('enterprisePriceValue');

  if (isAnnual) {
    if (knob) knob.className = 'w-6 h-6 bg-spring-green rounded-full shadow-md transition-transform translate-x-6';
    if (proPrice) proPrice.innerText = '$23';
    if (proInterval) proInterval.innerText = 'Billed Annually ($276/yr)';
    if (enterprisePrice) enterprisePrice.innerText = '$159';
  } else {
    if (knob) knob.className = 'w-6 h-6 bg-spring-green rounded-full shadow-md transition-transform translate-x-0';
    if (proPrice) proPrice.innerText = '$29';
    if (proInterval) proInterval.innerText = 'Billed Monthly';
    if (enterprisePrice) enterprisePrice.innerText = '$199';
  }
}

function updatePricingSlider(val) {
  const sliderText = document.getElementById('sliderValueText');
  const proPrice = document.getElementById('proPriceValue');
  
  // Calculate scaled event count
  let events = 500000;
  if (val <= 20) {
    events = Math.round((val / 20) * 100000);
  } else if (val <= 60) {
    events = Math.round(100000 + ((val - 20) / 40) * 900000);
  } else {
    events = Math.round(1000000 + ((val - 60) / 40) * 9000000);
  }

  const formatted = events >= 1000000 ? `${(events / 1000000).toFixed(1)}M Events` : `${Math.round(events / 1000)}K Events`;
  if (sliderText) sliderText.innerText = `${formatted} / month`;

  // Scale price estimation dynamically
  if (proPrice) {
    if (events <= 100000) {
      proPrice.innerText = isAnnual ? '$15' : '$19';
    } else if (events <= 500000) {
      proPrice.innerText = isAnnual ? '$23' : '$29';
    } else if (events <= 1500000) {
      proPrice.innerText = isAnnual ? '$49' : '$59';
    } else {
      proPrice.innerText = isAnnual ? '$99' : '$119';
    }
  }
}

// -------------------------------------------------------------
// FAQ ACCORDION ENGINE
// -------------------------------------------------------------
function toggleFaq(index) {
  const content = document.getElementById(`faqContent${index}`);
  const icon = document.getElementById(`faqIcon${index}`);

  if (content) {
    const isHidden = content.classList.contains('hidden');
    // Hide all
    for (let i = 1; i <= 4; i++) {
      const c = document.getElementById(`faqContent${i}`);
      const ic = document.getElementById(`faqIcon${i}`);
      if (c) c.classList.add('hidden');
      if (ic) ic.style.transform = 'rotate(0deg)';
    }

    if (isHidden) {
      content.classList.remove('hidden');
      if (icon) icon.style.transform = 'rotate(180deg)';
    }
  }
}

// -------------------------------------------------------------
// INTERACTIVE SANDBOX MODAL ENGINE
// -------------------------------------------------------------
let normalClicks = 0;
let rageClicks = 0;
let deadClicks = 0;
let lastRageClickTime = 0;

function openSandboxModal() {
  const modal = document.getElementById('sandboxModal');
  if (modal) modal.classList.remove('hidden');
}

function closeSandboxModal() {
  const modal = document.getElementById('sandboxModal');
  if (modal) modal.classList.add('hidden');
}

function handleSandboxClick(type) {
  const logList = document.getElementById('sandboxLogList');
  const eventCounter = document.getElementById('sandboxEventCount');
  const now = new Date().toLocaleTimeString();

  if (type === 'normal') {
    normalClicks++;
    const el = document.getElementById('sandboxCountNormal');
    if (el) el.innerText = `${normalClicks} Clicks Logged`;
    appendSandboxLog(`[${now}] Normal click captured: button#btn-normal (1.1ms dispatch)`, 'text-emerald-400');
  } else if (type === 'rage') {
    rageClicks++;
    const el = document.getElementById('sandboxCountRage');
    if (el) el.innerText = `${rageClicks} Rage Events Logged`;
    appendSandboxLog(`[${now}] 🚨 RAGE CLICK DETECTED: 3x clicks in <150ms on #rapid-btn`, 'text-red-400 font-bold');
    
    // Rage pulse effect
    if (window.confetti) {
      confetti({
        particleCount: 20,
        spread: 40,
        colors: ['#FF3B30', '#00ED64']
      });
    }
  } else if (type === 'dead') {
    deadClicks++;
    const el = document.getElementById('sandboxCountDead');
    if (el) el.innerText = `${deadClicks} Dead Clicks Logged`;
    appendSandboxLog(`[${now}] ⚠️ Dead click: zero DOM mutation / navigation detected`, 'text-amber-400');
  }

  const total = normalClicks + rageClicks + deadClicks + 3;
  if (eventCounter) eventCounter.innerText = `${total} events captured`;
}

function appendSandboxLog(text, className) {
  const logList = document.getElementById('sandboxLogList');
  if (!logList) return;
  const row = document.createElement('div');
  row.className = className;
  row.innerText = text;
  logList.insertBefore(row, logList.firstChild);
}

// -------------------------------------------------------------
// FOOTER CUSTOM SNIPPET GENERATOR
// -------------------------------------------------------------
function generateCustomSnippet() {
  const input = document.getElementById('quickDomainInput');
  const domain = (input && input.value.trim()) || 'yourcompany.com';
  
  scrollToElement('playground');
  setCodeTab('html');

  const display = document.getElementById('codeContentDisplay');
  if (display) {
    display.innerHTML = `<code><span class="code-token-comment">&lt;!-- Customized WebPro Tag for ${domain} --&gt;</span>
<span class="code-token-tag">&lt;script</span>
  <span class="code-token-attr">defer</span>
  <span class="code-token-attr">src</span>=<span class="code-token-string">"https://cdn.webpro.io/tag.js"</span>
  <span class="code-token-attr">data-domain</span>=<span class="code-token-string">"${domain}"</span>
  <span class="code-token-attr">data-zero-cookie</span>=<span class="code-token-string">"true"</span><span class="code-token-tag">&gt;</span>
<span class="code-token-tag">&lt;/script&gt;</span></code>`;
  }

  if (window.confetti) {
    confetti({ particleCount: 35, spread: 50, origin: { y: 0.85 } });
  }
}

// -------------------------------------------------------------
// SCROLL REVEAL & COUNTER OBSERVERS
// -------------------------------------------------------------
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => observer.observe(el));
}

function initCounters() {
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(c => {
          const target = parseFloat(c.getAttribute('data-target'));
          let count = 0;
          const speed = target > 50 ? 2 : 0.05;
          const timer = setInterval(() => {
            count += speed;
            if (count >= target) {
              c.innerText = target;
              clearInterval(timer);
            } else {
              c.innerText = target % 1 !== 0 ? count.toFixed(2) : Math.round(count);
            }
          }, 30);
        });
      }
    });
  }, { threshold: 0.3 });

  if (counters.length > 0) {
    observer.observe(counters[0]);
  }
}
