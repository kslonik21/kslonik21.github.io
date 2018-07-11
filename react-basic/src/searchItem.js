import React, { Component } from 'react';
import { Form,InputGroup, InputGroupAddon, InputGroupText, Input,Button } from 'reactstrap';

export default class SearchAndFilter extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        let onSearchItem = this.props.onSearch;
        let onFilterItem = this.props.onFilter
        return (
            <Form inline>
                <InputGroupAddon addonType="append">
                    <Input placeholder="Search" ef='filter' onChange={onSearchItem}  />
                    <Button onClick={onFilterItem} outline color="primary" value="SHOW_ALL">All</Button>{' '}
                    <Button onClick={onFilterItem} outline color="primary" value="false">Incomplete</Button>{' '}
                    <Button onClick={onFilterItem} outline color="primary" value="true">Complete</Button>{' '}
                </InputGroupAddon>
            </Form>

        )
    }
}
