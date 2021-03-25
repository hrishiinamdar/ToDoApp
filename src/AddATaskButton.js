import React, { Component } from 'react';
import {AddTaskForm } from './AddTaskForm';
import './styles/AddATaskButton.css';
import {GroupAndSearch } from './GroupAndSearch';
import { todoData } from "./data";

export class AddATaskButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todoData: todoData,
            editData: {
                "summary": "",
                "priority": "",
                "createdOn": `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`,
                "dueBy": "",
                "action": "Done",
                "status": "Pending",
                "id": todoData[todoData.length-1]['id']+1,
                "description": ""
            }
        };
    }

    saveData(values) {
        todoData.push(values);
        this.setState({todoData: todoData});
    }

    changeData(event, property) {
        let temp = this.state.editData;
        temp[property] = event.target.value;
        this.setState({editData: {...temp}});
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-9 col-md-9 col-sm-9">
                        <h2>ToDo App</h2>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3">
                        <button className="btn btn-primary" id="addBtn" data-toggle="modal" data-target="#myModal" style={{float:'right'}}>
                        <span className="material-icons">
                            add
                        </span>
                        </button>
                    </div>
                </div>
                <GroupAndSearch />
                <div className="modal" id="myModal">
                <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Task</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {/* <p>Modal body text goes here.</p> */}
                            <form>
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <label>Summary</label>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <input type="text" className="form-control" placeholder="Summary" value={this.state.editData?this.state.editData['summary']:''} onChange={(e) => this.changeData(e,'summary')}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <label>Description</label>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <textarea className="form-control" placeholder="Description" value={this.state.editData?this.state.editData['description']:''} onChange={(e) => this.changeData(e,'description')}></textarea>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                                <label>Due Date</label>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                                <input type="date" className="form-control" value={this.state.editData?this.state.editData['dueBy']:''} onChange={(e) => this.changeData(e,'dueBy')}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                                <label>Priority</label>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                                <select className="form-control"  value={this.state.editData?this.state.editData['priority']:''} onChange={(e) => this.changeData(e,'priority')}>
                                                    <option selected>none</option>
                                                    <option >low</option>
                                                    <option >medium</option>
                                                    <option >high</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-success" data-dismiss="modal" onClick={()=>{this.saveData(this.state.editData)}}>Save</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        
        )
    }
}

export default AddATaskButton
