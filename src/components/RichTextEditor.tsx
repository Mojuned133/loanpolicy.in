// "use client";

// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Link from "@tiptap/extension-link";
// import Underline from "@tiptap/extension-underline";
// import { useEffect } from "react";

// type Props = {
//   value: string;
//   onChange: (value: string) => void;
// };

// export default function RichTextEditor({
//   value,
//   onChange,
// }: Props) {
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Underline,
//       Link.configure({
//         openOnClick: false,
//         autolink: true,
//       }),
//     ],
//     content: value,
//     editorProps: {
//       attributes: {
//         class:
//           "min-h-[300px] rounded-b-md border border-t-0 border-neutral-300 p-4 focus:outline-none prose max-w-none",
//       },
//     },
//     onUpdate({ editor }) {
//       onChange(editor.getHTML());
//     },
//     immediatelyRender: false,
//   });

//   useEffect(() => {
//     if (!editor) return;

//     if (editor.getHTML() !== value) {
//       editor.commands.setContent(value);
//     }
//   }, [value, editor]);

//   if (!editor) return null;

//   return (
//     <div className="rounded-md border border-neutral-300">
//       {/* Toolbar */}
//       <div className="flex flex-wrap gap-2 border-b bg-neutral-50 p-2">

//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleBold().run()}
//           className="rounded border px-3 py-1"
//         >
//           <b>B</b>
//         </button>

//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleItalic().run()}
//           className="rounded border px-3 py-1 italic"
//         >
//           I
//         </button>

//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleUnderline().run()}
//           className="rounded border px-3 py-1 underline"
//         >
//           U
//         </button>

//         <button
//           type="button"
//           onClick={() =>
//             editor.chain().focus().toggleHeading({ level: 2 }).run()
//           }
//           className="rounded border px-3 py-1"
//         >
//           H2
//         </button>

//         <button
//           type="button"
//           onClick={() =>
//             editor.chain().focus().toggleHeading({ level: 3 }).run()
//           }
//           className="rounded border px-3 py-1"
//         >
//           H3
//         </button>

//         <button
//           type="button"
//           onClick={() =>
//             editor.chain().focus().toggleBulletList().run()
//           }
//           className="rounded border px-3 py-1"
//         >
//           • List
//         </button>

//         <button
//           type="button"
//           onClick={() =>
//             editor.chain().focus().toggleOrderedList().run()
//           }
//           className="rounded border px-3 py-1"
//         >
//           1. List
//         </button>

//         <button
//           type="button"
//           onClick={() => {
//             const url = window.prompt("Enter URL");

//             if (url) {
//               editor
//                 .chain()
//                 .focus()
//                 .setLink({ href: url })
//                 .run();
//             }
//           }}
//           className="rounded border px-3 py-1"
//         >
//           🔗 Link
//         </button>

//         <button
//           type="button"
//           onClick={() => editor.chain().focus().undo().run()}
//           className="rounded border px-3 py-1"
//         >
//           ↶
//         </button>

//         <button
//           type="button"
//           onClick={() => editor.chain().focus().redo().run()}
//           className="rounded border px-3 py-1"
//         >
//           ↷
//         </button>

//       </div>

//       <EditorContent editor={editor} />
//     </div>
//   );
// }

"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import ImageExtension from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";

import {
  TextStyle,
  Color,
  FontFamily,
  FontSize,
  LineHeight,
} from "@tiptap/extension-text-style";

import {
  Table,
  TableRow,
  TableCell,
  TableHeader,
} from "@tiptap/extension-table";

import { DOMParser as PMDOMParser } from "@tiptap/pm/model";

import { useEffect, useState } from "react";
import { marked } from "marked";

function looksLikeMarkdown(text: string): boolean {
  return (
    /(^|\n)\s{0,3}(#{1,6}\s|[-*+]\s|\d+\.\s|>\s)/.test(text) ||
    /\*\*[^*\n]+\*\*/.test(text) ||
    /__[^_\n]+__/.test(text) ||
    /`[^`\n]+`/.test(text)
  );
}

/**
 * Determine whether clipboard contains actual rich HTML.
 *
 * Google Docs often uses <p>, <span>, <b>, <i>, inline styles etc.
 * We should NOT convert such content through Markdown.
 */
function hasStructuredHtml(html: string): boolean {
  if (!html) return false;

  return /<(h[1-6]|ul|ol|li|blockquote|table|tr|td|th)\b/i.test(html);
}

export default function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const [linkUrl, setLinkUrl] = useState("");
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        link: {
          openOnClick: false,
          autolink: true,
          linkOnPaste: true,
        },

        // We handle these separately.
        // link: false,
        underline: false,
        horizontalRule: false,
      }),

      Underline,

      TextStyle,

      Color.configure({
        types: ["textStyle"],
      }),

      Highlight.configure({
        multicolor: true,
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),

      Subscript,
      Superscript,

      // Link.configure({
      //   openOnClick: false,
      //   autolink: true,
      //   linkOnPaste: true,
      // }),

      ImageExtension.configure({
        inline: false,
        allowBase64: true,
      }),

      Table.configure({
        resizable: true,
      }),

      TableRow,
      TableHeader,
      TableCell,
    ],

    content: value,

    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          "prose prose-neutral max-w-none min-h-[500px] px-8 py-6 text-base focus:outline-none",
      },

      handlePaste: (view, event) => {
        const clipboardData = (event as ClipboardEvent).clipboardData;

        if (!clipboardData) {
          return false;
        }

        const text = clipboardData.getData("text/plain");
        const html = clipboardData.getData("text/html");

        /**
         * ---------------------------------------------------------
         * 1. REAL RICH HTML
         * ---------------------------------------------------------
         *
         * Google Docs / Word / web pages usually provide HTML.
         *
         * Let ProseMirror parse it directly.
         */
        if (html && hasStructuredHtml(html)) {
          return false;
        }

        /**
         * ---------------------------------------------------------
         * 2. MARKDOWN
         * ---------------------------------------------------------
         *
         * ChatGPT / Claude often provide Markdown as plain text.
         */
        if (text && looksLikeMarkdown(text)) {
          event.preventDefault();

          const parsedHtml = marked.parse(text, {
            async: false,
            breaks: true,
            gfm: true,
          }) as string;

          const dom = document.createElement("div");
          dom.innerHTML = parsedHtml;

          const { state, dispatch } = view;

          const slice = PMDOMParser.fromSchema(state.schema).parseSlice(dom, {
            preserveWhitespace: true,
          });

          dispatch(state.tr.replaceSelection(slice).scrollIntoView());

          return true;
        }

        /**
         * ---------------------------------------------------------
         * 3. PLAIN TEXT
         * ---------------------------------------------------------
         *
         * Preserve paragraphs and line breaks.
         */
        if (text && !html) {
          event.preventDefault();

          const htmlFromText = text
            .split(/\n{2,}/)
            .map((paragraph) => {
              return `<p>${escapeHtml(paragraph).replace(/\n/g, "<br>")}</p>`;
            })
            .join("");

          const dom = document.createElement("div");
          dom.innerHTML = htmlFromText;

          const { state, dispatch } = view;

          const slice = PMDOMParser.fromSchema(state.schema).parseSlice(dom, {
            preserveWhitespace: true,
          });

          dispatch(state.tr.replaceSelection(slice).scrollIntoView());

          return true;
        }

        return false;
      },
    },

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    if (value !== editor.getHTML()) {
      editor.commands.setContent(value, {
        emitUpdate: false,
      });
    }
  }, [editor, value]);

  if (!editor) {
    return null;
  }

  const Btn = ({
    active,
    onClick,
    children,
    title,
  }: {
    active?: boolean;
    onClick: () => void;
    children: React.ReactNode;
    title: string;
  }) => (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`rounded px-2 py-1.5 text-xs font-semibold transition ${
        active
          ? "bg-brand-green text-white"
          : "text-neutral-600 hover:bg-neutral-200"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="overflow-hidden rounded-md border border-neutral-300 bg-white">
      {/* TOOLBAR */}

      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 border-b border-neutral-300 bg-neutral-50 p-2">
        {/* HEADINGS */}

        <Btn
          title="Heading 1"
          active={editor.isActive("heading", { level: 1 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </Btn>

        <Btn
          title="Heading 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </Btn>

        <Btn
          title="Heading 3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          H3
        </Btn>

        <span className="mx-1 h-5 w-px bg-neutral-300" />

        {/* BASIC FORMATTING */}

        <Btn
          title="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <strong>B</strong>
        </Btn>

        <Btn
          title="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <em>I</em>
        </Btn>

        <Btn
          title="Underline"
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <u>U</u>
        </Btn>

        <Btn
          title="Strikethrough"
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <s>S</s>
        </Btn>

        <span className="mx-1 h-5 w-px bg-neutral-300" />

        {/* LISTS */}

        <Btn
          title="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • List
        </Btn>

        <Btn
          title="Numbered list"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </Btn>

        <Btn
          title="Blockquote"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          Quote
        </Btn>

        <span className="mx-1 h-5 w-px bg-neutral-300" />

        {/* ALIGNMENT */}

        <Btn
          title="Align left"
          active={editor.isActive({
            textAlign: "left",
          })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          ⬅
        </Btn>

        <Btn
          title="Align centre"
          active={editor.isActive({
            textAlign: "center",
          })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          ≡
        </Btn>

        <Btn
          title="Align right"
          active={editor.isActive({
            textAlign: "right",
          })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          ➡
        </Btn>

        <Btn
          title="Justify"
          active={editor.isActive({
            textAlign: "justify",
          })}
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        >
          ☰
        </Btn>

        <span className="mx-1 h-5 w-px bg-neutral-300" />

        {/* LINK */}

        <div className="flex items-center gap-1">
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-52 rounded border border-neutral-300 px-2 py-1 text-xs"
          />

          <Btn
            title="Add link"
            onClick={() => {
              if (!linkUrl.trim()) return;

              editor
                .chain()
                .focus()
                .setLink({
                  href: linkUrl.trim(),
                })
                .run();

              setLinkUrl("");
            }}
          >
            🔗
          </Btn>
        </div>

        {/* HIGHLIGHT */}

        <Btn
          title="Highlight"
          active={editor.isActive("highlight")}
          onClick={() => editor.chain().focus().toggleHighlight().run()}
        >
          🖍
        </Btn>

        {/* TEXT COLOR */}

        <label
          title="Text colour"
          className="flex cursor-pointer items-center rounded px-2 py-1.5 text-xs hover:bg-neutral-200"
        >
          A
          <input
            type="color"
            className="ml-1 h-5 w-5 cursor-pointer"
            onChange={(e) => {
              editor.chain().focus().setColor(e.target.value).run();
            }}
          />
        </label>

        {/* SUBSCRIPT */}

        <Btn
          title="Subscript"
          active={editor.isActive("subscript")}
          onClick={() => editor.chain().focus().toggleSubscript().run()}
        >
          X₂
        </Btn>

        {/* SUPERSCRIPT */}

        <Btn
          title="Superscript"
          active={editor.isActive("superscript")}
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
        >
          X²
        </Btn>

        <span className="mx-1 h-5 w-px bg-neutral-300" />

        {/* UNDO */}

        <Btn title="Undo" onClick={() => editor.chain().focus().undo().run()}>
          ↶
        </Btn>

        {/* REDO */}

        <Btn title="Redo" onClick={() => editor.chain().focus().redo().run()}>
          ↷
        </Btn>

        {/* CLEAR */}

        <Btn
          title="Clear formatting"
          onClick={() =>
            editor.chain().focus().clearNodes().unsetAllMarks().run()
          }
        >
          Clear
        </Btn>
      </div>

      {/* EDITOR */}

      <EditorContent editor={editor} />
    </div>
  );
}

/**
 * Escape plain text before injecting into temporary HTML.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
