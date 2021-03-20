import {Component} from "react";
import "./Variants.css"
import Loading from "../misc/Loading";
import {withSnackbar} from "notistack";

class Variants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      variants: [],
    }
    this.enqueueSnackbar = this.props.enqueueSnackbar
  }



  componentDidMount() {
    fetch("/variants.json")
      .then(it => it.json())
      .then(it => {
        this.setState({
          loaded: true,
          variants: it
        })
      },
      error => {
        console.log(error)
        this.enqueueSnackbar("Произошла ошибка при получении данных", {variant: "error"})
      }
    )
  }

  render() {

    return <div>
      <Loading open={!this.state.loaded}/>
      {this.state.loaded &&
        this.state.variants.map(it => {

        })
      }
    </div>
  }
}

export default withSnackbar(Variants)