sed -i '' 's/setApprovals(approvals.filter(app => app.id !== id));/setApprovals(approvals.map(app => app.id === id ? { ...app, status: '"'ACTIVE'"' } : app));/g' src/app/dashboard/approvals/page.tsx
sed -i '' 's/setApprovals(approvals.filter(app => app.id !== id));/setApprovals(approvals.map(app => app.id === id ? { ...app, status: '"'REJECTED'"' } : app));/g' src/app/dashboard/approvals/page.tsx
