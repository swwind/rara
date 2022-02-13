import markdownit from "markdown-it";
import mkditkatex from "markdown-it-katex";
import sanitizeHtml from "sanitize-html";
import highlightjs from "highlight.js";

const renderCode = (str: string, lang: string) => {
  return `<pre><code class="hljs">${
    highlightjs.highlight(str.trim(), {
      language: highlightjs.getLanguage(lang)?.aliases?.[0] || "txt",
      ignoreIllegals: true,
    }).value
  }</code></pre>`;
};

const marked = markdownit({
  html: true,
  linkify: true,
  highlight: renderCode,
});

marked.use(mkditkatex, {
  throwOnError: false,
  errorColor: "#cc0000",
});

export function renderMarkdown(mkd: string) {
  return marked.render(mkd);
}

export function renderMarkdownSanitized(mkd: string) {
  return sanitizeHtml(renderMarkdown(mkd));
}
