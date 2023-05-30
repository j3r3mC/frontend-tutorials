import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { withRouter } from '../common/with-router';
class Tutorial extends Component {
    constructor(props) {
      super(props);
      
      this.onChangeTitle = this.onChangeTitle.bind(this);
      this.onChangeDescription = this.onChangeDescription.bind(this);
      this.getTutorial = this.getTutorial.bind(this);
      this.updatePublished = this.updatePublished.bind(this);
      this.updateTutorial = this.updateTutorial.bind(this);
      this.deleteTutorial = this.deleteTutorial.bind(this);
  
      this.state = {
        currentTutorial: {
          id: null,
          title: "",
          description: "",
          published: false,
        },
        message: ""
      };
    }
  
    componentDidMount() {
      this.getTutorial(this.props.router.params.id);
    }
  
    onChangeTitle(e) {
      const title = e.target.value;
  
      this.setState(function(prevState) {
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
      
      this.setState(prevState => ({
        currentTutorial: {
          ...prevState.currentTutorial,
          description: description
        }
      }));
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

      if(!data.title || data.title.length > 50){
        console.log("title imput should not empty or title length should be lower than 50 characters");
        return;
      }

      if(!data.description || data.description.length > 250){
        console.log("description imput should not empty or description length should be lower than 250 characters");
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
                  </div>
    
                  <div className="form-group">
                    <label>
                      <strong>Status:</strong>
                    </label>
                    {currentTutorial.published ? " Published" : " Pending"}
                  </div>
                </form>
    
                {currentTutorial.published ? (
                  <button
                    className="m-3 btn btn-sm btn-warning"
                    onClick={() => this.updatePublished(false)}
                  >
                    UnPublish
                  </button>
                ) : (
                  <button
                    className="m-3 btn btn-sm btn-primary"
                    onClick={() => this.updatePublished(true)}
                  >
                    Publish
                  </button>
                )}
    
                <button
                  className="m-3 btn btn-sm btn-danger"
                  onClick={this.deleteTutorial}
                >
                  Delete
                </button>
    
                <button
                  type="submit"
                  className="m-3 btn btn-sm btn-success"
                  onClick={this.updateTutorial}
                >
                  Update
                </button>
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