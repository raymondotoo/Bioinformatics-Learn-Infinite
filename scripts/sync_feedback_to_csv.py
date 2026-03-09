#!/usr/bin/env python3
"""Sync feedback issues into data/feedback.csv.

Expected source issues:
- repository: current repo
- label: learning-feedback

CSV columns:
source,issue_number,created_at,updated_at,page,email,message,issue_url,title,state
"""

import csv
import json
import os
import re
import sys
import urllib.parse
import urllib.request

API_BASE = "https://api.github.com"
LABEL = "learning-feedback"
OUTPUT_PATH = "data/feedback.csv"


def github_get(url: str, token: str):
    req = urllib.request.Request(url)
    req.add_header("Accept", "application/vnd.github+json")
    req.add_header("Authorization", f"Bearer {token}")
    req.add_header("X-GitHub-Api-Version", "2022-11-28")
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode("utf-8"))


def fetch_feedback_issues(repo: str, token: str):
    """Fetch all open/closed issues with the feedback label."""
    page = 1
    per_page = 100
    results = []

    while True:
        params = urllib.parse.urlencode(
            {
                "state": "all",
                "labels": LABEL,
                "per_page": per_page,
                "page": page,
            }
        )
        url = f"{API_BASE}/repos/{repo}/issues?{params}"
        issues = github_get(url, token)

        # Exclude pull requests (GitHub returns PRs from issues API).
        issues = [item for item in issues if "pull_request" not in item]

        if not issues:
            break

        results.extend(issues)
        if len(issues) < per_page:
            break
        page += 1

    return results


def parse_issue_body(body: str):
    body = body or ""

    # Supports several templates; fallbacks try best-effort extraction.
    page = ""
    email = ""
    message = body.strip()

    page_match = re.search(r"^Page:\s*(.+)$", body, flags=re.MULTILINE)
    if page_match:
        page = page_match.group(1).strip()

    email_match = re.search(r"(?:^|\n)(?:Email|email)\s*:\s*([^\n]+)", body)
    if email_match:
        email = email_match.group(1).strip()
    else:
        generic_email_match = re.search(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}", body)
        if generic_email_match:
            email = generic_email_match.group(0)

    message_match = re.search(r"(?:^|\n)(?:Suggested improvement|Feedback|Message)\s*:\s*(.+)$", body, flags=re.MULTILINE)
    if message_match:
        message = message_match.group(1).strip()

    return page, email, message


def normalize_text(value: str):
    return " ".join((value or "").split())


def main():
    repo = os.environ.get("GITHUB_REPOSITORY")
    token = os.environ.get("GITHUB_TOKEN")

    if not repo or not token:
        print("Missing GITHUB_REPOSITORY or GITHUB_TOKEN", file=sys.stderr)
        sys.exit(1)

    issues = fetch_feedback_issues(repo, token)
    rows = []

    for issue in issues:
        page, email, message = parse_issue_body(issue.get("body") or "")
        rows.append(
            {
                "source": "github_issue",
                "issue_number": str(issue.get("number", "")),
                "created_at": issue.get("created_at", ""),
                "updated_at": issue.get("updated_at", ""),
                "page": normalize_text(page),
                "email": normalize_text(email),
                "message": normalize_text(message),
                "issue_url": issue.get("html_url", ""),
                "title": normalize_text(issue.get("title", "")),
                "state": issue.get("state", ""),
            }
        )

    rows.sort(key=lambda x: (x["created_at"], x["issue_number"]))

    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    fieldnames = [
        "source",
        "issue_number",
        "created_at",
        "updated_at",
        "page",
        "email",
        "message",
        "issue_url",
        "title",
        "state",
    ]

    with open(OUTPUT_PATH, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    print(f"Wrote {len(rows)} feedback row(s) to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
