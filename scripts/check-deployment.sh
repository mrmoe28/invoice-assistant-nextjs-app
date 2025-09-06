#!/bin/bash

# Deployment Status Checker
# Helps coordinate between parallel AI development

echo "🚀 Checking Vercel Deployment Status..."
echo "=================================="

# Check recent deployments
vercel ls --limit=3

echo ""
echo "📊 Recent Git Activity:"
echo "======================"
git log --oneline -3

echo ""
echo "🔍 Current Branch Status:"
echo "========================"
git status --short

echo ""
echo "📝 Development Status:"
echo "====================="
if [ -f "DEVELOPMENT_STATUS.md" ]; then
    echo "✅ Development status file exists"
    echo "Last 5 lines:"
    tail -5 DEVELOPMENT_STATUS.md
else
    echo "❌ Development status file not found"
fi

echo ""
echo "🔄 Next Steps:"
echo "=============="
echo "1. Check if deployment is successful"
echo "2. Update DEVELOPMENT_STATUS.md if needed"
echo "3. Continue development or fix any issues"
