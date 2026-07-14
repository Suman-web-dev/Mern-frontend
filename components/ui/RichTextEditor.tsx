import { Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  wordCount?: number;
  maxWords?: number;
  className?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Enter your content...",
  wordCount = 0,
  maxWords,
  className,
}: RichTextEditorProps) {
  const handleCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.innerHTML;
    onChange(content);
  };

  const getWordCount = (text: string) => {
    const cleanText = text.replace(/<[^>]*>/g, ' ').trim();
    return cleanText ? cleanText.split(/\s+/).length : 0;
  };

  return (
    <div className={cn("border border-gray-300 rounded-md overflow-hidden", className)}>
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex items-center space-x-1 flex-wrap">
        <button
          type="button"
          onClick={() => handleCommand('bold')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => handleCommand('italic')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => handleCommand('underline')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Underline"
        >
          <Underline className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-2" />
        <button
          type="button"
          onClick={() => handleCommand('insertUnorderedList')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => handleCommand('insertOrderedList')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-2" />
        <button
          type="button"
          onClick={() => handleCommand('justifyLeft')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => handleCommand('justifyCenter')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => handleCommand('justifyRight')}
          className="p-2 hover:bg-gray-200 rounded transition-colors"
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </button>
      </div>

      {/* Editor */}
      <div
        contentEditable
        onInput={handleInput}
        className="min-h-[200px] p-4 focus:outline-none"
        dangerouslySetInnerHTML={{ __html: value }}
        suppressContentEditableWarning
      />

      {/* Word Count */}
      <div className="bg-gray-50 border-t border-gray-300 px-4 py-2 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {placeholder}
        </span>
        <span className={cn("text-sm", maxWords && wordCount > maxWords ? "text-red-500" : "text-gray-500")}>
          {wordCount} {maxWords ? `/ ${maxWords}` : ''} words
        </span>
      </div>
    </div>
  );
}
