import React from "react";
import './WeekendSpecial.css';
import Weekend_Special from '../Assets/Weekend_Special';
import Item from '../Items/Item';
const WeekendSpecial = () => {
    return(
        <div className="weekendspecials">
            <h1>WEEKEND SPECIAL</h1>
            <hr />
            <div className="specials">
                {Weekend_Special.map((item,i)=>{
                    return<Item key={i} id ={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
                })}
            </div>
        </div>
    )
}
export default WeekendSpecial;