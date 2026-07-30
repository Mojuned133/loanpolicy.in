"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { useEffect } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function RichTextEditor({
  value,
  onChange,
}: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] rounded-b-md border border-t-0 border-neutral-300 p-4 focus:outline-none prose max-w-none",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (!editor) return;

    if (editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="rounded-md border border-neutral-300">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border-b bg-neutral-50 p-2">

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="rounded border px-3 py-1"
        >
          <b>B</b>
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="rounded border px-3 py-1 italic"
        >
          I
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className="rounded border px-3 py-1 underline"
        >
          U
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="rounded border px-3 py-1"
        >
          H2
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className="rounded border px-3 py-1"
        >
          H3
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          className="rounded border px-3 py-1"
        >
          • List
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          className="rounded border px-3 py-1"
        >
          1. List
        </button>

        <button
          type="button"
          onClick={() => {
            const url = window.prompt("Enter URL");

            if (url) {
              editor
                .chain()
                .focus()
                .setLink({ href: url })
                .run();
            }
          }}
          className="rounded border px-3 py-1"
        >
          🔗 Link
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="rounded border px-3 py-1"
        >
          ↶
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="rounded border px-3 py-1"
        >
          ↷
        </button>

      </div>

      <EditorContent editor={editor} />
    </div>
  );
}