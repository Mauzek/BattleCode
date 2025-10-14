import MDEditor from "@uiw/react-md-editor";
import styles from "./markdown.module.scss";

export interface MdEditorProps {
  value: string;
  onChange: (value: string) => void;
  height?: number;
}

export const MdEditor = ({
  value,
  onChange,
  height = 300,
}: MdEditorProps) => {
  const safeValue = typeof value === "string" ? value : "";

  return (
    <div
      className={styles.editorContainer}
    >
      <MDEditor
        value={safeValue}
        onChange={(v) => onChange(v || "")}
        height={height}
        preview="live"
      />
    </div>
  );
};