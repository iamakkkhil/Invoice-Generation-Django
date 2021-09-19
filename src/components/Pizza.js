import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Input,
         Stack,
         Center,
         Button,
 } from "@chakra-ui/react"
import "./Pizza.css";

const getFormattedPrice = (price) => `₹${parseInt(price).toFixed(2)}`;


export default function App(props) {
    const [checkedState, setCheckedState] = useState(
        new Array(props.data.length).fill(false)
    );

    const [quantity, setQuantity] = useState(
        new Array(props.data.length).fill(1)
    );

    const [total, setTotal] = useState(0);

    const [purchasedItems, setPurchasedItems] = useState([]);

    function settingPrice(updatedCheckedState) {

        setPurchasedItems([]);
        var newPurchasedItems = []
        const totalPrice = updatedCheckedState.reduce(
            (sum, currentState, index) => {
                
                if (currentState === true) {
                    newPurchasedItems.push(
                        {
                            "product_name": props.data[index].name,
                            "product_price": props.data[index].price,
                            "quantity": quantity[index]
                        }
                    )
                    setPurchasedItems(newPurchasedItems)
                    return parseInt(sum) + parseInt(props.data[index].price) * parseInt(quantity[index]);
                }
                return sum;
            },
            0
          );
        setTotal(totalPrice);
    }

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
          index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
        settingPrice(updatedCheckedState);
    };

    const handleQuantityIncrease = (index) => {
        
		const newQuantity = quantity;
		newQuantity[index] = newQuantity[index] + 1;

		setQuantity(newQuantity);
        settingPrice(checkedState);
		
	};

    const handleQuantityDecrease = (index) => {

        if (quantity[index] > 1) {
            const newQuantity = [...quantity];

            newQuantity[index]--;

            setQuantity(newQuantity);
        }
        settingPrice(checkedState);
            
	};

    const [data, setData] = useState({
        "purchased_items_obj": [],
        "customer_name": "Unknown",
        "contact_no": 1234567899,
        "email": "",
        "total_amount": total
    }
        
    );

    const handleName = (event) => {
        const newData = data
        newData["customer_name"] = event.target.value;
        setData(newData)
    }
    const handleTelephone = (event) => {
        const newData = data
        newData["contact_no"] = event.target.value;
        setData(newData)
    }
    const handleEmail = (event) => {
        const newData = data
        newData["email"] = event.target.value;
        setData(newData)
    }

    const handleSubmit = (event) => {
        const newData= data
        newData["total_amount"] = total;

        newData["purchased_items_obj"] = purchasedItems;
        setData(newData)
        const myObjStr = JSON.stringify(data);
        // console.log(myObjStr);

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: myObjStr
        };
        fetch("https://invoice-generator-django.herokuapp.com/api/AddCustomer/", requestOptions)
            .then(response => response.json()) 
            
        window.location.href='/'
    }

    

    return (
        <div className="App">
            <Center pt={10}>
                <Stack width={450} align="center" spacing={2}>
                    <Input type="text" placeholder="Name" onChange={(e) => handleName(e)} />
                    <Input type="tel" placeholder="Phone number" onChange={(e) => handleTelephone(e)}/>
                    <Input placeholder="Enter email" onChange={(e) => handleEmail(e)}/>
                </Stack>
            </Center>

            <h2><strong>Available Items</strong></h2>
            <ul className="shopping-list">
                {props.data.map(({ name, price }, index) => {
                return (
                    <li key={index}>
                    <div className="shopping-list-item">
                        <div className="left-section">
                        <input
                            type="checkbox"
                            id={`custom-checkbox-${index}`}
                            name={name}
                            value={name}
                            checked={checkedState[index]}
                            onChange={() => handleOnChange(index, name, price)}
                        />
                        <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                        </div>

                        <div className="right-section">{getFormattedPrice(price)}</div>
                        
                        <div className='right-section'>
                            <button>        
                                <FontAwesomeIcon icon={faChevronLeft}  onClick={() => handleQuantityDecrease(index, name, price)} />
                            </button>
                            <span> {quantity[index]} </span>
                            <button>
                                <FontAwesomeIcon icon={faChevronRight} onClick={() => handleQuantityIncrease(index, name, price)} />
                            </button>
                        </div>
                        
                    </div>
                    </li>
                );
                })}
                <li>
                    <div className="shopping-list-item">
                        <div className="left-section">Total:</div>
                        <div className="right-section">{getFormattedPrice(total)}</div>
                    </div>
                </li>
            </ul>
            <Button colorScheme="teal" size="lg" type="submit" onClick={(e) => handleSubmit(e)}>
                Save
            </Button>
        {/* </form> */}
        </div>
    );
}
