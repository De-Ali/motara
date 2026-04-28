import { posts } from '@/data/blog';
import PostClient from './PostClient';

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default function Page() {
  return <PostClient />;
}
