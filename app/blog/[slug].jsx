import { Welcome } from '@/components/Welcome/Welcome';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = ["blog-post-1", "blog-post-2", "blog-post-3"]
  return slugs.map((slug) => ({ params: { slug } }))
}

export default function Page() {
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
    </>
  );
}