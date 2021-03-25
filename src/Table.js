import React, { Component, ReactFragment } from 'react';
import { todoData } from "./data";
import {AddATaskButton } from './AddATaskButton';
import {GroupAndSearch } from './GroupAndSearch';
import $ from 'jquery'; 

export class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoData: todoData,
            editData: [],
            sort: 'asc'
        };
    }

    groupBy = function(xs, key) {
        return xs.reduce(function(rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };

    completeOrPending(id) {
        for(let i of todoData) {
            if(i['id']===id) {
                i['action'] = i['action']==='Done'?'Re-Open':'Done';
                break;
            }
        }
        this.setState({todoData: this.todoData});
    }

    delete(id) {
        for(let [i,j] of todoData.entries()) {
            if(j['id']==id) {
                todoData.splice(i,1);
                break;
            }
        }
        this.setState({todoData: this.todoData});
    }

    edit(id) {
        console.log(id);
        this.setState({editData: {...id}});
        $('#myModal1').modal('toggle');
    }

    saveData(values) {
        for(let [i,j] of todoData.entries()) {
            if(j['id']==values['id']) {
                todoData[i] = values;
                break;
            }
        }
        this.setState({todoData: this.todoData});
    }

    changeData(event, property) {
        let temp = this.state.editData;
        temp[property] = event.target.value;
        this.setState({editData: {...temp}});
    }

    search(event) {
        let totalData = this.state.todoData;
        totalData = totalData.filter( (item) => {
          let flag = 0;
          for(let i in item) {
              if(i!='id' && i!='status' && (item[i].toLowerCase()).includes((event.target.value).toLowerCase())) {
                flag = 1;
                console.log(item[i].toLowerCase(),(event.target.value).toLowerCase());
                break;
              }
          }
          if(flag === 1) {
              console.log("Reached");
            return item; 
          }  
        });
        console.log(totalData);
        this.setState({todoData: totalData});
    }

    sortBy(column) {
        let totalData = this.state.todoData;
        console.log(totalData,column);
        if(this.state.sort == 'asc') {
            totalData = totalData.sort( (a,b) => {
                if (a[column] < b[column]) return -1
                return a[column] > b[column] ? 1 : 0
            });
        } else {
            totalData = totalData.sort( (a,b) => {
                if (a[column] > b[column]) return -1
                return a[column] < b[column] ? 1 : 0
            });
        }
        console.log(totalData);
        this.setState({todoData: totalData, sort: this.state.sort=='asc'?'desc':'asc'});
    }
    
    render() {
        var todoData2 = todoData;
        if(this.props.action!='none') {
            todoData2 = todoData.filter((action)=> {
                return action['action'] == this.props.action;
            });
        }
        var todoData1 = {...this.groupBy(todoData2,this.props.groupBy)};
        return (
            <div className="row" style={{marginTop:'25px'}}>
                <table id="table" class="table table-bordered table-sm" cellspacing="0" width="100%">
                    <thead>
                        <tr>
                        <th class="th-sm"><span style={{float:'left'}}>Summary</span>
                        <span style={{float:'right'}}><button className="btn btn-sm btn-primary" style={{style:'none'}} onClick={() => this.sortBy('summary')}><span class="material-icons" style={{fontSize:'10px'}}>
                            sort
                        </span></button></span>
                        </th>
                        <th class="th-sm"><span style={{float:'left'}}>Priority</span>
                        <span style={{float:'right'}}><button className="btn btn-sm btn-primary" style={{style:'none'}} onClick={() => this.sortBy('priority')}><span class="material-icons" style={{fontSize:'10px'}}>
                            sort
                        </span></button></span>
                        </th>
                        <th class="th-sm"><span style={{float:'left'}}>Created On</span>
                        <span style={{float:'right'}}><button className="btn btn-sm btn-primary" style={{style:'none'}} onClick={() => this.sortBy('createdOn')}><span class="material-icons" style={{fontSize:'10px'}}>
                            sort
                        </span></button></span>
                        </th>
                        <th class="th-sm"><span style={{float:'left'}}>Due by</span>
                        <span style={{float:'right'}}><button className="btn btn-sm btn-primary" style={{style:'none'}} onClick={() => this.sortBy('dueBy')}><span class="material-icons" style={{fontSize:'10px'}}>
                            sort
                        </span></button></span>
                        </th>
                        <th class="th-sm"><span style={{float:'left'}}>Actions</span>
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                            {Object.keys(todoData1).map((data1, key1) => {
                                return ( 
                                    // <div>
                                    <React.Fragment>
                                    {data1!='undefined'?<tr><strong style={{margin:'5px 0px'}}><u>{data1.toUpperCase()}</u></strong></tr>:<span></span>}
                                    {todoData1[data1].map( (data,key) => {
                                        return(
                                            <tr key={data['id']}>
                                            {data['action']==='Done'?<td><span style={{float:'left'}}>{data['summary']}</span></td>:<td><span style={{float:'left'}}><del>{data['summary']}</del></span></td>}
                                            {data['action']==='Done'?<td><span style={{float:'left'}}>{data['priority']}</span></td>:<td><span style={{float:'left'}}><del>{data['priority']}</del></span></td>}
                                            {data['action']==='Done'?<td><span style={{float:'left'}}>{data['createdOn']}</span></td>:<td><span style={{float:'left'}}><del>{data['createdOn']}</del></span></td>}
                                            {data['action']==='Done'?<td><span style={{float:'left'}}>{data['dueBy']}</span></td>:<td><span style={{float:'left'}}><del>{data['dueBy']}</del></span></td>}
                                            <td>
                                            <span style={{float:'left'}}>
                                                <span><button className="btn btn-primary" onClick={() => this.edit(data)}><span class="material-icons">
                                                    edit
                                                </span></button></span>
                                                <span style={{margin:'0px 10px'}}><button className={data['action']==='Done' ? 'btn btn-success' : 'btn btn-primary'} onClick={() => this.completeOrPending(data['id'])}>{data['action']}</button></span>
                                                <span style={{height:'70%'}}><button className="btn btn-danger" onClick={() => this.delete(data['id'])}><span class="material-icons">
                                                    delete
                                                </span></button></span>
                                            </span>
                                            </td>
                                            </tr>)
                                    })}
                                    {/* // </div> */}
                                    </React.Fragment>
                                );
                            })}
                    </tbody>
                </table>
                <div className="modal" id="myModal1">
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

export default Table
