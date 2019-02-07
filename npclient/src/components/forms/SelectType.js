import React from 'react';
import { Dropdown } from 'semantic-ui-react';

class SelectType extends React.Component {
    state = {
        items: this.props.items || [],
        showItems: false
    };

    handleChange = (e, {value}) => console.log(value);

    renderItems() {
        return (
            this.state.items.map(item =>
                <Dropdown.Item
                    text={item.value}
                    key={item.id}
                />

            )
        )
    }

    render() {
        return (
            <Dropdown
                onChange={this.props.onChange}
                button
                className={'icon'}
                icon={'bars'}
                options={this.props.items}
                value={this.props.value}
                text={this.props.value}
            >
            </Dropdown>
        )
    }

}

export default SelectType;