import React from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    Checkbox,
    Container
} from "@chakra-ui/react"

function DisplayItem(props) {

    const Checked = console.log("123")

    return (
        <Container>
        <Table variant="striped" colorScheme="teal" size="m">
                <Thead>
                    <Tr>
                        <Th>Add</Th>
                        <Th>Id</Th>
                        <Th>Name</Th>
                        <Th isNumeric>Price</Th>
                        <Th>Quantity</Th>
                    </Tr>
                </Thead>
                <Tbody>
                {props.data.map(item => (
                    <Tr>
                    <Td><Checkbox isChecked={Checked} iconSize="2rem" colorScheme="red">
                        </Checkbox>
                    </Td> 
                    <Td>{item.id}</Td>
                    <Td><strong>{item.name}</strong>
                        <Text fontSize="xs">{item.description}</Text>
                    </Td>
                    <Td isNumeric>{item.price}</Td>
                    <Td></Td>
                </Tr>
                ))}
                </Tbody>
        </Table>
        </Container>
    )
}

export default DisplayItem
