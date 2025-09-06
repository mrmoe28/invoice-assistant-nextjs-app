# 🤖 Claude Parallel Development Workflow Setup

## 🎯 **Permanent Memory Instructions for Claude Code**

**Copy this entire section and save it to your Claude Code user memory:**

---

### **PROJECT CONTEXT - INVOICE ASSISTANT**
- **Project**: Next.js Invoice Assistant App
- **Repository**: `mrmoe28/invoice-assistant-nextjs-app`
- **Tech Stack**: Next.js 15, TypeScript, Prisma, NextAuth, Vercel
- **Development Mode**: Parallel AI Development (Claude Code + Claude Cursor)

### **WORKFLOW PROTOCOL**
1. **Always check `DEVELOPMENT_STATUS.md`** before starting any work
2. **Update status file** when beginning/completing tasks
3. **Changes auto-deploy**: Git push → GitHub → Vercel deployment
4. **Communication**: Use git commits and status file for coordination
5. **Both AIs work on same directory** - coordinate to avoid conflicts

### **KEY FILES TO MONITOR**
- `DEVELOPMENT_STATUS.md` - Current task status and communication
- `ERROR_PREVENTION_GUIDE.md` - Common errors and solutions
- `prisma/schema.prisma` - Database schema
- `src/lib/prisma.ts` - Prisma client configuration

### **COMMON COMMANDS**
```bash
# Check deployment status
vercel ls

# Check development status
./scripts/check-deployment.sh

# Generate Prisma client (if build fails)
npm run db:generate

# Test build locally
npm run build
```

### **RECENT FIXES APPLIED**
- ✅ Prisma client initialization error resolved
- ✅ NextAuth v4 TypeScript compatibility fixed
- ✅ Build process now working correctly

### **DEPLOYMENT INFO**
- **Vercel Project**: invoice-assistant
- **Auto-deploy**: Enabled on main branch
- **Latest URL**: Check `vercel ls` for current deployment

---

## 📋 **Setup Instructions for New Devices**

### **For Claude Code:**
1. Open this file: `CLAUDE_WORKFLOW_SETUP.md`
2. Copy the "Permanent Memory Instructions" section above
3. Save to your Claude Code user memory
4. Always reference this workflow when working on this project

### **For Claude Cursor:**
1. This file serves as the reference
2. Check `DEVELOPMENT_STATUS.md` for current status
3. Follow the workflow protocol outlined above

## 🔄 **Daily Workflow**

### **Before Starting Work:**
1. Check `DEVELOPMENT_STATUS.md` for current status
2. Run `./scripts/check-deployment.sh` to see deployment status
3. Check `git status` for any uncommitted changes

### **During Work:**
1. Update `DEVELOPMENT_STATUS.md` with your current task
2. Make changes and test locally with `npm run build`
3. Commit with descriptive messages

### **After Completing Work:**
1. Update `DEVELOPMENT_STATUS.md` with completion status
2. Push changes: `git add . && git commit -m "description" && git push`
3. Monitor deployment with `vercel ls`

## 🚨 **Emergency Procedures**

### **If Build Fails:**
1. Check `ERROR_PREVENTION_GUIDE.md` for solutions
2. Run `npm run db:generate` if Prisma errors
3. Test locally before pushing

### **If Deployment Fails:**
1. Check Vercel logs: `vercel logs`
2. Verify environment variables are set
3. Check for TypeScript errors

## 📞 **Communication Protocol**

### **Between Claude Code and Claude Cursor:**
- Use `DEVELOPMENT_STATUS.md` as the communication hub
- Update status when starting/completing tasks
- Include commit hashes and deployment URLs
- Note any issues or blockers

### **Git Commit Messages:**
Use descriptive messages that both AIs can understand:
```
fix: resolve [specific error]
feat: add [new feature]
docs: update [documentation]
refactor: improve [code structure]
```

## 🎯 **Success Metrics**
- ✅ Build passes locally (`npm run build`)
- ✅ Deployment successful on Vercel
- ✅ No TypeScript errors
- ✅ All routes working correctly
- ✅ Database connections stable

---

**Remember**: This is a parallel development environment. Always coordinate through the status file and git commits to avoid conflicts and ensure smooth collaboration between both AI systems.
