import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class AddTutorial extends Component {
    constructor(props) {
        super(props);

        this.onChangeTitle       = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveTutorial        = this.saveTutorial.bind(this);
        this.newTutorial         = this.newTutorial.bind(this);

        this.state = {
            id          : null,
            title       : "",
            description : "",
            published   : false,

            submitted : true
        };        
    }

    onChangeTitle(e) {
        this.setState({
            title : e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description : e.target.value
        });
    }

    saveTutorial() {
        var data = {
            title       : this.state.title,
            description : this.state.description
        };

        TutorialDataService.create(data)
            .then(response => {
                this.setState({
                    id          : response.data.id,
                    title       : response.data.title,
                    description : response.data.description,
                    published   : response.data.published,

                    submitted   : true
                });
                console.log(`currentTutorial : ${data}`);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newTutorial() {
        this.setState({
            id : null,
            tittle: "",
            description : "",
            published : false,

            submitted : false
        });
    }

    render(){
        return(
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully</h4>
                        <button className="btn btn-success" onClick={this.newTutorial}>
                            Add Tutorial
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input 
                            type="text"
                            className="form-control"
                            id="title"
                            value={this.state.title}
                            name="title" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">description</label>
                            <input 
                            type="text"
                            className="form-control"
                            id="description"
                            value={this.state.description}
                            name="description" />
                        </div>
                        <button onClick={this.saveTutorial} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );        
    }
}