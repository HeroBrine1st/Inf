import ReactMarkdown from "react-markdown";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from 'remark-gfm'
import 'katex/dist/katex.min.css'
import "./Markdown.css";

const useStyles = makeStyles(() => ({
  markdown: {
    overflow: "auto",
  }
}))

function RenderMarkdown(props) {
  const classes = useStyles()
  return <div className={classes.markdown}>
    <ReactMarkdown
      remarkPlugins={[remarkMath, remarkGfm]}
      rehypePlugins={[rehypeKatex]}
    >
      {props.children}
    </ReactMarkdown>
  </div>
}

RenderMarkdown.propTypes = {
  children: PropTypes.string.isRequired,
}

export default RenderMarkdown
