import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";


export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);
    this.onChangeVisibleTitle = this.onChangeVisibleTitle.bind(this);
    this.onChangeVisibleDescription = this.onChangeVisibleDescription.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      published: false,
      isVisibleTitle: false,
      isVisibleDescription: false,

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      isVisibleTitle: false,
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      isVisibleDescription: false,
      description: e.target.value
    });
  }

  onChangeVisibleTitle(e) {
    this.setState({
      isVisibleTitle: true
    });
  }
  onChangeVisibleDescription(e) {
    this.setState({
      isVisibleDescription: true
    });
  }

  saveTutorial() {
    var data = {
      title: this.state.title,
      description: this.state.description
    };

    if (!data.title || data.title.length > 50) {
      this.onChangeVisibleTitle();

      return;
    }

    if (!data.description || data.description.length > 250) {
      this.onChangeVisibleDescription();

      return;
    }

    TutorialDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  newTutorial() {
    this.setState({
      id: null,
      title: "",
      description: "",
      published: false,

      submitted: false
    });
  }

  render() {
  
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h3>You submitted successfully!</h3>
            <button className="btn btn-outline-success" onClick={this.newTutorial}>
              Add
            </button>
          </div>
        ) : (
          <div className="card">
            <h3>Create tutorial</h3>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
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
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
              <p className="red">{this.state.isVisibleDescription
                ? "description imput should not empty or description length should be lower than 250 characters"
                : null}
              </p>
            </div>

            <button onClick={this.saveTutorial} className="btn btn-outline-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
