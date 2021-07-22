import ReactMarkdown from "react-markdown";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  markdown: {}, // Без стиля компонент не создаст свой <div/>
}))

function RenderMarkdown(props) {
  const classes = useStyles()
  return <ReactMarkdown className={classes.markdown}>
    {props.children}
  </ReactMarkdown>
}

RenderMarkdown.propTypes = {
  children: PropTypes.node.isRequired,
}

export default RenderMarkdown