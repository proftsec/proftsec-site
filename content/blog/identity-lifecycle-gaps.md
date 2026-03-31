---
title: "The Identity Lifecycle Gaps Nobody's Talking About"
description: "How onboarding and offboarding processes fail at scale, leaving dormant identities as silent security liabilities and compliance nightmares."
date: 2026-03-31
tags: ["Identity Lifecycle", "IAM", "Offboarding", "Compliance", "Access Governance", "Risk Management"]
categories: ["Blog"]
draft: false
---

# The Identity Lifecycle Gaps Nobody's Talking About

Every security program talks about access control. Most have onboarding frameworks. Some have offboarding procedures.

What almost nobody has is a system that actually handles the identity in between. The one that's still in your systems six months after someone left. The one nobody formally revoked. The one sitting there with standing privilege.

This post is about why identity lifecycle management fails at scale and what it costs when it does.

---

## The Identity Lifecycle Problem

Identity lifecycle management sounds simple: create, manage, revoke.

In practice, it's fragmented across dozens of systems with no clear owner, no agreed-upon timeline, and no way to verify that anything actually happened.

Here's how most organizations handle it:

- **Onboarding**: HR creates employee record. IT provisions email. Department approves access requests. Done.
- **Active management**: Access requests come in. Teams grant access. Annual audits happen. Nobody makes decisions about revocation.
- **Offboarding**: HR notifies IT. IT disables Active Directory. Other systems get disabled sometimes. Probably not.

This works when you're small. It breaks when you scale.

---

## Where the Breakdown Happens

Identity lifecycle failure is not one problem. It is several problems stacked on top of each other.

### The Onboarding Gap

New employees need access to 10-50 systems on day one. Access requests are submitted, approved, and provisioned across multiple platforms. Often manually.

The problem: nobody verifies that onboarding is actually complete.

An employee gets created in Active Directory but is missing from the VPN. Present in email but absent from the data repository. Provisioned in SaaS tools but never added to security groups. Months later, during a review, someone notices access that shouldn't exist.

This happens because onboarding is treated as an event, not a process. Once the requests are approved, the work is considered done. Whether the access actually works or whether it's needed is someone else's problem.

### The Active State Blindness

Once provisioned, identities sit there with standing privilege and nobody asks if they should.

A developer gets database access for a specific project. The project ends. The access stays. Two years later, that identity can still read sensitive data. Not because it's needed. Because nobody revoked it.

This is not malice. It's entropy. Systems accumulate permissions over time. Inertia keeps them in place.

### The Offboarding Void

This is where lifecycle management completely breaks down.

Someone leaves. HR notifies IT. IT disables the account in Active Directory or the cloud tenant. The identity lives on everywhere else.

SaaS applications have separate credential stores. Legacy systems have manual account lists. Third-party integrations have embedded API keys. Service accounts are provisioned in their name. Cloud infrastructure has hardcoded permissions. Shared credentials they were part of still exist.

No single system has the full picture. No process verifies that revocation actually happened.

The result: identities that are officially terminated but operationally still alive.

---

## Why This Creates Risk

Orphaned identities are silent liabilities. They're accounts that should be gone but still work.

### For Security

A departed employee's identity becomes a vector for compromise. If credentials are reused, shared, or exposed, there's no legitimate reason for access. Detection is harder because the account looks legitimate. Attackers know that offboarding is messy. They bet on old credentials still working.

### For Compliance

Auditors ask: "How do you ensure that terminated employees no longer have access?"

Most organizations can't answer. They can disable Active Directory. They can check email. But they can't prove that access is gone everywhere because they have no unified view of identity across their infrastructure.

This is a compliance failure. It's an audit finding waiting to happen.

### For Incident Response

During an incident involving a former employee's credentials, critical questions go unanswered.

Which systems did that identity access? What actions were performed? How long had the access been active? Were other dormant identities also compromised?

Without clear lifecycle visibility, incident response becomes detective work instead of containment.

---

## The Deeper Problem: No Unified Owner

Identity lifecycle management fails partly because nobody actually owns it.

HR manages employee status but not system access. IT manages primary credentials but not all downstream systems. Cloud teams manage cloud identities independently. Security reviews access but doesn't provision or revoke it. Application teams manage their own identity stores. Vendors manage their own access standards.

Each team optimizes for their own domain. Nobody optimizes for the full cycle.

The result: fragmented processes, no accountability, and gaps that don't get noticed until an audit or incident forces visibility.

---

## What Modern Lifecycle Management Requires

Fixing this isn't about better onboarding or offboarding procedures. It's about architecture.

### 1. A Single Source of Truth

Organizations need unified visibility into who should have access and where.

This isn't just an IAM platform. It's a decision: what system of record defines identity state?

Some organizations anchor on directory services. Others use cloud identity providers. Forward-thinking organizations use identity governance platforms that sit above all systems and maintain canonical state.

The critical element: one place where identity status is authoritative.

### 2. Lifecycle Events, Not Just Provisioning

Most IAM automation focuses on provisioning. Real lifecycle management requires automation around joiner, mover, and leaver events.

When someone joins, access gets provisioned across all systems simultaneously. When they move roles, access gets updated. When they leave, access gets revoked everywhere in parallel.

These events trigger workflows, not just notifications.

### 3. Verification, Not Assumptions

After provisioning or revocation, verify it actually happened.

Common pattern: revocation request sent to a system, no response received, everyone assumes it worked. Reality: it failed and nobody knows.

Strong lifecycle management verifies completion. If revocation doesn't complete, it escalates. If verification fails, it alerts.

### 4. Visibility Into Dormancy

Organizations need ongoing visibility into which identities are actually being used.

Simple question: which identities haven't authenticated in 90 days?

For most organizations, that answer is unknown. The identities exist. They have permissions. Nobody knows if they're still needed.

Regular dormancy reviews catch lifecycle failures before they become incidents.

---

## A Practical Example

Consider an organization with 500 employees, 10 major SaaS applications, and cloud infrastructure across three providers.

Someone leaves.

**What should happen:**

HR marks the employee as terminated. The identity governance platform detects it. Automated workflows trigger across all systems simultaneously. Revocation is verified in each system. A report confirms access is gone. Security team reviews and closes the ticket.

**What actually happens:**

HR marks employee as terminated. IT disables Active Directory. Email gets disabled (maybe). SaaS applications still have the account. Cloud infrastructure still has API keys in their name. Legacy systems keep the account because they're manually managed. Six months later, an audit finds the dormant accounts. Manual investigation begins.

The gap between ideal and reality is not a feature gap. It is an architecture and ownership gap.

---

## Why This Matters Now

Several forces are making this worse.

**Cloud acceleration**: Cloud identities often bypass traditional onboarding and offboarding. Service principals, managed identities, and API keys proliferate. Nobody has a comprehensive view.

**Automation at scale**: Infrastructure as code, CI/CD pipelines, and agent-based systems create thousands of identities that are rarely reviewed. They accumulate permissions and outlive their purpose.

**Compliance pressure**: Regulations like SOC 2, ISO 27001, and industry-specific standards all require proof that lifecycle is controlled. Organizations that can't demonstrate this fail audits.

**Hybrid and remote work**: Distributed teams, contractors, and temporary access create more lifecycle events and more failure points.

---

## Where to Start

Organizations don't need to solve this perfectly overnight. Start with visibility.

1. **Map your identity stores**: Where do identities live? Active Directory, Entra, Okta, cloud platforms, SaaS applications, legacy systems?

2. **Define a lifecycle policy**: What's the timeline for onboarding, access reviews, and offboarding? Who approves? Who verifies?

3. **Audit dormancy**: Run a report on identities that haven't authenticated in 90 days. Review them. Delete or justify them.

4. **Automate one event**: Pick one lifecycle event (joiner, mover, or leaver) and automate it across your top 3-5 systems. Verify completion.

5. **Establish ownership**: Assign a single team accountability for the full lifecycle. Not just provisioning. Not just auditing. The whole thing.

From there, incrementally expand automation, increase verification, and reduce the orphaned identity debt most organizations are carrying.

---

## Final Thoughts

Identity lifecycle management isn't glamorous. It doesn't make headlines. But it's one of the most consequential controls in modern security.

Organizations that get it right have a significant advantage during incidents, audits, and breach investigations.

Organizations that don't are betting that orphaned identities will never be exploited. Eventually, that bet loses.

The good news: the gap is fixable. It requires architecture thinking and ownership clarity, not necessarily new tools.

The hard part: most organizations haven't started.
