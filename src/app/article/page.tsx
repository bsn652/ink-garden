import { Suspense } from 'react';
import ArticleViewer from './ArticleViewer';

export default function ArticlePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-ink-black">
        <div className="text-white/40 text-sm">加载中...</div>
      </div>
    }>
      <ArticleViewer />
    </Suspense>
  );
}
