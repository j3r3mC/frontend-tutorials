import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";

export default class TutorialsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveTutorials = this.retrieveTutorials.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveTutorial = this.setActiveTutorial.bind(this);
        this.removeAllTutorials = this.removeAllTutorials.bind(this);
        this.searchTitle = this.searchTitle.bind(this);

        this.state = {
            tutorials: [],
            currentTutorial: null,
            currentIndex: -1,
            searchTitle: ""
        };
    }

    componentDidMount() {
        this.retrieveTutorials();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    retrieveTutorials() {
        TutorialDataService.getAll()
            .then(response => {
                this.setState({
                    tutorials: response.data
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
            currentTutorial: null,
            currentIndex: -1
        });
    }

    setActiveTutorial(tutorial, index) {
        this.setState({
            currentTutorial: tutorial,
            currentIndex: index
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
                    tutorials: response.data
                });
                console.log("Be happy : " + response.data);
            })
            .catch(e => {
                console.log("Cheh !!!! : " + e);
            });
    }

    render() {
        const { searchTitle, tutorials, currentTutorial, currentIndex } = this.state

        return (
            <div className="list-row">
                <div className="col-md-5">
                    <div className="input-group md-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                                className="m-3 btn btn-sm btn-primary"
                                type="button"
                                onClick={this.searchTitle}
                            >
                                Search

                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="card">
                        <div className="card-title">
                            <h4 className="titleList">Tutorials list</h4>
                        </div>
                        <div className="card-content">
                            <ul className="list-group">
                                {tutorials &&
                                    tutorials.map((tutorial, index) => (
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
                    </div>
                </div>
                <div className="col-sm-6">
                    {currentTutorial ? (
                        <div>
                            <h4 className="titleList">Tutorial</h4>
                            <div className="mb-6 card">
                                <div className="card-body">
                                    <h3 className="card-title">
                                        {currentTutorial.title}
                                    </h3>
                                    <div>
                                        <p className="card-text">description:</p>
                                        <p className="card-text">{currentTutorial.description} </p>
                                    </div>
                                    <div>
                                        <p className="card-text">status: {currentTutorial.published ? "Published" : "Pending"} </p>
                                    </div>
                                    <Link to={"/tutorials/"
                                        + currentTutorial.id}
                                        className="m-3 btn btn-sm btn-warning"
                                    >
                                        Edit
                                    </Link>
                                </div>
                            </div>
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