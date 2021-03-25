import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Tabs} from 'react-bootstrap';
import {Tab} from 'react-bootstrap';
import {Table} from './Table';


export class AddTaskForm extends Component {
    constructor(props, context) {
		super(props, context);
		this.state = {
			key: 'home',
		};
	}
    render() {
        return (
            <Tabs
				id="controlled-tab-example"
				activeKey={this.state.key}
				onSelect={key => this.setState({ key })}
                style={{marginTop:'35px'}}
			>
				<Tab eventKey="home" title="All">
					<Table groupBy={this.props.groupBy} action="none"/>
				</Tab>
				<Tab eventKey="profile" title="Pending">
                <Table groupBy={this.props.groupBy} action="Done"/>
				</Tab>
				<Tab eventKey="contact" title="Completed">
                <Table groupBy={this.props.groupBy} action="Re-Open"/>
				</Tab>
			</Tabs>
        );
    }
}

export default AddTaskForm
