---
title: "We Built a Free Identity Lifecycle Dashboard. Here's How to Use It."
description: "A practical walkthrough for auditing dormant accounts, offboarding gaps, and access review currency across your identity systems using the ProftSec Identity Lifecycle Verification Dashboard."
date: 2026-04-05
tags: ["Identity Lifecycle", "IAM", "Access Governance", "Offboarding", "Compliance", "Assessment", "Active Directory", "Okta", "Entra ID"]
categories: ["Blog"]
draft: false
---

# We Built a Free Identity Lifecycle Dashboard. Here's How to Use It.

Most IAM assessments start the same way. Someone asks how many dormant accounts the organization has, and nobody can answer.

It's not that the data doesn't exist. It does. It's just scattered across Active Directory, Entra, Okta, AWS IAM, and a dozen SaaS tools, each with its own audit log format and review cycle. Nobody's pulled it together, nobody's scored it, and nobody's asked the obvious next question: where are the gaps and what do we do about them?

That's what the [Identity Lifecycle Verification Dashboard](/tools/identity-lifecycle-verification-dashboard/) is for. You put in your systems, their identity counts, last audit dates, and any known offboarding gaps. It gives you a score, a list of risk findings, and a prioritized set of next steps. Nothing goes anywhere. No account needed.

This post covers how to use it and, more importantly, how to actually get the numbers you need to put into it.

---

## What the Dashboard Does

It runs four types of analysis across whatever identity systems you define.

**Dormancy detection.** You set a threshold (default is 90 days). It calculates the dormancy rate per system and flags the ones where inactive accounts are a real percentage of the total. A 15% dormancy rate in AWS IAM isn't the same problem as 5% in a low-stakes SaaS tool. Context matters.

**Offboarding gap tracking.** You enter how many accounts should have been deprovisioned but weren't. It maps that to a risk level based on count. One orphaned account in a privileged system is still a problem worth flagging.

**Audit currency.** You tell it how often you're supposed to be reviewing each system. It checks when you last did it and flags anything overdue. If your policy says quarterly and you haven't reviewed something in 18 months, that shows up.

**Compliance scoring.** Those three factors roll up into a 0-100 score. It's not a certification and it doesn't mean much on its own. What it's good for is running the same assessment every quarter and watching whether the number goes up or down.

The output is a dashboard with charts, a risk matrix, and a recommendations tab with timeframes. You can export everything as JSON and reimport it next quarter to compare.

---

## Where to Get Your Data

Getting accurate inputs is the hardest part. Here's how to pull the numbers for each common system. Don't worry about perfection. An estimate gets you 80% of the value.

### Active Directory

Run this from an AD-joined machine or via RSAT:

```powershell
# Total enabled user accounts
(Get-ADUser -Filter {Enabled -eq $true} | Measure-Object).Count

# Accounts with no login in 90+ days (dormant)
$threshold = (Get-Date).AddDays(-90)
(Get-ADUser -Filter {Enabled -eq $true} -Properties LastLogonDate |
  Where-Object { $_.LastLogonDate -lt $threshold -or $_.LastLogonDate -eq $null } |
  Measure-Object).Count

# Last formal access review date: check your IGA platform or ticketing system
```

For offboarding gaps, pull disabled accounts that still have group memberships or active mailboxes. Or cross-reference your HR termination list against enabled accounts. Either approach works.

### Entra ID (Azure AD)

From the Entra admin center or via Microsoft Graph:

```powershell
# Requires Microsoft.Graph module
Connect-MgGraph -Scopes "User.Read.All", "AuditLog.Read.All"

# Total member users (exclude guests if desired)
(Get-MgUser -Filter "userType eq 'Member'" -CountVariable count -ConsistencyLevel eventual)
$count

# Dormant: last sign-in older than 90 days
$threshold = (Get-Date).AddDays(-90).ToString("yyyy-MM-ddTHH:mm:ssZ")
(Get-MgUser -Filter "userType eq 'Member'" -Property SignInActivity |
  Where-Object { $_.SignInActivity.LastSignInDateTime -lt $threshold } |
  Measure-Object).Count
```

Entra's Access Reviews feature under Identity Governance will also show you the date of the last completed review per application or group. That's your "Last Audit" date.

### Okta

From the Okta Admin Console:

- **Total active users**: Reports > Users > Active Users
- **Dormant users**: Reports > Users, filter by Last Login older than 90 days. Export to CSV and count.
- **Last audit date**: Check your Okta Access Certifications, or look in your ticketing system for when the last access review campaign closed.
- **Offboarding gaps**: Directory > People, filter by Status: Deprovisioned, then check App Assignments. Deprovisioned users who still have active app assignments are your gaps.

### AWS IAM

The IAM Credential Report is the quickest path here:

```bash
# Generate and download the credential report
aws iam generate-credential-report
aws iam get-credential-report --query 'Content' --output text | base64 --decode > iam-report.csv
```

The CSV has `password_last_used`, `access_key_1_last_used_date`, and `access_key_2_last_used_date` per user. Count rows where all three are older than 90 days or never used. For offboarding gaps, compare active IAM users against your HR termination list.

### Azure RBAC

```powershell
# Total users with direct role assignments across all scopes
(Get-AzRoleAssignment | Where-Object { $_.ObjectType -eq "User" } |
  Select-Object -ExpandProperty SignInName -Unique | Measure-Object).Count
```

For dormancy, cross-reference with Entra sign-in data. For offboarding gaps, look for role assignments on accounts that are already disabled in Entra.

### SaaS Applications (GitHub, Salesforce, Slack, others)

Most admin consoles expose this directly:

- **GitHub**: Organization Settings > Members, filter by last activity. The audit log has last login per member.
- **Salesforce**: Setup > Users, filter by Last Login Date. Active users with no login in 90 days are dormant.
- **Slack**: Admin > Members, filter by Last Active. Export and sort.

If a tool doesn't have a native dormancy report, check your SSO sign-in logs in Okta or Entra. You'll see last authentication per application there. Use that as your proxy.

---

## How to Use the Tool

Open the [Identity Lifecycle Verification Dashboard](/tools/identity-lifecycle-verification-dashboard/) and start on the Configure tab.

**Step 1. Set your thresholds.** Enter your organization name, dormancy threshold, and review frequency. Use the policy you actually have, not the one you want to have. If your real review cadence is annual, set annual. The tool's job is to reflect reality, not aspirations.

**Step 2. Add your systems.** Paste a comma-separated list into the bulk import field. A typical starting list:

```
Active Directory, Entra ID, Okta, AWS IAM, Azure RBAC, GitHub, Salesforce, Slack
```

**Step 3. Fill in the table.** For each system:
- Total identities (enabled accounts)
- Dormant identities (accounts past your threshold)
- Last audit date (when the last access review completed)
- Offboarding gaps (accounts that should have been removed but weren't)

Don't overthink the numbers. If you have somewhere between 50 and 70 dormant accounts in AD, enter 60. The tool isn't a precision instrument. It's a triage instrument.

**Step 4. Run Analysis.** That's it. The dashboard, risk matrix, and recommendations all populate immediately.

If you want to see what filled-out results look like before you have your own data, click "Load Sample Data." It's pre-loaded with 8 systems and realistic numbers.

---

## Interpreting the Results

### The Compliance Score

It's a weighted number based on three things per system: dormancy rate, offboarding gap rate, and how overdue your audits are. It goes down as those problems get worse.

75 or above generally means the basics are working. Audits are reasonably current, dormancy is low, and any offboarding failures are isolated. Between 50 and 74, there are structural gaps. Usually one or two systems that haven't been audited in a long time, or a specific platform with a known offboarding problem. Below 50 means things have gone wrong in multiple places at once.

The score on its own isn't that useful. What's useful is running it quarterly and watching the trend. If it's dropping, something is getting worse and you need to find out what.

### Reading the Risk Matrix

A few things to keep in mind when you're looking at the findings:

If you've got a critical dormancy rate (more than 20% of accounts inactive), that's almost never an isolated oversight. 200 dormant accounts in Active Directory doesn't mean 200 manual cleanup tasks. It means the joiner-mover-leaver workflow isn't triggering deprovisions. You've got a process problem, not a cleanup problem.

Offboarding gaps in cloud IAM (AWS, Azure) are more serious than the same count in a SaaS tool. Cloud IAM privileges can let someone move laterally, pull data, or modify infrastructure. A former employee's active AWS access key is a different risk than an inactive Slack account. The tool treats them differently in its scoring.

Overdue access reviews make everything else worse. A dormant account in a system that hasn't been audited in 18 months is a bigger problem than the same account in something reviewed last month. You don't know what else you missed.

### Prioritizing Gaps

The recommendations tab sequences this for you. The logic is:

1. **Immediate (week 1-2)**: Offboarding gaps. These are known-bad states. You know these accounts should be gone. Start there.

2. **30 days**: Dormancy sweeps. Disable accounts past your threshold. Don't delete yet. Disable, wait a few weeks, confirm nobody complains, then remove.

3. **90 days**: Structural fixes. Access review cadences, JML automation, identity correlation. This is the work that keeps the problems from coming back.

---

## From Assessment to Action

The dashboard tells you where you are. What you do next depends on where that is.

**If you're starting from scratch**, pick one automated offboarding workflow and build it. Not everything at once. Pick your most critical system, probably your directory service or cloud IAM, and wire a termination trigger from HR to that system. Verify that it actually fires. That one workflow eliminates a whole class of future offboarding gaps even before you clean up the existing debt.

**If you have partial automation**, the gap is usually coverage. The directory gets deprovisioned. Everything else doesn't. Fix this with SCIM connectors or a lightweight IGA platform. The goal is one termination event in HR that touches every downstream system automatically.

**If you have offboarding automation but dormancy is still high**, the problem has shifted. It's not about people leaving anymore. It's about roles accumulating during employment. Projects end, access stays, nobody notices. That requires access certification campaigns where managers attest that their team's access is still needed. Most IGA platforms handle this. Entra and Okta both have it natively.

**If audit currency is your main problem**, get reviews onto the operational calendar. They shouldn't live in the security program. They should be as routine as patching. Anchor reminders to each system's last review date, not some arbitrary annual schedule.

---

## Run It Again Next Quarter

One assessment doesn't fix anything. It just tells you where you are today.

The value of the tool is running it consistently. Export the JSON after each review cycle. Next quarter, import the previous file if you want context, run the new assessment, and compare. Which systems improved? Which got worse? What did you actually close?

Over a few cycles you'll start to see patterns. A system that's always overdue on audits is an ownership problem. One that keeps generating offboarding gaps is a process or tooling problem. The tool makes those patterns visible so you know where to focus.

If you want more background on why these gaps exist in the first place, the post on [identity lifecycle gaps](/blog/the-identity-lifecycle-gaps-nobodys-talking-about/) goes deeper on the structural failure modes.

Otherwise, go run the assessment.

[Open the Identity Lifecycle Verification Dashboard](/tools/identity-lifecycle-verification-dashboard/)
