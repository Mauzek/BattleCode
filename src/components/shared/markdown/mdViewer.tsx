import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import styles from "./markdown.module.scss";

export interface MdViewerProps {
  content: string;
}

export const MdViewer = ({ content }: MdViewerProps) => {
  return (
    <div className={styles.viewerContainer}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};