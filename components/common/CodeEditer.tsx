import MonacoEditor from "@monaco-editor/react";
import { FC, useState } from "react";

interface ICodeEditorProps {
  value: string;
}

const CodeEditor: FC<ICodeEditorProps> = ({ value }) => {
  return <MonacoEditor height={300} width="90vw" language="tsx" theme="vs-dark" value={value} />;
};
export default CodeEditor;
