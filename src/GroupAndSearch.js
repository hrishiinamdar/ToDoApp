import React, { Component } from 'react';
import {AddTaskForm} from './AddTaskForm';
import { todoData } from "./data";
import { Table } from "./Table";
import $ from 'jquery'; 

export class GroupAndSearch extends Component {

    state = {value: "none"};

    constructor(props) {
        super(props);
        this.state = {value: "none", todoData: todoData};
        this.changeGrouping = this.changeGrouping.bind(this);
    }

    changeGrouping(event) {
        this.setState({value: event.target.value});
        console.log(this.state.value, event.target.value);
        // return <Table groupBy={event.target.value}/>;
    }

    

    render() {
        return (
            <div>
            <div className="row" style={{marginTop:'15px'}}>
                <div className="col-lg-3 col-md-3 col-sm-12">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <label>Group By</label>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <select className="form-control" onChange={this.changeGrouping} value={this.state.value}>
                                <option selected value="none">None</option>
                                <option value="createdOn">Created On</option>
                                <option value="dueBy">Pending On</option>
                                <option value="priority">Priority</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-lg-1 col-md-1 col-sm-12">

                </div>
                <div className="col-lg-8 col-md-8 col-sm-12">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <label>Search</label>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <input type="text" className="form-control" placeholder="Search Task" onChange={(e) => new Table().search(e)}/>
                        </div>
                    </div>
                </div>
            </div>
            <AddTaskForm groupBy={this.state.value}/>
            </div>
        )
    }
}

export default GroupAndSearch
