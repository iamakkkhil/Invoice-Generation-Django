import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './AllCustomers.css'

import { 
    Button,
} from "@chakra-ui/react"

import {
    Link
  } from "react-router-dom";

const URL = 'https://invoice-generator-django.herokuapp.com/api/CustomerBills/'

const Table = () => {
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {

        const response = await axios.get(URL)
        setEmployees(response.data)
    }


    const renderHeader = () => {
        let headerElement = ['name', 'email', 'phone', 'Edit', "Download"]

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {
        return employees && employees.map(({id, customer_name, email, contact_no }) => {
            return (
                <tr key={id}>
                    {/* <td>{id}</td> */}
                    <td>{customer_name}</td>
                    <td>{email}</td>
                    <td>{contact_no}</td>
                    <td className='opration'>
                        <Link to={{ pathname: `/edit/${id}`, state: { prodIndex: {id} }}}><button className='button' >Edit</button></Link>
                    </td>
                    <td className='opration'>
                        
                        <button className='button' 
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.href=`https://invoice-generator-django.herokuapp.com/download/${id}`;
                            }}>Download </button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <>
            <h1 id='title'><strong>Available Invoices</strong></h1>

            <Link to={{ pathname: `/add`, state: { prodIndex: "1" }}}>
                <Button colorScheme="green" size="lg" type="submit" mb={5}>
                    Create New Invoice
                </Button>
            </Link>

            <table id='employee'>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
        </>
    )
}


export default Table