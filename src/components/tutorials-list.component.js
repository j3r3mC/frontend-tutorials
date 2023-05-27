import React, { Component }  from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";

export default class TutorialsList extends Component {
    constructor(props) {
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveTutorials   = this.retrieveTutorials.bind(this);
        this.refreshList         = this.refreshList.bind(this);
        this.setActiveTutorial   = this.setActiveTutorial.bind(this);
        this.removeAllTutorials  = this.removeAllTutorials.bind(this);
        this.searchTitle         = this.searchTitle.bind(this);

        this.state = {
            tutorials       : [],
            currentTutorial : null,
            currentIndex    : -1,
            searchTitle     : ""
        };
    }

    componentDidMount() {
        this.retrieveTutorials();
    }

    onChangeSearchTitle(e) {
        const title = e.target.value;

        this.setState({
            searchTitle : searchTitle
        });
    }

    retrieveTutorials() {
        TutorialDataService.getAll()
            .then(response => {
                this.setState({
                    tutorials : response.data
                });
                console.log("this is response.data : " + response.data);
            })
            .catch(e => {
                console.log("Please don't cry : " + e);
            });
    }
    refreshList() {
        this.retrieveTutorials();
        
        this.setState({
            currentTutorial : null,
            currentIndex    : -1
        });
    }

    setActiveTutorial(tutorial, index) {
        this.setState({
            currentTutorial : tutorial,
            currentIndex    : index
        });
    }

    removeAllTutorials() {
        TutorialDataService.deleteAll()
            .then(response => {
                console.log("It's cleanup : " + response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log("Are you sad? Stop! : " + e);
            });
    }

    searchTitle() {
        TutorialDataService.findByTitle(this.state.searchTitle)
            .then(response => {
                this.setState({
                    tutorials : response.data
                });
                console.log("Be happy : " + response.data);
            })
            .catch(e => {
                console.log("Cheh !!!! : " + e);
            });
    }

    render() {
        const {searchTitle, tutorials, currentTutorial, currentIndex} = this.state

        return (
            <div className="list-row">
                <div className="col-md-8">
                    <div className="input-group mb3">
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle} 
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={this.searchTitle}
                                >
                                    Search <img src="public\téléchargement.png" alt="loupe" />

                                </button>                                
                            </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>TutorialsList</h4>

                    <ul className="list-group">
                        {tutorials &&
                        tutorials.map((tutorial,index) => (
                            <li
                            className={
                                "list-group-item " + 
                                (index === currentIndex ? "active" : "")
                            }
                            onClick={() => this.setActiveTutorial(tutorial, index)}
                            key={index}
                            >
                                {tutorial.title}
                            </li>
                        ))}
                    </ul>
                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllTutorials}
                    >
                        Remove all
                    </button>
                </div>
                <div className="col-md-6">
                    {currentTutorial ? (
                        <div>
                            <h4>Tutorial</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{""}
                                {currentTutorial.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>{""}
                                    {currentTutorial.description}
                            </div>
                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label>{""}
                                    {currentTutorial.published ? "Published" : "Pending"}
                            </div>
                            <Link to={"/tutorials/" 
                                + currentTutorial.id}
                                >
                                    Edit
                                </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on tutorial ....</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}