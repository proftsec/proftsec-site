---
title: "Identity Lifecycle Verification Dashboard"
description: "Analyze dormant accounts, offboarding gaps, and access review currency across your identity systems. Generate a compliance score and prioritized remediation plan."
date: 2026-04-05
tags: ["Identity", "IAM", "Access Management", "Compliance", "Active Directory", "Okta", "Entra ID"]
categories: ["Tools"]
hideMeta: false
ShowToc: false
disableShare: true
draft: false
---

{{< rawhtml >}}
<style>
  /* Scope all dashboard styles under .idlc-app to avoid polluting the page */
  .idlc-app {
    --bg-primary: #0f1117;
    --bg-secondary: #1a1d27;
    --bg-card: #1e2130;
    --bg-input: #252838;
    --border: #2d3150;
    --border-light: #3a3f5c;
    --text-primary: #e8eaf6;
    --text-secondary: #8b90b8;
    --text-muted: #555a7a;
    --accent-blue: #4f8ef7;
    --accent-purple: #7c6af7;
    --accent-teal: #2dd4bf;
    --accent-orange: #f97316;
    --risk-critical: #ef4444;
    --risk-high: #f97316;
    --risk-medium: #eab308;
    --risk-low: #22c55e;
    --radius: 10px;
    --radius-sm: 6px;

    background: var(--bg-primary);
    color: var(--text-primary);
    border-radius: 12px;
    padding: 0;
    overflow: clip; /* clips for border-radius without creating a scroll container */
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    line-height: 1.5;
    margin: 24px 0 40px;
    border: 1px solid #2d3150;
    max-width: 100%;
  }

  .idlc-app * { box-sizing: border-box; }

  /* ── App Header ── */
  .idlc-header {
    background: var(--bg-secondary);
    border-bottom: 1px solid var(--border);
    padding: 0 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 58px;
    flex-wrap: wrap;
    gap: 8px;
  }

  .idlc-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 700;
    font-size: 15px;
    color: var(--text-primary);
  }

  .idlc-logo {
    width: 30px; height: 30px;
    background: linear-gradient(135deg, var(--accent-blue), var(--accent-purple));
    border-radius: 7px;
    display: flex; align-items: center; justify-content: center;
    font-size: 15px;
    flex-shrink: 0;
  }

  .idlc-header-badge {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .idlc-header-actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  /* ── Inner container ── */
  .idlc-inner {
    padding: 28px 28px 36px;
  }

  /* ── Tabs ── */
  .idlc-tabs {
    display: flex;
    gap: 2px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 28px;
    overflow-x: auto;
  }

  .idlc-tab-btn {
    padding: 10px 18px;
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    transition: all 0.15s;
    white-space: nowrap;
    font-family: inherit;
  }

  .idlc-tab-btn:hover { color: var(--text-primary); }
  .idlc-tab-btn.active { color: var(--accent-blue); border-bottom-color: var(--accent-blue); }

  .idlc-pane { display: none; }
  .idlc-pane.active { display: block; }

  /* ── Section label ── */
  .idlc-section-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 12px;
  }

  /* ── Cards ── */
  .idlc-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 22px;
    margin-bottom: 18px;
  }

  .idlc-card-title {
    font-size: 15px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 3px;
  }

  .idlc-card-sub {
    font-size: 12px;
    color: var(--text-secondary);
    margin-bottom: 18px;
  }

  /* ── Metric cards ── */
  .idlc-metric-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
    gap: 14px;
    margin-bottom: 24px;
  }

  .idlc-metric {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 18px 20px;
    position: relative;
    overflow: hidden;
  }

  .idlc-metric::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
  }

  .idlc-metric.blue::before   { background: var(--accent-blue); }
  .idlc-metric.purple::before { background: var(--accent-purple); }
  .idlc-metric.teal::before   { background: var(--accent-teal); }
  .idlc-metric.orange::before { background: var(--accent-orange); }

  .idlc-metric-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 8px;
  }

  .idlc-metric-value {
    font-size: 34px;
    font-weight: 800;
    line-height: 1;
    margin-bottom: 5px;
  }

  .idlc-metric-value.blue   { color: var(--accent-blue); }
  .idlc-metric-value.purple { color: var(--accent-purple); }
  .idlc-metric-value.teal   { color: var(--accent-teal); }
  .idlc-metric-value.orange { color: var(--accent-orange); }
  .idlc-metric-sub { font-size: 11px; color: var(--text-secondary); }

  /* ── Score ring ── */
  .idlc-score-wrap {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .idlc-score-ring {
    position: relative;
    width: 76px; height: 76px;
    flex-shrink: 0;
  }

  .idlc-score-ring svg { transform: rotate(-90deg); }

  .idlc-score-text {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .idlc-score-num {
    font-size: 19px;
    font-weight: 800;
    line-height: 1;
  }

  .idlc-score-label {
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
    margin-top: 2px;
  }

  /* ── Forms ── */
  .idlc-form-row { margin-bottom: 16px; }

  .idlc-app label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: var(--text-secondary);
    margin-bottom: 6px;
  }

  .idlc-app input[type="text"],
  .idlc-app input[type="number"],
  .idlc-app input[type="date"],
  .idlc-app select,
  .idlc-app textarea {
    width: 100%;
    background: var(--bg-input);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    color: var(--text-primary);
    font-size: 13px;
    padding: 8px 11px;
    transition: border-color 0.15s;
    font-family: inherit;
    line-height: 1.4;
  }

  .idlc-app input:focus,
  .idlc-app select:focus,
  .idlc-app textarea:focus {
    outline: none;
    border-color: var(--accent-blue);
  }

  .idlc-app textarea { resize: vertical; min-height: 90px; }
  .idlc-app select option { background: var(--bg-input); }
  .idlc-hint { font-size: 11px; color: var(--text-muted); margin-top: 4px; }

  /* ── Buttons ── */
  .idlc-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: var(--radius-sm);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.15s;
    white-space: nowrap;
    font-family: inherit;
    line-height: 1;
  }

  .idlc-btn-primary { background: var(--accent-blue); color: #fff; }
  .idlc-btn-primary:hover { background: #3b7de8; }

  .idlc-btn-secondary {
    background: var(--bg-input);
    color: var(--text-secondary);
    border: 1px solid var(--border);
  }
  .idlc-btn-secondary:hover { color: var(--text-primary); border-color: var(--border-light); }

  .idlc-btn-success { background: #16a34a; color: #fff; }
  .idlc-btn-success:hover { background: #15803d; }

  .idlc-btn-danger {
    background: transparent;
    color: var(--risk-critical);
    border: 1px solid var(--risk-critical);
    padding: 5px 10px;
    font-size: 11px;
  }
  .idlc-btn-danger:hover { background: rgba(239,68,68,0.1); }

  .idlc-btn-group { display: flex; gap: 8px; flex-wrap: wrap; }

  /* ── System chip tags ── */
  .idlc-chips { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 8px; }
  .idlc-chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: var(--bg-input);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 4px 10px 4px 9px;
    font-size: 12px;
    color: var(--text-secondary);
  }

  .idlc-chip-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--accent-blue);
    flex-shrink: 0;
  }

  .idlc-chip-rm {
    cursor: pointer;
    color: var(--text-muted);
    font-size: 14px;
    line-height: 1;
    margin-left: 1px;
  }
  .idlc-chip-rm:hover { color: var(--risk-critical); }

  /* ── System table ── */
  .idlc-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
  }

  .idlc-table th {
    text-align: left;
    padding: 7px 10px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-muted);
    border-bottom: 1px solid var(--border);
  }

  .idlc-table td {
    padding: 9px 10px;
    border-bottom: 1px solid var(--border);
    vertical-align: middle;
  }

  .idlc-table tr:last-child td { border-bottom: none; }
  .idlc-table tr:hover td { background: rgba(79,142,247,0.04); }

  .idlc-table input,
  .idlc-table select {
    padding: 5px 8px;
    font-size: 12px;
    background: var(--bg-input);
    border: 1px solid var(--border);
    border-radius: 4px;
    color: var(--text-primary);
    font-family: inherit;
  }

  .idlc-table input:focus,
  .idlc-table select:focus { outline: none; border-color: var(--accent-blue); }

  /* Constrain table inputs so the table doesn't blow past its scroll container */
  .idlc-table input[type="number"] { width: 70px; min-width: 0; }
  .idlc-table input[type="date"]   { width: 130px; min-width: 0; }

  /* Table scroll wrapper */
  .idlc-table-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }

  /* ── Chart containers ── */
  .idlc-chart-wrap {
    position: relative;
    height: 260px;
    width: 100%;
  }

  /* ── Grid ── */
  .idlc-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  /* Critical: without min-width:0, grid cells expand to content width and cause overflow */
  .idlc-grid-2 > * { min-width: 0; }

  @media (max-width: 1000px) {
    .idlc-grid-2 { grid-template-columns: 1fr; }
    .idlc-metric-grid { grid-template-columns: repeat(2, 1fr); }
    .idlc-header { height: auto; padding: 12px 18px; }
  }

  @media (max-width: 520px) {
    .idlc-metric-grid { grid-template-columns: 1fr; }
    .idlc-inner { padding: 18px 12px 28px; }
  }

  /* ── Risk items ── */
  .idlc-risk-list { display: grid; gap: 10px; }

  .idlc-risk-item {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    background: var(--bg-input);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 13px 15px;
  }

  .idlc-risk-item.critical { border-left: 3px solid var(--risk-critical); }
  .idlc-risk-item.high     { border-left: 3px solid var(--risk-high); }
  .idlc-risk-item.medium   { border-left: 3px solid var(--risk-medium); }
  .idlc-risk-item.low      { border-left: 3px solid var(--risk-low); }

  .idlc-risk-badge {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 2px 7px;
    border-radius: 4px;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .idlc-risk-badge.critical { background: rgba(239,68,68,0.15); color: var(--risk-critical); }
  .idlc-risk-badge.high     { background: rgba(249,115,22,0.15); color: var(--risk-high); }
  .idlc-risk-badge.medium   { background: rgba(234,179,8,0.15);  color: var(--risk-medium); }
  .idlc-risk-badge.low      { background: rgba(34,197,94,0.15);  color: var(--risk-low); }

  .idlc-risk-content { flex: 1; min-width: 0; }
  .idlc-risk-name { font-size: 13px; font-weight: 600; margin-bottom: 3px; }
  .idlc-risk-desc { font-size: 12px; color: var(--text-secondary); line-height: 1.5; }

  .idlc-risk-systems { font-size: 11px; color: var(--text-muted); margin-top: 5px; }
  .idlc-risk-systems span {
    display: inline-block;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 3px;
    padding: 1px 6px;
    margin: 2px 2px 2px 0;
  }

  /* ── Recommendations ── */
  .idlc-rec-list { display: grid; gap: 10px; }

  .idlc-rec-item {
    background: var(--bg-input);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 14px 16px;
    display: flex;
    gap: 13px;
    align-items: flex-start;
  }

  .idlc-rec-num {
    width: 22px; height: 22px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent-blue), var(--accent-purple));
    display: flex; align-items: center; justify-content: center;
    font-size: 10px;
    font-weight: 700;
    flex-shrink: 0;
    margin-top: 2px;
    color: #fff;
  }

  .idlc-rec-content { flex: 1; min-width: 0; }
  .idlc-rec-title { font-size: 13px; font-weight: 600; margin-bottom: 4px; }
  .idlc-rec-body { font-size: 12px; color: var(--text-secondary); line-height: 1.55; }

  .idlc-rec-priority {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 2px 7px;
    border-radius: 4px;
    flex-shrink: 0;
    height: fit-content;
    margin-top: 2px;
  }

  .idlc-rec-priority.immediate { background: rgba(239,68,68,0.15); color: var(--risk-critical); }
  .idlc-rec-priority.short     { background: rgba(249,115,22,0.15); color: var(--risk-high); }
  .idlc-rec-priority.medium    { background: rgba(234,179,8,0.15);  color: var(--risk-medium); }

  /* ── Progress bar ── */
  .idlc-progress { height: 5px; background: var(--bg-input); border-radius: 3px; overflow: hidden; margin-top: 6px; }
  .idlc-progress-fill { height: 100%; border-radius: 3px; transition: width 0.6s ease; }

  /* ── Empty state ── */
  .idlc-empty {
    text-align: center;
    padding: 50px 20px;
    color: var(--text-muted);
  }
  .idlc-empty .icon { font-size: 38px; margin-bottom: 14px; opacity: 0.45; }
  .idlc-empty p { font-size: 13px; line-height: 1.6; }

  /* ── Toast ── */
  .idlc-toast {
    position: fixed;
    bottom: 22px;
    right: 22px;
    background: #1e2130;
    border: 1px solid #2d3150;
    border-radius: 7px;
    padding: 11px 16px;
    font-size: 13px;
    color: #e8eaf6;
    z-index: 9999;
    display: none;
    align-items: center;
    gap: 8px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.5);
    max-width: 320px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  }
  .idlc-toast.show { display: flex; }
  .idlc-toast-dot { width: 7px; height: 7px; border-radius: 50%; background: #22c55e; flex-shrink: 0; }
</style>

<div class="idlc-app" id="idlcApp">

  <!-- Header -->
  <div class="idlc-header">
    <div class="idlc-brand">
      <div class="idlc-logo">🔐</div>
      <span>Identity Lifecycle Verifier</span>
    </div>
    <div class="idlc-header-actions">
      <button class="idlc-btn idlc-btn-secondary" onclick="idlcLoadSample()">📂 Load Sample Data</button>
      <button class="idlc-btn idlc-btn-secondary" onclick="document.getElementById('idlcImportFile').click()">⬆ Import JSON</button>
      <input type="file" id="idlcImportFile" accept=".json" style="display:none" onchange="idlcImport(this)">
      <button class="idlc-btn idlc-btn-success" onclick="idlcExport()">⬇ Export JSON</button>
    </div>
  </div>

  <div class="idlc-inner">

    <!-- Tabs -->
    <div class="idlc-tabs">
      <button class="idlc-tab-btn active" onclick="idlcTab('configure', this)">⚙ Configure</button>
      <button class="idlc-tab-btn" onclick="idlcTab('dashboard', this)">📊 Dashboard</button>
      <button class="idlc-tab-btn" onclick="idlcTab('riskmatrix', this)">⚠ Risk Matrix</button>
      <button class="idlc-tab-btn" onclick="idlcTab('recommendations', this)">✅ Recommendations</button>
    </div>

    <!-- ══ TAB: CONFIGURE ══ -->
    <div id="idlc-configure" class="idlc-pane active">
      <div class="idlc-grid-2">

        <!-- Left -->
        <div>
          <div class="idlc-card">
            <div class="idlc-card-title">Global Settings</div>
            <div class="idlc-card-sub">Define thresholds and audit scope</div>
            <div class="idlc-form-row">
              <label>Organization Name</label>
              <input type="text" id="idlcOrg" placeholder="Acme Corp">
            </div>
            <div class="idlc-form-row">
              <label>Dormancy Threshold (days)</label>
              <input type="number" id="idlcDormDays" value="90" min="1" max="365">
              <div class="idlc-hint">Accounts inactive beyond this period are flagged dormant.</div>
            </div>
            <div class="idlc-form-row">
              <label>Access Review Frequency</label>
              <select id="idlcFreq">
                <option value="30">Monthly (30 days)</option>
                <option value="90" selected>Quarterly (90 days)</option>
                <option value="180">Semi-annually (180 days)</option>
                <option value="365">Annually (365 days)</option>
              </select>
            </div>
            <div class="idlc-form-row">
              <label>Audit Reference Date</label>
              <input type="date" id="idlcRefDate">
            </div>
          </div>

          <div class="idlc-card">
            <div class="idlc-card-title">Add Identity Systems</div>
            <div class="idlc-card-sub">Paste a comma-separated list or use the sample data to get started</div>
            <div class="idlc-form-row">
              <label>Bulk Import (comma-separated)</label>
              <textarea id="idlcBulk" placeholder="Active Directory, Entra ID, Okta, AWS IAM, GitHub, Salesforce, Slack"></textarea>
            </div>
            <button class="idlc-btn idlc-btn-primary" onclick="idlcBulkAdd()" style="margin-bottom:14px">+ Add Systems</button>
            <div class="idlc-section-title">Active Systems</div>
            <div id="idlcChips" class="idlc-chips"></div>
          </div>
        </div>

        <!-- Right -->
        <div>
          <div class="idlc-card">
            <div class="idlc-card-title">System Configuration</div>
            <div class="idlc-card-sub">Set identity counts and audit dates per system. Estimates are fine.</div>
            <div class="idlc-table-scroll">
              <table class="idlc-table" id="idlcSysTable">
                <thead id="idlcSysHead" style="display:none">
                  <tr>
                    <th>System</th>
                    <th>Total IDs</th>
                    <th>Dormant</th>
                    <th>Last Audit</th>
                    <th>Offboard Gaps</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody id="idlcSysTbody"></tbody>
              </table>
            </div>
            <div id="idlcNoSys" class="idlc-empty" style="padding:28px 16px">
              <div class="icon">🗂</div>
              <p>Add identity systems on the left to begin configuration.</p>
            </div>
          </div>

          <div style="text-align:right;margin-top:4px">
            <button class="idlc-btn idlc-btn-primary" onclick="idlcRun()" style="padding:11px 26px;font-size:14px">
              ▶ Run Analysis
            </button>
          </div>
        </div>

      </div>
    </div>

    <!-- ══ TAB: DASHBOARD ══ -->
    <div id="idlc-dashboard" class="idlc-pane">
      <div id="idlcDashEmpty" class="idlc-empty">
        <div class="icon">📊</div>
        <p>Configure your systems and click <strong>Run Analysis</strong> to generate the dashboard.</p>
      </div>
      <div id="idlcDashContent" style="display:none">
        <div class="idlc-metric-grid">
          <div class="idlc-metric blue">
            <div class="idlc-metric-label">Total Identities</div>
            <div class="idlc-metric-value blue" id="idlcMTotal">—</div>
            <div class="idlc-metric-sub" id="idlcMTotalSub">across all systems</div>
          </div>
          <div class="idlc-metric orange">
            <div class="idlc-metric-label">Dormant Identities</div>
            <div class="idlc-metric-value orange" id="idlcMDormant">—</div>
            <div class="idlc-metric-sub" id="idlcMDormantSub">exceeding threshold</div>
          </div>
          <div class="idlc-metric purple">
            <div class="idlc-metric-label">Systems with Gaps</div>
            <div class="idlc-metric-value purple" id="idlcMGaps">—</div>
            <div class="idlc-metric-sub">of <span id="idlcMSysCount">—</span> systems</div>
          </div>
          <div class="idlc-metric teal">
            <div class="idlc-metric-label">Compliance Score</div>
            <div id="idlcScoreArea"></div>
          </div>
        </div>

        <div class="idlc-grid-2">
          <div class="idlc-card">
            <div class="idlc-card-title">Dormant Identities by System</div>
            <div class="idlc-card-sub">Accounts inactive beyond dormancy threshold</div>
            <div class="idlc-chart-wrap"><canvas id="idlcBarChart"></canvas></div>
          </div>
          <div class="idlc-card">
            <div class="idlc-card-title">Identity Distribution</div>
            <div class="idlc-card-sub">Total identities across all systems</div>
            <div class="idlc-chart-wrap"><canvas id="idlcDonutChart"></canvas></div>
          </div>
        </div>

        <div class="idlc-card">
          <div class="idlc-card-title">System Health Overview</div>
          <div class="idlc-card-sub">Audit currency and dormancy rate per system</div>
          <div class="idlc-table-scroll">
            <table class="idlc-table">
              <thead>
                <tr>
                  <th>System</th>
                  <th>Identities</th>
                  <th>Dormant</th>
                  <th>Dormancy Rate</th>
                  <th>Last Audit</th>
                  <th>Audit Currency</th>
                  <th>Offboard Gaps</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody id="idlcHealthTbody"></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- ══ TAB: RISK MATRIX ══ -->
    <div id="idlc-riskmatrix" class="idlc-pane">
      <div id="idlcRiskEmpty" class="idlc-empty">
        <div class="icon">⚠</div>
        <p>Run an analysis to populate the risk matrix.</p>
      </div>
      <div id="idlcRiskContent" style="display:none">
        <div class="idlc-card" style="margin-bottom:18px">
          <div class="idlc-card-title">Risk Findings</div>
          <div class="idlc-card-sub">Gaps ranked by potential business and security impact</div>
          <div id="idlcRiskItems" class="idlc-risk-list" style="margin-top:14px"></div>
        </div>
        <div class="idlc-card">
          <div class="idlc-card-title">Findings by Category</div>
          <div class="idlc-card-sub">Aggregate count of risk findings across gap types</div>
          <div class="idlc-chart-wrap" style="height:200px"><canvas id="idlcRiskChart"></canvas></div>
        </div>
      </div>
    </div>

    <!-- ══ TAB: RECOMMENDATIONS ══ -->
    <div id="idlc-recommendations" class="idlc-pane">
      <div id="idlcRecEmpty" class="idlc-empty">
        <div class="icon">✅</div>
        <p>Run an analysis to generate actionable recommendations.</p>
      </div>
      <div id="idlcRecContent" style="display:none">
        <div class="idlc-card" style="margin-bottom:18px">
          <div class="idlc-card-title">Prioritized Action Plan</div>
          <div class="idlc-card-sub">Based on identified gaps. Address immediate items within 72 hours.</div>
          <div id="idlcRecList" class="idlc-rec-list" style="margin-top:14px"></div>
        </div>
        <div class="idlc-card">
          <div class="idlc-card-title">Implementation Timeline</div>
          <div class="idlc-card-sub">Suggested sequencing for remediation work</div>
          <div id="idlcTimeline" style="margin-top:14px"></div>
        </div>
      </div>
    </div>

  </div><!-- /inner -->
</div><!-- /app -->

<div class="idlc-toast" id="idlcToast">
  <div class="idlc-toast-dot"></div>
  <span id="idlcToastMsg"></span>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<script>
(function() {
  // ── State ──
  var idlcSystems = [];
  var idlcResults = null;
  var idlcBarChartInst = null;
  var idlcDonutInst = null;
  var idlcRiskInst = null;
  var idlcToastTimer = null;

  // Set today's date
  document.getElementById('idlcRefDate').valueAsDate = new Date();

  // ── Tab switching ──
  window.idlcTab = function(name, btn) {
    document.querySelectorAll('.idlc-pane').forEach(function(p) { p.classList.remove('active'); });
    document.querySelectorAll('.idlc-tab-btn').forEach(function(b) { b.classList.remove('active'); });
    document.getElementById('idlc-' + name).classList.add('active');
    btn.classList.add('active');
  };

  // ── System management ──
  window.idlcBulkAdd = function() {
    var raw = document.getElementById('idlcBulk').value.trim();
    if (!raw) return;
    raw.split(',').map(function(s) { return s.trim(); }).filter(Boolean).forEach(function(n) {
      if (!idlcSystems.find(function(s) { return s.name.toLowerCase() === n.toLowerCase(); })) {
        idlcSystems.push({ name: n, total: '', dormant: '', lastAudit: '', offboardGaps: '' });
      }
    });
    document.getElementById('idlcBulk').value = '';
    idlcRenderSystems();
  };

  window.idlcRemove = function(i) {
    idlcReadTable();
    idlcSystems.splice(i, 1);
    idlcRenderSystems();
  };

  function idlcReadTable() {
    var rows = document.querySelectorAll('#idlcSysTbody tr');
    rows.forEach(function(row, i) {
      if (idlcSystems[i]) {
        idlcSystems[i].total        = parseInt(row.querySelector('[data-f="total"]').value) || 0;
        idlcSystems[i].dormant      = parseInt(row.querySelector('[data-f="dormant"]').value) || 0;
        idlcSystems[i].lastAudit    = row.querySelector('[data-f="audit"]').value;
        idlcSystems[i].offboardGaps = parseInt(row.querySelector('[data-f="gaps"]').value) || 0;
      }
    });
  }

  function idlcRenderSystems() {
    var tbody = document.getElementById('idlcSysTbody');
    var chips = document.getElementById('idlcChips');
    var noSys = document.getElementById('idlcNoSys');
    var thead = document.getElementById('idlcSysHead');

    tbody.innerHTML = '';
    chips.innerHTML = '';

    if (idlcSystems.length === 0) {
      noSys.style.display = '';
      thead.style.display = 'none';
      return;
    }

    noSys.style.display = 'none';
    thead.style.display = '';

    idlcSystems.forEach(function(sys, i) {
      var chip = document.createElement('div');
      chip.className = 'idlc-chip';
      chip.innerHTML = '<span class="idlc-chip-dot"></span>' + idlcEsc(sys.name) +
        '<span class="idlc-chip-rm" onclick="idlcRemove(' + i + ')">×</span>';
      chips.appendChild(chip);

      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td><strong>' + idlcEsc(sys.name) + '</strong></td>' +
        '<td><input type="number" data-f="total"   value="' + (sys.total||'') + '" placeholder="0" min="0"></td>' +
        '<td><input type="number" data-f="dormant" value="' + (sys.dormant||'') + '" placeholder="0" min="0"></td>' +
        '<td><input type="date"   data-f="audit"   value="' + (sys.lastAudit||'') + '"></td>' +
        '<td><input type="number" data-f="gaps"    value="' + (sys.offboardGaps||'') + '" placeholder="0" min="0"></td>' +
        '<td><button class="idlc-btn idlc-btn-danger" onclick="idlcReadTable();idlcRemove(' + i + ')">Remove</button></td>';
      tbody.appendChild(tr);
    });
  }

  function idlcEsc(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  // ── Sample data ──
  window.idlcLoadSample = function() {
    document.getElementById('idlcOrg').value = 'Acme Corp';
    document.getElementById('idlcDormDays').value = '90';
    document.getElementById('idlcFreq').value = '90';
    idlcSystems = [
      { name: 'Active Directory', total: 1240, dormant: 187, lastAudit: '2025-10-15', offboardGaps: 34 },
      { name: 'Entra ID',         total: 980,  dormant: 92,  lastAudit: '2025-12-01', offboardGaps: 12 },
      { name: 'Okta',             total: 720,  dormant: 58,  lastAudit: '2026-01-20', offboardGaps: 7  },
      { name: 'AWS IAM',          total: 340,  dormant: 71,  lastAudit: '2025-09-30', offboardGaps: 28 },
      { name: 'Azure RBAC',       total: 460,  dormant: 44,  lastAudit: '2025-11-12', offboardGaps: 9  },
      { name: 'GitHub',           total: 285,  dormant: 39,  lastAudit: '2026-02-05', offboardGaps: 14 },
      { name: 'Salesforce',       total: 195,  dormant: 22,  lastAudit: '2025-08-20', offboardGaps: 5  },
      { name: 'Slack',            total: 890,  dormant: 103, lastAudit: '2025-07-14', offboardGaps: 18 }
    ];
    idlcRenderSystems();
    idlcToast('Sample data loaded — click Run Analysis to continue.');
  };

  // ── Analysis engine ──
  window.idlcRun = function() {
    idlcReadTable();
    if (idlcSystems.length === 0) { idlcToast('Add at least one identity system first.'); return; }

    var dormDays = parseInt(document.getElementById('idlcDormDays').value) || 90;
    var freqDays = parseInt(document.getElementById('idlcFreq').value) || 90;
    var refDate  = new Date(document.getElementById('idlcRefDate').value || Date.now());

    idlcSystems.forEach(function(sys) {
      if (sys.lastAudit) {
        var d = new Date(sys.lastAudit);
        sys.daysSinceAudit = Math.floor((refDate - d) / 86400000);
        sys.auditOverdue = sys.daysSinceAudit > freqDays;
      } else {
        sys.daysSinceAudit = null;
        sys.auditOverdue = true;
      }
      sys.dormRate = sys.total > 0 ? (sys.dormant / sys.total * 100) : 0;
    });

    var totalIds  = idlcSystems.reduce(function(a,s) { return a + (s.total||0); }, 0);
    var totalDorm = idlcSystems.reduce(function(a,s) { return a + (s.dormant||0); }, 0);
    var totalGaps = idlcSystems.reduce(function(a,s) { return a + (s.offboardGaps||0); }, 0);
    var sysWithGaps = idlcSystems.filter(function(s) {
      return s.dormRate > 10 || s.offboardGaps > 0 || s.auditOverdue;
    }).length;

    var score = 100;
    idlcSystems.forEach(function(s) {
      score -= (Math.min(s.dormRate * 0.4, 15) + Math.min((s.offboardGaps / Math.max(s.total,1)) * 200, 12) + (s.auditOverdue ? 8 : 0)) / idlcSystems.length;
    });
    score = Math.max(0, Math.min(100, Math.round(score)));

    // Risks
    var risks = [];
    idlcSystems.forEach(function(sys) {
      if (sys.offboardGaps > 0) {
        var sev = sys.offboardGaps > 20 ? 'critical' : sys.offboardGaps > 10 ? 'high' : 'medium';
        risks.push({ severity: sev, name: 'Incomplete Offboarding — ' + sys.name,
          desc: sys.offboardGaps + ' accounts were not fully deprovisioned. Former employees or contractors may retain access, creating unauthorized access vectors.',
          systems: [sys.name], category: 'Offboarding', score: sys.offboardGaps * (sev==='critical'?10:sev==='high'?7:4) });
      }
      if (sys.dormRate > 20) {
        risks.push({ severity: 'critical', name: 'High Dormancy Rate — ' + sys.name,
          desc: sys.dormant + ' of ' + sys.total + ' identities (' + sys.dormRate.toFixed(1) + '%) exceed the ' + dormDays + '-day dormancy threshold. Expands the attack surface for credential stuffing and lateral movement.',
          systems: [sys.name], category: 'Dormant Accounts', score: sys.dormant });
      } else if (sys.dormRate > 10) {
        risks.push({ severity: 'high', name: 'Elevated Dormancy Rate — ' + sys.name,
          desc: sys.dormant + ' dormant identities (' + sys.dormRate.toFixed(1) + '%) detected. These accounts should be reviewed and disabled or removed.',
          systems: [sys.name], category: 'Dormant Accounts', score: sys.dormant * 0.7 });
      } else if (sys.dormant > 0) {
        risks.push({ severity: 'medium', name: 'Dormant Identities Present — ' + sys.name,
          desc: sys.dormant + ' dormant identities found. Rate is low but review in the next access review cycle.',
          systems: [sys.name], category: 'Dormant Accounts', score: sys.dormant * 0.3 });
      }
      if (sys.auditOverdue) {
        var overdueDays = sys.daysSinceAudit != null ? sys.daysSinceAudit - freqDays : null;
        var label = sys.daysSinceAudit != null ? overdueDays + ' days overdue' : 'Never audited';
        risks.push({ severity: sys.daysSinceAudit == null ? 'critical' : overdueDays > freqDays ? 'high' : 'medium',
          name: 'Access Review Overdue — ' + sys.name,
          desc: 'Last audit: ' + (sys.lastAudit || 'not recorded') + '. ' + label + '. Unreviewed access accumulates privilege drift and orphaned accounts.',
          systems: [sys.name], category: 'Audit Currency', score: (overdueDays || 200) * 0.5 });
      }
    });

    var sevOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    risks.sort(function(a,b) { return (sevOrder[a.severity]-sevOrder[b.severity]) || (b.score-a.score); });

    // Recommendations
    var recs = [];
    var offSys = idlcSystems.filter(function(s){ return s.offboardGaps>0; }).sort(function(a,b){ return b.offboardGaps-a.offboardGaps; });
    var critSys = idlcSystems.filter(function(s){ return s.dormRate>20 || s.offboardGaps>20; });
    var overSys = idlcSystems.filter(function(s){ return s.auditOverdue; });

    if (offSys.length > 0) {
      recs.push({ title: 'Remediate Incomplete Offboardings',
        body: offSys.length + ' system(s) have unresolved offboarding gaps totalling ' + totalGaps + ' accounts. Prioritize: ' +
          offSys.slice(0,3).map(function(s){ return s.name+' ('+s.offboardGaps+')'; }).join(', ') +
          '. Cross-reference HR termination records against active directory entries and disable all matches immediately.',
        priority: 'immediate' });
    }
    if (critSys.length > 0) {
      recs.push({ title: 'Disable High-Dormancy Accounts',
        body: 'Run an automated dormancy sweep across ' + critSys.map(function(s){ return s.name; }).join(', ') +
          '. Disable accounts inactive for >' + dormDays + ' days and schedule deletion review after 30 days of confirmed non-use. Implement automated dormancy policy in your IdP if not present.',
        priority: 'immediate' });
    }
    if (overSys.length > 0) {
      recs.push({ title: 'Schedule Overdue Access Reviews',
        body: overSys.length + ' system(s) have not been reviewed within the ' + freqDays + '-day policy window: ' +
          overSys.map(function(s){ return s.name; }).join(', ') +
          '. Initiate access certification campaigns in your IGA tool or manually assign reviewers.',
        priority: overSys.length > 3 ? 'immediate' : 'short' });
    }
    var topOffboard = idlcSystems.slice().sort(function(a,b){ return b.offboardGaps-a.offboardGaps; });
    recs.push({ title: 'Implement Automated Joiner-Mover-Leaver Workflows',
      body: 'Reduce manual offboarding gaps via SCIM provisioning or API-based connectors from your HRMS to each identity system. Start with highest-risk systems: ' +
        topOffboard.slice(0,2).map(function(s){ return s.name; }).join(' and ') + '.',
      priority: 'short' });
    recs.push({ title: 'Deploy Dormancy Detection Monitoring',
      body: 'Integrate sign-in audit logs from all systems into your SIEM or identity analytics platform. Configure alerts when an account exceeds ' + dormDays +
        ' days of inactivity. Consider time-based access policies (sunset clauses) for service accounts and contractor identities.',
      priority: 'medium' });
    recs.push({ title: 'Establish Cross-System Identity Correlation',
      body: 'Map identities across all ' + idlcSystems.length + ' systems to a single authoritative source (e.g., HRMS or your IdP). A unified identity graph enables automated deprovisioning across all downstream systems on a single lifecycle event.',
      priority: 'medium' });

    idlcResults = {
      totalIds: totalIds, totalDorm: totalDorm, totalGaps: totalGaps,
      sysWithGaps: sysWithGaps, score: score, risks: risks, recs: recs,
      dormDays: dormDays, freqDays: freqDays,
      orgName: document.getElementById('idlcOrg').value || 'Your Organization',
      auditDate: refDate.toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })
    };

    idlcRenderDash();
    idlcRenderRisk();
    idlcRenderRecs();

    document.querySelectorAll('.idlc-tab-btn')[1].click();
    idlcToast('Analysis complete — ' + risks.length + ' risk findings identified.');
  };

  // ── Dashboard ──
  function idlcRenderDash() {
    var r = idlcResults;
    document.getElementById('idlcDashEmpty').style.display = 'none';
    document.getElementById('idlcDashContent').style.display = 'block';

    document.getElementById('idlcMTotal').textContent   = r.totalIds.toLocaleString();
    document.getElementById('idlcMDormant').textContent = r.totalDorm.toLocaleString();
    document.getElementById('idlcMGaps').textContent    = r.sysWithGaps;
    document.getElementById('idlcMTotalSub').textContent  = 'across ' + idlcSystems.length + ' systems';
    document.getElementById('idlcMDormantSub').textContent = '>' + r.dormDays + '-day threshold';
    document.getElementById('idlcMSysCount').textContent   = idlcSystems.length;

    var sc = r.score;
    var scoreColor = sc >= 75 ? '#22c55e' : sc >= 50 ? '#eab308' : '#ef4444';
    var circ = 2 * Math.PI * 26;
    var offset = circ - (sc / 100) * circ;
    document.getElementById('idlcScoreArea').innerHTML =
      '<div class="idlc-score-wrap">' +
        '<div class="idlc-score-ring">' +
          '<svg width="76" height="76" viewBox="0 0 76 76">' +
            '<circle cx="38" cy="38" r="26" fill="none" stroke="#2d3150" stroke-width="7"/>' +
            '<circle cx="38" cy="38" r="26" fill="none" stroke="' + scoreColor + '" stroke-width="7"' +
              ' stroke-dasharray="' + circ + '" stroke-dashoffset="' + offset + '" stroke-linecap="round"/>' +
          '</svg>' +
          '<div class="idlc-score-text">' +
            '<span class="idlc-score-num" style="color:' + scoreColor + '">' + sc + '</span>' +
            '<span class="idlc-score-label">/100</span>' +
          '</div>' +
        '</div>' +
        '<div>' +
          '<div style="font-size:14px;font-weight:700;color:' + scoreColor + '">' + (sc>=75?'Good':sc>=50?'Fair':'Poor') + '</div>' +
          '<div style="font-size:11px;color:#8b90b8;margin-top:2px">' + (sc>=75?'Mostly compliant':'Gaps identified') + '</div>' +
        '</div>' +
      '</div>';

    // Bar chart
    var barCtx = document.getElementById('idlcBarChart').getContext('2d');
    if (idlcBarChartInst) idlcBarChartInst.destroy();
    idlcBarChartInst = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: idlcSystems.map(function(s){ return s.name; }),
        datasets: [{
          label: 'Dormant Accounts',
          data: idlcSystems.map(function(s){ return s.dormant||0; }),
          backgroundColor: idlcSystems.map(function(s){ return s.dormRate>20?'#ef4444':s.dormRate>10?'#f97316':'#4f8ef7'; }),
          borderRadius: 4, borderSkipped: false
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#8b90b8', font: { size: 11 } }, grid: { color: '#2d3150' } },
          y: { ticks: { color: '#8b90b8', font: { size: 11 } }, grid: { color: '#2d3150' }, beginAtZero: true }
        }
      }
    });

    // Donut chart
    var dCtx = document.getElementById('idlcDonutChart').getContext('2d');
    if (idlcDonutInst) idlcDonutInst.destroy();
    var pal = ['#4f8ef7','#7c6af7','#2dd4bf','#f97316','#ec4899','#eab308','#22c55e','#ef4444'];
    idlcDonutInst = new Chart(dCtx, {
      type: 'doughnut',
      data: {
        labels: idlcSystems.map(function(s){ return s.name; }),
        datasets: [{
          data: idlcSystems.map(function(s){ return s.total||0; }),
          backgroundColor: pal.slice(0, idlcSystems.length),
          borderColor: '#1e2130', borderWidth: 3
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { position: 'right', labels: { color: '#8b90b8', font: { size: 11 }, padding: 10, boxWidth: 11 } }
        }
      }
    });

    // Health table
    var tbody = document.getElementById('idlcHealthTbody');
    tbody.innerHTML = '';
    idlcSystems.forEach(function(sys) {
      var rate = sys.dormRate.toFixed(1);
      var rc = sys.dormRate > 20 ? 'var(--risk-critical)' : sys.dormRate > 10 ? 'var(--risk-high)' : 'var(--risk-low)';
      var auditHtml = sys.auditOverdue
        ? '<span style="color:var(--risk-critical)">⚠ Overdue' + (sys.daysSinceAudit!=null?' ('+sys.daysSinceAudit+'d ago)':'') + '</span>'
        : '<span style="color:var(--risk-low)">✓ Current (' + sys.daysSinceAudit + 'd ago)</span>';
      var gc = sys.offboardGaps > 20 ? 'var(--risk-critical)' : sys.offboardGaps > 0 ? 'var(--risk-high)' : 'var(--risk-low)';
      var ok = !sys.auditOverdue && sys.dormRate < 10 && sys.offboardGaps === 0;
      var badge = ok ? '<span class="idlc-risk-badge low" style="border-radius:4px">Healthy</span>'
        : sys.dormRate > 20 || sys.offboardGaps > 20 ? '<span class="idlc-risk-badge critical" style="border-radius:4px">Critical</span>'
        : sys.auditOverdue || sys.offboardGaps > 0 ? '<span class="idlc-risk-badge high" style="border-radius:4px">At Risk</span>'
        : '<span class="idlc-risk-badge medium" style="border-radius:4px">Review</span>';
      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td><strong>' + idlcEsc(sys.name) + '</strong></td>' +
        '<td>' + (sys.total||0).toLocaleString() + '</td>' +
        '<td style="color:' + rc + ';font-weight:600">' + (sys.dormant||0).toLocaleString() + '</td>' +
        '<td><div style="color:' + rc + ';font-weight:600">' + rate + '%</div>' +
          '<div class="idlc-progress" style="max-width:90px"><div class="idlc-progress-fill" style="width:' + Math.min(rate,100) + '%;background:' + rc + '"></div></div></td>' +
        '<td>' + (sys.lastAudit || '<span style="color:var(--text-muted)">Not recorded</span>') + '</td>' +
        '<td>' + auditHtml + '</td>' +
        '<td style="color:' + gc + ';font-weight:600">' + (sys.offboardGaps||0) + '</td>' +
        '<td>' + badge + '</td>';
      tbody.appendChild(tr);
    });
  }

  // ── Risk Matrix ──
  function idlcRenderRisk() {
    var r = idlcResults;
    document.getElementById('idlcRiskEmpty').style.display = 'none';
    document.getElementById('idlcRiskContent').style.display = 'block';

    var container = document.getElementById('idlcRiskItems');
    container.innerHTML = '';
    r.risks.forEach(function(risk) {
      var div = document.createElement('div');
      div.className = 'idlc-risk-item ' + risk.severity;
      div.innerHTML =
        '<div class="idlc-risk-badge ' + risk.severity + '">' + risk.severity + '</div>' +
        '<div class="idlc-risk-content">' +
          '<div class="idlc-risk-name">' + idlcEsc(risk.name) + '</div>' +
          '<div class="idlc-risk-desc">' + idlcEsc(risk.desc) + '</div>' +
          '<div class="idlc-risk-systems">' + risk.systems.map(function(s){ return '<span>'+idlcEsc(s)+'</span>'; }).join('') + '</div>' +
        '</div>';
      container.appendChild(div);
    });

    var cats = {};
    r.risks.forEach(function(risk) { cats[risk.category] = (cats[risk.category]||0) + 1; });
    var riskCtx = document.getElementById('idlcRiskChart').getContext('2d');
    if (idlcRiskInst) idlcRiskInst.destroy();
    idlcRiskInst = new Chart(riskCtx, {
      type: 'bar',
      data: {
        labels: Object.keys(cats),
        datasets: [{ label: 'Findings', data: Object.values(cats),
          backgroundColor: ['#ef4444','#f97316','#eab308'], borderRadius: 4 }]
      },
      options: {
        indexAxis: 'y', responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#8b90b8' }, grid: { color: '#2d3150' }, beginAtZero: true },
          y: { ticks: { color: '#8b90b8' }, grid: { display: false } }
        }
      }
    });
  }

  // ── Recommendations ──
  function idlcRenderRecs() {
    var r = idlcResults;
    document.getElementById('idlcRecEmpty').style.display = 'none';
    document.getElementById('idlcRecContent').style.display = 'block';

    var list = document.getElementById('idlcRecList');
    list.innerHTML = '';
    r.recs.forEach(function(rec, i) {
      var div = document.createElement('div');
      div.className = 'idlc-rec-item';
      var pLabel = rec.priority === 'immediate' ? 'Immediate' : rec.priority === 'short' ? '30 Days' : '90 Days';
      div.innerHTML =
        '<div class="idlc-rec-num">' + (i+1) + '</div>' +
        '<div class="idlc-rec-content">' +
          '<div class="idlc-rec-title">' + idlcEsc(rec.title) + '</div>' +
          '<div class="idlc-rec-body">' + idlcEsc(rec.body) + '</div>' +
        '</div>' +
        '<div class="idlc-rec-priority ' + rec.priority + '">' + pLabel + '</div>';
      list.appendChild(div);
    });

    var phases = [
      { label: 'Week 1–2', color: '#ef4444', items: r.recs.filter(function(x){ return x.priority==='immediate'; }) },
      { label: '30 Days',  color: '#f97316', items: r.recs.filter(function(x){ return x.priority==='short'; }) },
      { label: '90 Days',  color: '#eab308', items: r.recs.filter(function(x){ return x.priority==='medium'; }) }
    ];
    var tl = document.getElementById('idlcTimeline');
    tl.innerHTML = phases.filter(function(p){ return p.items.length>0; }).map(function(p) {
      return '<div style="display:flex;gap:14px;margin-bottom:14px">' +
        '<div style="display:flex;flex-direction:column;align-items:center;flex-shrink:0;width:72px">' +
          '<div style="background:' + p.color + ';color:#fff;font-size:10px;font-weight:700;padding:3px 8px;border-radius:4px;text-align:center;white-space:nowrap">' + p.label + '</div>' +
          '<div style="width:2px;flex:1;background:' + p.color + ';opacity:0.25;min-height:16px;margin-top:4px"></div>' +
        '</div>' +
        '<div style="flex:1">' +
          p.items.map(function(item) {
            return '<div style="font-size:12px;color:#8b90b8;padding:5px 0;border-bottom:1px solid #2d3150">▸ ' + idlcEsc(item.title) + '</div>';
          }).join('') +
        '</div>' +
      '</div>';
    }).join('');
  }

  // ── Export JSON ──
  window.idlcExport = function() {
    if (!idlcResults) { idlcToast('Run an analysis first to generate a report.'); return; }
    var r = idlcResults;
    var now = new Date();

    var payload = {
      meta: {
        tool: 'ProftSec Identity Lifecycle Verification Dashboard',
        url: 'https://proftsec.com/tools/identity-lifecycle-verification-dashboard/',
        generatedAt: now.toISOString(),
        generatedAtReadable: now.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })
      },
      configuration: {
        organizationName: r.orgName,
        auditReferenceDate: r.auditDate,
        dormancyThresholdDays: r.dormDays,
        accessReviewFrequencyDays: r.freqDays
      },
      systems: idlcSystems.map(function(sys) {
        return {
          name: sys.name,
          totalIdentities: sys.total || 0,
          dormantIdentities: sys.dormant || 0,
          dormancyRatePercent: parseFloat(sys.dormRate.toFixed(2)),
          lastAuditDate: sys.lastAudit || null,
          daysSinceAudit: sys.daysSinceAudit != null ? sys.daysSinceAudit : null,
          auditOverdue: sys.auditOverdue,
          offboardingGaps: sys.offboardGaps || 0
        };
      }),
      summary: {
        totalIdentities: r.totalIds,
        totalDormantIdentities: r.totalDorm,
        totalOffboardingGaps: r.totalGaps,
        systemsAnalyzed: idlcSystems.length,
        systemsWithGaps: r.sysWithGaps,
        complianceScore: r.score,
        complianceGrade: r.score >= 75 ? 'Good' : r.score >= 50 ? 'Fair' : 'Poor'
      },
      riskFindings: r.risks.map(function(risk, i) {
        return {
          index: i + 1,
          severity: risk.severity,
          category: risk.category,
          name: risk.name,
          description: risk.desc,
          affectedSystems: risk.systems
        };
      }),
      recommendations: r.recs.map(function(rec, i) {
        var tfMap = { immediate: 'Immediate (Week 1-2)', short: 'Short-term (30 days)', medium: 'Medium-term (90 days)' };
        return {
          index: i + 1,
          priority: rec.priority,
          timeframe: tfMap[rec.priority] || rec.priority,
          title: rec.title,
          description: rec.body
        };
      })
    };

    var json = JSON.stringify(payload, null, 2);
    var blob = new Blob([json], { type: 'application/json;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var ts = now.toISOString().slice(0, 19).replace(/:/g, '-');
    var a = document.createElement('a');
    a.href = url;
    a.download = 'identity-lifecycle-report-' + ts + '.json';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function() { URL.revokeObjectURL(url); }, 100);
    idlcToast('JSON report downloaded.');
  };

  // ── Import JSON ──
  window.idlcImport = function(input) {
    var file = input.files[0];
    if (!file) return;
    // Reset input so the same file can be re-imported if needed
    input.value = '';

    var reader = new FileReader();
    reader.onerror = function() { idlcToast('Could not read file.'); };
    reader.onload = function(e) {
      var payload;
      try {
        payload = JSON.parse(e.target.result);
      } catch (err) {
        idlcToast('Invalid JSON — could not parse file.');
        return;
      }

      // Validate it looks like one of our exports
      if (!payload.configuration || !payload.systems || !Array.isArray(payload.systems)) {
        idlcToast('File does not appear to be a valid Identity Lifecycle report.');
        return;
      }

      var cfg = payload.configuration;

      // Restore configuration fields
      document.getElementById('idlcOrg').value      = cfg.organizationName || '';
      document.getElementById('idlcDormDays').value  = cfg.dormancyThresholdDays || 90;
      document.getElementById('idlcFreq').value      = cfg.accessReviewFrequencyDays || 90;

      // Restore systems array
      idlcSystems = payload.systems.map(function(s) {
        return {
          name:          s.name,
          total:         s.totalIdentities        || 0,
          dormant:       s.dormantIdentities      || 0,
          lastAudit:     s.lastAuditDate          || '',
          offboardGaps:  s.offboardingGaps        || 0
        };
      });
      idlcRenderSystems();

      // If the export includes full analysis results, restore and render those too
      if (payload.summary && payload.riskFindings && payload.recommendations) {
        var s = payload.summary;

        // Recompute derived per-system fields that the render functions need
        var dormDays = cfg.dormancyThresholdDays || 90;
        var freqDays = cfg.accessReviewFrequencyDays || 90;
        idlcSystems.forEach(function(sys, i) {
          var src = payload.systems[i];
          sys.dormRate       = src.dormancyRatePercent != null ? src.dormancyRatePercent : (sys.total > 0 ? sys.dormant / sys.total * 100 : 0);
          sys.daysSinceAudit = src.daysSinceAudit != null ? src.daysSinceAudit : null;
          sys.auditOverdue   = src.auditOverdue != null ? src.auditOverdue : true;
        });

        idlcResults = {
          totalIds:    s.totalIdentities,
          totalDorm:   s.totalDormantIdentities,
          totalGaps:   s.totalOffboardingGaps,
          sysWithGaps: s.systemsWithGaps,
          score:       s.complianceScore,
          dormDays:    dormDays,
          freqDays:    freqDays,
          orgName:     cfg.organizationName || 'Your Organization',
          auditDate:   cfg.auditReferenceDate || new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' }),
          risks: payload.riskFindings.map(function(f) {
            return { severity: f.severity, name: f.name, desc: f.description, systems: f.affectedSystems, category: f.category, score: 0 };
          }),
          recs: payload.recommendations.map(function(r) {
            return { priority: r.priority, title: r.title, body: r.description };
          })
        };

        idlcRenderDash();
        idlcRenderRisk();
        idlcRenderRecs();

        // Switch to Dashboard tab
        document.querySelectorAll('.idlc-tab-btn')[1].click();
        idlcToast('Report imported — dashboard restored from ' + (payload.meta && payload.meta.generatedAtReadable ? payload.meta.generatedAtReadable : 'file') + '.');
      } else {
        // Config-only import: switch to Configure tab so user can run analysis
        document.querySelectorAll('.idlc-tab-btn')[0].click();
        idlcToast('Configuration imported. Click Run Analysis to generate results.');
      }
    };
    reader.readAsText(file);
  };

  // ── Toast ──
  function idlcToast(msg) {
    var t = document.getElementById('idlcToast');
    document.getElementById('idlcToastMsg').textContent = msg;
    t.classList.add('show');
    clearTimeout(idlcToastTimer);
    idlcToastTimer = setTimeout(function(){ t.classList.remove('show'); }, 3500);
  }
  window.idlcToast = idlcToast;

})();
</script>
{{< /rawhtml >}}
