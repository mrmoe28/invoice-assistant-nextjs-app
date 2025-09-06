# 🧠 Claude Code Memory Card - Invoice Assistant Project

**Copy this entire section to your Claude Code user memory:**

---

## PROJECT: Invoice Assistant (Next.js + TypeScript + Prisma)

**WORKFLOW**: Parallel development with Claude Cursor. Both AIs work on same directory.

**BEFORE ANY WORK**:
1. Check `DEVELOPMENT_STATUS.md` for current status
2. Run `./scripts/check-deployment.sh` to see deployment status
3. Check `git status` for uncommitted changes

**DURING WORK**:
1. Update `DEVELOPMENT_STATUS.md` with your current task
2. Test locally: `npm run build`
3. Commit with descriptive messages

**AFTER WORK**:
1. Update `DEVELOPMENT_STATUS.md` with completion status
2. Push: `git add . && git commit -m "description" && git push`
3. Monitor: `vercel ls`

**KEY FILES**:
- `DEVELOPMENT_STATUS.md` - Communication hub
- `ERROR_PREVENTION_GUIDE.md` - Common fixes
- `prisma/schema.prisma` - Database schema

**COMMON FIXES**:
- Build fails? Run `npm run db:generate`
- Prisma errors? Check client generation
- TypeScript errors? Check `ERROR_PREVENTION_GUIDE.md`

**DEPLOYMENT**: Auto-deploys on git push to main branch via Vercel.

**COMMUNICATION**: Use `DEVELOPMENT_STATUS.md` to coordinate with Claude Cursor.

---

**This ensures both AIs understand the workflow on any device!**
