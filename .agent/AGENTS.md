# 🤖 Instructions for AI Agents

> **Project:** Mana Bloom - Productivity Gamification App  
> **Last Updated:** 2025-11-23

## 📚 Documentation First

**BEFORE making any code changes, ALWAYS:**

1. ✅ Check `docs/INDEX.md` for relevant documentation
2. ✅ Read component docs in `docs/components/`
3. ✅ Review `docs/mechanics/` for system understanding
4. ✅ Check `.agent/CODING_GUIDELINES.md` for coding rules

## 🔧 Coding Guidelines

**See:** `.agent/CODING_GUIDELINES.md` for complete rules.

**Key Rules:**
- Use `multi_replace_file_content` for small edits
- Never rewrite entire files
- Always validate data structure changes
- Test incrementally

## 📝 Documentation Workflow

### After Completing a Feature:

1. **Document the component:**
   ```
   docs/components/[screen]/[ComponentName].md
   ```
   Include:
   - Overview
   - Architecture
   - Implementation details
   - Connections to other components
   - Common issues
   - Changelog

2. **Update connections:**
   ```
   docs/components/[screen]/connections.md
   ```

3. **Add to CHANGELOG:**
   ```
   docs/changelog/decisions.md  (if major decision)
   CHANGELOG.md                  (version changes)
   ```

4. **Move task:**
   ```
   docs/tasks/TODO.md → docs/tasks/DONE.md
   ```

### End of Day:

1. Review and remove obsolete docs
2. Update `docs/INDEX.md` if added new docs
3. Commit documentation changes

## 📂 Documentation Structure

```
/docs
├── INDEX.md                    # Start here
├── /components                 # Component docs
│   ├── /home
│   ├── /tasks
│   ├── /plant
│   ├── /profile
│   └── /shop
├── /mechanics                  # Game mechanics
├── /architecture               # Technical structure
├── /design                     # UI/UX decisions
├── /guides                     # Development guides
├── /ideas                      # Future features
├── /changelog                  # History
└── /tasks                      # TODO, IN_PROGRESS, DONE
```

## 🎯 Component Documentation Template

```markdown
# [Component Name]

> **Component:** `ComponentName`
> **Location:** `src/path/to/Component.js`
> **Last Updated:** YYYY-MM-DD

## 📋 Overview
Brief description

## 🎯 Features
- Feature list

## 🏗️ Architecture
Data flow, structure

## 🎨 UI Components
Layout, elements

## 🔧 Implementation
Code details

## 💾 Data Persistence
Storage, structure

## 🔗 Connections
Affects, affected by, related

## 🐛 Common Issues
Known problems and solutions

## 📝 Changelog
Recent changes
```

## ⚠️ Critical Reminders

### Data Persistence
- AsyncStorage data persists between reloads
- Always add validation when adding new fields
- Force regeneration if structure changes

### Challenge System
- Templates are INLINE in `AppContext.js`
- DO NOT import from `challengeTemplates.js`
- See `docs/components/home/DailyChallenges.md`

### File Editing
- Use `multi_replace_file_content` for precision
- Never use `git checkout` if there are inline changes
- Always view file before editing

## 📞 Communication

### When in Task Mode:
- User CANNOT see regular messages
- Use `notify_user` tool to communicate
- Be concise in notifications

### When to Ask User:
- Ambiguous requirements
- Multiple valid approaches
- Significant behavior changes
- Breaking changes needed

## 🎓 Learning from Past

Check `docs/changelog/iterations.md` to see:
- What we've changed before
- Why we made those changes
- How many times we've iterated

This helps avoid repeating mistakes and understand evolution.

---

## 🚀 Quick Start for New AI

1. Read `docs/INDEX.md`
2. Read `.agent/CODING_GUIDELINES.md`
3. Check `docs/tasks/IN_PROGRESS.md` for current work
4. Review relevant component docs before editing
5. Follow documentation workflow after changes

---

*Maintained by: Development Team*  
*For detailed coding rules: `.agent/CODING_GUIDELINES.md`*
