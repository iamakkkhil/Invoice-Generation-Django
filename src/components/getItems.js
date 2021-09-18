import React, { Component } from 'react'
import PizzaDisplay from './Pizza'
import EditItems from './EditList'


class getItem extends Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            itemData: [],
            billData: [],
            link_id: ""
        }
    }

    UNSAFE_componentWillMount() {
        this.setState({loading: true})

        if (this.props.method === "PUT") {
            const link_id = (window.location.pathname).slice(6)

            Promise.all([
                fetch( `https://invoice-generator-django.herokuapp.com/api/view-bill/${link_id}/`).then(res => res.json()),
                fetch("https://invoice-generator-django.herokuapp.com/getItems/").then(res => res.json())
            ]).then(([urlOneData, urlTwoData]) => {
                this.setState({
                    loading: false,
                    itemData: urlTwoData,
                    billData: urlOneData,
                    link_id: link_id
                });
            })
        }
        else {
            fetch("https://invoice-generator-django.herokuapp.com/getItems/")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    loading: false,
                    itemData: data
                })
            })
        }        
    }

    render() {
        let text
        if (this.state.loading) {
            text = "loading..."
        }
        else {
            if (this.props.method === "PUT" ) {
                text = <EditItems data={this.state.itemData} billdata={this.state.billData} method="PUT" item_id={this.state.link_id} count="1"/>
            }
            else {
                text = <PizzaDisplay data={this.state.itemData} method="GET" />
            }
        }

        return (
            <div>
                {text}
            </div>
        )
    }
}

export default getItem