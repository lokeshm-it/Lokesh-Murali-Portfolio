"use client";

import * as React from "react";
import { Check, Copy, Download, Terminal } from "lucide-react";
import type { CodeSnippet } from "@/lib/case-studies";
import { cn } from "@/lib/utils";

/* Lightweight, dependency-free PowerShell highlighter. */

type Token = { text: string; type: string };

const TOKEN_RE =
  /(#.*$)|("(?:[^"\\]|\\.)*"|'(?:[^']|'')*')|(\$[A-Za-z_][A-Za-z0-9_]*)|(-[A-Za-z][A-Za-z0-9]*)|(\b[A-Z][A-Za-z]+-[A-Za-z]+\b)/gm;

const typeClass: Record<string, string> = {
  comment: "text-muted-foreground/70 italic",
  string: "text-amber-500 dark:text-amber-400",
  variable: "text-fuchsia-500 dark:text-fuchsia-400",
  param: "text-secondary",
  cmdlet: "text-primary font-medium",
  plain: "text-foreground/90",
};

function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  TOKEN_RE.lastIndex = 0;

  while ((match = TOKEN_RE.exec(code)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ text: code.slice(lastIndex, match.index), type: "plain" });
    }
    let type = "plain";
    if (match[1]) type = "comment";
    else if (match[2]) type = "string";
    else if (match[3]) type = "variable";
    else if (match[4]) type = "param";
    else if (match[5]) type = "cmdlet";
    tokens.push({ text: match[0], type });
    lastIndex = TOKEN_RE.lastIndex;
  }
  if (lastIndex < code.length) {
    tokens.push({ text: code.slice(lastIndex), type: "plain" });
  }
  return tokens;
}

export function CodeBlock({ snippet }: { snippet: CodeSnippet }) {
  const [copied, setCopied] = React.useState(false);
  const tokens = React.useMemo(() => tokenize(snippet.code), [snippet.code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — no-op */
    }
  };

  const handleDownload = () => {
    const blob = new Blob([snippet.code], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = snippet.filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-[hsl(222_47%_8%)] text-sm shadow-sm dark:bg-[hsl(222_47%_5%)]">
      {/* Toolbar */}
      <figcaption className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/5 px-4 py-2.5">
        <span className="flex min-w-0 items-center gap-2 text-slate-300">
          <Terminal className="size-4 shrink-0 text-primary" />
          <span className="truncate font-mono text-xs">{snippet.filename}</span>
        </span>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy code"
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {copied ? (
              <Check className="size-3.5 text-emerald-400" />
            ) : (
              <Copy className="size-3.5" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            aria-label="Download script"
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Download className="size-3.5" />
            Download
          </button>
        </div>
      </figcaption>

      {/* Code */}
      <pre className="overflow-x-auto p-4 leading-relaxed">
        <code className="font-mono text-[13px]">
          {tokens.map((t, i) => (
            <span key={i} className={cn(typeClass[t.type])}>
              {t.text}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}

export function CodeBlockTitle({ title }: { title: string }) {
  return (
    <p className="mb-2 text-sm font-semibold text-foreground/90">{title}</p>
  );
}
