import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { withRouter } from '../common/with-router';
import ReactPlayer from 'react-player';
import "../Tutorials.css"
class Tutorial extends Component {

  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getTutorial = this.getTutorial.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);
    this.onChangeVisibleTitle = this.onChangeVisibleTitle.bind(this);
    this.onChangeVisibleDescription = this.onChangeVisibleDescription.bind(this);

    this.state = {
      currentTutorial: {
        id: null,
        title: "",
        description: "",
        published: false,
        isVisibleTitle: false,
        isVisibleDescription: false,
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getTutorial(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState({
      isVisibleTitle: false
    });

    this.setState(function (prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          title: title

        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState({
      isVisibleDescription: false
    });

    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        description: description,
        isVisibleDescription: false
      }
    }));
  }

  onChangeVisibleTitle(data) {
    this.setState({
      isVisibleTitle: true
    });
    return;
  }
  onChangeVisibleDescription(data) {
    this.setState({
      isVisibleDescription: true
    });

    return;
  }

  getTutorial(id) {
    TutorialDataService.get(id)
      .then(response => {
        this.setState({
          currentTutorial: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  updatePublished(status) {
    var data = {
      id: this.state.currentTutorial.id,
      title: this.state.currentTutorial.title,
      description: this.state.currentTutorial.description,
      published: status
    };

    if (!data.description || data.description.length > 250) {
      this.onChangeVisibleDescription();

      return;
    }

    TutorialDataService.update(this.state.currentTutorial.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTutorial: {
            ...prevState.currentTutorial,
            published: status
          }

        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  updateTutorial() {
    TutorialDataService.update(
      this.state.currentTutorial.id,
      this.state.currentTutorial
    )
      .then(response => {
        if (!this.state.currentTutorial.title || this.state.currentTutorial.title >= 50) {
          this.onChangeVisibleTitle();
          return;
        }
        if (!this.state.currentTutorial.description || this.state.currentTutorial.description >= 250) {
          this.onChangeVisibleDescription();
          return;
        }
        console.log(response.data);
        this.props.router.navigation('/tutorials');
      })
      .catch(e => {
        console.log(e);
      });
  }


  deleteTutorial() {
    TutorialDataService.delete(this.state.currentTutorial.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigation('/tutorials');
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { currentTutorial } = this.state;
    return (
      <div>

        {currentTutorial ? (
          <div className="edit-form">
            <h4>Tutorial</h4>
            <div className="player">
              <ReactPlayer url='https://www.youtube.com/watch?v=f0X1Tl8aHtA' controls={true} light={true} height={15 + "rem"} />
            </div>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTutorial.title}
                  onChange={this.onChangeTitle}
                  required
                />
                <p className="red">{this.state.isVisibleTitle
                  ? " Title should not empty or Title length should be lower than 50 characters"
                  : null}
                </p>
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTutorial.description}
                  onChange={this.onChangeDescription}
                  required
                />
                <p className="red">{this.state.isVisibleDescription
                  ? "description imput should not empty or description length should be lower than 250 characters"
                  : null}
                </p>
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTutorial.published ? " Published" : " Pending"}
              </div>
            </form>
            <div className="buttons">
              {currentTutorial.published ? (
                <button
                  className=" btn btn-outline-warning"
                  onClick={() => this.updatePublished(false)}
                >
                  UnPublish
                </button>
              ) : (
                <button
                  className="btn btn-outline-primary"
                  onClick={() => this.updatePublished(true)}
                >
                  Publish
                </button>
              )}

              <button
                className=" btn btn-outline-danger"
                onClick={this.deleteTutorial}
              >
                Delete
              </button>

              <button
                type="button"
                className=" btn btn-outline-dark"
                onClick={this.updateTutorial}
              >
                Update
              </button>
            </div>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Tutorial);