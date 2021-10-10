import ReactMarkdown from "react-markdown";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import 'katex/dist/katex.min.css'
import "./Markdown.css";

const useStyles = makeStyles(() => ({
  markdown: {
    overflow: "auto",
  }
}))

function RenderMarkdown(props) {
  const classes = useStyles()
  return <ReactMarkdown
    remarkPlugins={[remarkMath]}
    rehypePlugins={[rehypeKatex]}
    className={classes.markdown}>
    {props.children}
  </ReactMarkdown>
}

RenderMarkdown.propTypes = {
  children: PropTypes.string.isRequired,
}

export default RenderMarkdown
