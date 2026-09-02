import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import type { Components } from "react-markdown";
import { getHeadingId } from "@/lib/content/parse-sections";
import { type ReactNode } from "react";

type MarkdownContentProps = {
  content: string;
};

function childrenToText(children: ReactNode): string {
  if (typeof children === "string") {
    return children;
  }

  if (Array.isArray(children)) {
    return children.map(childrenToText).join("");
  }

  if (children && typeof children === "object" && "props" in children) {
    const element = children as { props: { children?: ReactNode } };
    return childrenToText(element.props.children);
  }

  return "";
}

function headingProps(children: ReactNode) {
  const text = childrenToText(children);
  const id = getHeadingId(text);
  return id ? { id } : {};
}

const components: Components = {
  h1: ({ children }) => (
    <h1 className="mb-6 border-b-[3px] border-fg pb-3 text-3xl font-bold uppercase tracking-tight">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2
      {...headingProps(children)}
      className="mb-4 mt-10 scroll-mt-24 border-b-[3px] border-fg pb-2 text-2xl font-bold uppercase tracking-tight"
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3
      {...headingProps(children)}
      className="mb-3 mt-8 scroll-mt-24 text-xl font-bold uppercase tracking-wide"
    >
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="mb-2 mt-6 text-lg font-bold uppercase tracking-wide">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="mb-4 leading-relaxed">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 list-disc space-y-2 pl-6">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 list-decimal space-y-2 pl-6">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-bold text-accent">{children}</strong>
  ),
  hr: () => <hr className="my-8 border-t-[3px] border-fg" />,
  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-[6px] border-accent bg-fg/5 py-3 pl-4 pr-2">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto border-[3px] border-fg">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b-[3px] border-fg bg-fg text-bg">
      {children}
    </thead>
  ),
  th: ({ children }) => (
    <th className="border-r-[3px] border-fg px-4 py-2 text-left font-bold uppercase last:border-r-0">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-r-[3px] border-t-[3px] border-fg px-4 py-2 last:border-r-0">
      {children}
    </td>
  ),
  code: ({ children, className }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return (
        <code className="block overflow-x-auto border-[3px] border-fg bg-fg p-4 text-sm text-bg">
          {children}
        </code>
      );
    }
    return (
      <code className="border border-fg bg-fg/10 px-1.5 py-0.5 text-sm">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="my-4 overflow-x-auto">{children}</pre>
  ),
};

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose-brutal">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
