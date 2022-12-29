import React, {useState} from 'react';
import { ListGroup } from "react-bootstrap";
import { BsTrash, BsPlus, BsDash } from "react-icons/bs";
import "./Lists.css";

function ListsView(props){

  console.log(props)
  let getBookLists = localStorage.getItem('addToCart');
  getBookLists = JSON.parse(getBookLists);
  const orgPrice = props.price;
  // const [data, setData] = useState(getBookLists);
  const [count, setCount] = useState(props.count);
  let [subTotal, setTotal] = useState(props.price);
  const removeBook = (e) => {
    let parentId = e.target.parentNode.getAttribute("id");
    console.log(e.target.parentNode)
    console.log(parentId)
    document.getElementById(parentId).style.display = "none";
    const newList = getBookLists.filter((item) => item.title !== props.title);
    localStorage.setItem('addToCart', JSON.stringify(newList));
    reduceBookCount();
  }

  const addBookCount = () => {
    let bookCount = count + 1;
    setCount(bookCount);
    subTotal += parseInt(orgPrice);
    setTotal(subTotal);

    let total = 0;
    const newState = getBookLists.map(obj => {
      console.log(obj)
      if (obj.title === props.title) {
        total += subTotal;
        return {...obj, count: bookCount, subTotal: subTotal};
      }else{
        total += obj.subTotal;
        return {...obj}
      }
    });
    document.getElementById("totalVal").innerHTML = total + " K";
    localStorage.setItem('addToCart', JSON.stringify(newState));
  }

  const reduceBookCount = () => {
    let bookCount = count - 1;
    setCount(bookCount);
    console.log(subTotal)
    subTotal -= parseInt(orgPrice);
    console.log(subTotal)
    setTotal(subTotal);

    let total = 0;
    const newState = getBookLists.map(obj => {
      console.log(obj)
      if (obj.title === props.title) {
        total += subTotal;
        return {...obj, count: bookCount, subTotal: subTotal};
      }else{
        total += obj.subTotal;
        return {...obj}
      }
    });
    document.getElementById("totalVal").innerHTML = total + " K";
    localStorage.setItem('addToCart', JSON.stringify(newState));
  }

  return (
      <ListGroup.Item id={"main"+ (props.num + 1)}>
        <span className='addNum'>{props.num + 1}</span>
        <label className='addTitle'>{props.title} </label>
        <label className='price'>
          <span>{subTotal}</span>
          <span><BsPlus onClick={(() => addBookCount())} /> {count} <BsDash onClick={(() => reduceBookCount())}/> </span>
        </label>
        <BsTrash onClick={((e) => removeBook(e))} className="trash"/>
      </ListGroup.Item>
  );
}

export default ListsView;
