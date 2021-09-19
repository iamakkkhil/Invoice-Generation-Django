import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Button } from "@chakra-ui/react"
import "./Pizza.css";


const getFormattedPrice = (price) => `₹${parseInt(price).toFixed(2)}`;


export default function App(props) {
    const [checkedState, setCheckedState] = useState(
        new Array(props.data.length).fill(false)
    );

    const [count, setCount] = useState(props.count)

    const [quantity, setQuantity] = useState(
        new Array(props.data.length).fill(1)
    );

    const [total, setTotal] = useState(0);

    const [purchasedItems, setPurchasedItems] = useState([]);
    
    function settingPrice(updatedCheckedState, quantity) {

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
        settingPrice(updatedCheckedState, quantity);
    };

    const handleQuantityIncrease = (index) => {
        
		const newQuantity = quantity;
		newQuantity[index] = newQuantity[index] + 1;

		setQuantity(newQuantity);
        settingPrice(checkedState, quantity);
		
	};

    const handleQuantityDecrease = (index) => {
        if (quantity[index] > 1) {
            const newQuantity = quantity;
            newQuantity[index] = newQuantity[index] - 1;

            setQuantity(newQuantity);
            settingPrice(checkedState, quantity);
        }   
	};

    const [data, setData] = useState({
        "purchased_items_obj": [],
        "customer_name": `${props.billdata.customer_name}`,
        "contact_no": `${props.billdata.contact_no}`,
        "email": `${props.billdata.email}`,
        "total_amount": total
    });

    const UpdatingCheckState_UpdatingQuantity = (Postdata) => {
        let newCheckState = Array(props.data.length).fill(false)
        let newQuantity = Array(props.data.length).fill(1)

        // eslint-disable-next-line
        props.data.map(({ name, price }, index) => {setQuantity(newQuantity)
            for (let i = 0; i < Postdata.purchased_items_obj.length; i++) {
                if (Postdata.purchased_items_obj[i].product_name === name && Postdata.purchased_items_obj[i].product_price === price ) {
                    newCheckState[index] = true
                    newQuantity[index] = Postdata.purchased_items_obj[i].quantity
                }
            }
        })
        setCheckedState(newCheckState)
        setQuantity(newQuantity)
        settingPrice(newCheckState, newQuantity)
    }

    if (count === "1") {
        UpdatingCheckState_UpdatingQuantity(props.billdata)
        setCount("0")
    }
 
    const handleSubmit = (event) => {
        const newData= data
        newData["total_amount"] = total;
        newData["purchased_items_obj"] = purchasedItems;
        setData(newData)

    
        const myObjStr = JSON.stringify(data);
        console.log(myObjStr)

        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: myObjStr
        };
        fetch(`https://invoice-generator-django.herokuapp.com/api/edit-bill/${props.item_id}/`, requestOptions)
            .then(response => response.json())
            
        window.location.href='/'
    }

    

    return (
        <div className="App">

            <h2><strong>Update Items</strong></h2>
            
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
