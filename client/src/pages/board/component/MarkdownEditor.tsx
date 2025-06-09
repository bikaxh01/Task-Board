import MDEditor from "@uiw/react-markdown-editor";

import "@wcj/dark-mode";

type MarkdownEditorProps = {
  content: string;
  setContent: (text: string) => void;
};

const MarkdownEditor = ({ content, setContent }: MarkdownEditorProps) => {
  return (
    <div style={{ width: "600px" }}>
      <MDEditor
        className=" h-[15rem] "
        value={content}

        onChange={(value) => {
          setContent(value);
        }}
      />
    </div>
  );
};

export default MarkdownEditor;
