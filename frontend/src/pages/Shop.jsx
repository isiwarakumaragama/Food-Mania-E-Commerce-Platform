import React from "react";
import Hero from "../components/Hero/Hero";
import Popular from "../components/Popular/Popular";
import Offers from "../components/Offers/Offers";
import WeekendSpecial from "../components/WeekendSpecial/WeekendSpecial";
import NewsLetters from "../components/NewsLetter/NewsLetter";


const Shop =() => {
return(
    <div>
    <Hero/>
    <Popular/>
    <br/>
    <br/>
    <Offers />
    <WeekendSpecial />
    <NewsLetters />
    </div>
)

}
export default Shop;