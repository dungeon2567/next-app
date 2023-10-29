import { Welcome } from '@/components/Welcome/Welcome';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';

export const dynamicParams = false;
export const runtime = 'edge';

export default function HomePage() {
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
    </>
  );
}

export const generateStaticParams = async () => {
    const slugs = ["blog-post-1", "blog-post-2", "blog-post-3"]
    return slugs.map((slug) => ({ params: { slug } }))
  }