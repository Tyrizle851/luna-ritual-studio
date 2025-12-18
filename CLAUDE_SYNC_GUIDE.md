# Claude Code Sync Guide - Luna Ritual Studio

## ⚠️ CRITICAL: Read This First

**ALWAYS work in this directory:**
```
C:\Users\fordt\OneDrive\Desktop\luna-ritual-studio
```

**GitHub Remote:**
```
https://github.com/Tyrizle851/luna-ritual-studio.git
```

---

## The Problem (What Went Wrong Before)

There are **5 copies** of luna-ritual-studio on this machine:
1. `C:\Users\fordt\Downloads\luna-ritual-studio` ❌ OLD/WRONG
2. `C:\Users\fordt\Downloads\luna-ritual-studio-1` ❌ OLD/WRONG
3. `C:\Users\fordt\OneDrive\Desktop\Luna cursor updated\luna-ritual-studio` ❌ OLD/WRONG
4. `C:\Users\fordt\OneDrive\Desktop\Luna cursor updated\luna-ritual-studio-1` ❌ OLD/WRONG
5. `C:\Users\fordt\OneDrive\Desktop\luna-ritual-studio` ✅ **CORRECT - USE THIS ONE**

**Previous Mistake:** Claude was working in `Downloads/luna-ritual-studio` which was 486 commits behind and had a completely different file structure.

---

## Step 1: Verify You're in the Correct Repo

### Quick Check Commands:
```bash
# Change to correct directory
cd "C:\Users\fordt\OneDrive\Desktop\luna-ritual-studio"

# Verify git remote (should show the GitHub URL above)
git remote -v

# Check current location
pwd
```

### Expected Output:
```
origin  https://github.com/Tyrizle851/luna-ritual-studio.git (fetch)
origin  https://github.com/Tyrizle851/luna-ritual-studio.git (push)
```

---

## Step 2: Full Sync Procedure (Run Every Time)

**Run these commands in sequence BEFORE starting any work:**

```bash
# 1. Fetch all remote branches and prune deleted ones
git fetch --all --prune

# 2. Check branch tracking info
git branch -vv

# 3. Check current status
git status

# 4. Pull latest with rebase (stash if you have changes)
git pull --rebase
```

### If You Have Uncommitted Changes:
```bash
git stash                  # Save your changes
git pull --rebase          # Pull latest
git stash pop              # Restore your changes
```

---

## Step 3: Check for Lovable Branch

Some work may be on a `lovable` branch instead of `main`:

```bash
# Check if lovable branch exists
git branch -a | grep lovable

# If it exists, switch to it
git checkout lovable
git pull --rebase origin lovable
```

**Current Status (as of Dec 15, 2025):** No lovable branch exists. Work on `main`.

---

## Step 4: Verify You're Synced

After running the sync procedure, verify:

```bash
# Should show "Your branch is up to date with 'origin/main'"
git status

# Check latest commit matches remote
git log -1 --oneline
```

---

## Common Scenarios

### Scenario 1: "I'm lost, which repo am I in?"
```bash
pwd
git remote -v
```
If you're not in `OneDrive\Desktop\luna-ritual-studio`, navigate there immediately.

### Scenario 2: "The code looks old/different"
```bash
cd "C:\Users\fordt\OneDrive\Desktop\luna-ritual-studio"
git fetch --all --prune
git pull --rebase
```

### Scenario 3: "There's a merge conflict"
```bash
# If in the middle of a rebase
git rebase --abort

# Start fresh
git reset --hard origin/main

# Re-sync
git fetch --all --prune
git pull --rebase
```

### Scenario 4: "User says I'm out of sync"
1. **STOP** what you're doing
2. Run the **Full Sync Procedure** (Step 2)
3. Verify you're in the correct directory
4. Check `git log -1` matches user's latest commit

---

## File Structure Reference

### Key Files to Know:
```
luna-ritual-studio/
├── src/
│   ├── pages/
│   │   └── Index.tsx          ← Hero video is here (lines 47-66)
│   ├── components/
│   ├── data/
│   └── assets/
├── public/
│   ├── hero-video.mp4         ← Main hero video (18.9 MB)
│   └── hero-poster.jpg        ← Poster image (needs creation)
├── package.json
└── CLAUDE_SYNC_GUIDE.md       ← This file
```

---

## Latest Commit Info (Reference)

**As of Dec 18, 2025 @ 2:45 PM EST:**
- **Commit:** `b51f66d` - "Implement complete mood system and color theory for affirmation builder"
- **Author:** Claude Sonnet 4.5 (via Claude Code)
- **Branch:** main
- **Status:** Ahead of origin/main by 1 commit (ready to push)

**Previous Commit:** `d307d8f` - "Fix all modals images and labels"

---

## Emergency Reset Procedure

If everything is broken and you need to start fresh:

```bash
# Go to correct directory
cd "C:\Users\fordt\OneDrive\Desktop\luna-ritual-studio"

# Discard ALL local changes (WARNING: Destructive)
git reset --hard HEAD
git clean -fd

# Pull absolute latest
git fetch --all --prune
git reset --hard origin/main

# Verify
git status
git log -1 --oneline
```

---

## Quick Reference Card

### Before ANY work:
```bash
cd "C:\Users\fordt\OneDrive\Desktop\luna-ritual-studio"
git fetch --all --prune && git pull --rebase
```

### Check sync status:
```bash
git status
git log -1 --oneline
```

### User says "you're out of sync":
```bash
git fetch --all --prune
git branch -vv
git status
git pull --rebase
```

---

## Notes

- **This happened 9 times before** - don't let it happen again
- **Always verify the directory** before making changes
- **Run sync procedure FIRST** before starting any task
- **User is on EST (Ohio time)** - adjust timestamps accordingly
- **Lovable = GPT Engineer** - commits from this bot are from Lovable

---

## Success Checklist

Before claiming you're synced, verify ALL of these:

- [ ] `pwd` shows `C:\Users\fordt\OneDrive\Desktop\luna-ritual-studio`
- [ ] `git remote -v` shows correct GitHub URL
- [ ] `git status` says "up to date with 'origin/main'"
- [ ] `git log -1` shows a recent commit (within hours/days, not months)
- [ ] File structure matches reference above
- [ ] `src/pages/Index.tsx` has 250+ lines (not 140 lines like old version)

**If any of these fail, you're in the wrong place or out of sync!**

---

*Last Updated: December 18, 2025 @ 2:45 PM EST*
*Last Sync Commit: b51f66d*
