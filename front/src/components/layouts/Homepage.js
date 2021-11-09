import React, {Fragment, useEffect, useState} from "react";

import '../../App.css'
import MetaData from "./MetaData";
import Loader from "./Loader";
import Product from "../product/Product";
import {useDispatch,useSelector} from "react-redux";
import {getProducts} from "../../actions/productAction";
import {useAlert} from "react-alert";
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

const {createSliderWithTooltip} = Slider;
const Range = createSliderWithTooltip(Slider.Range);



const Homepage = ({match}) =>{

    const [price, setPrice] = useState([1,10000]);

    const dispatch = useDispatch();

    const [category,setCategory] = useState('')

    const [rating, setRating] = useState(0);

    const categories = ['Smartfony',
        'Laptopy',
        'Akcesoria',
        'Słuchawki',
        'Klawiatury',
        'Myszki',
        'Huby',



    ]

    const alert= useAlert();

    const {loading,products,error,productsCount} = useSelector(state=> state.products);

    const keyword = match.params.keyword;

    useEffect(()=>{
        if(error){
            alert.error(error);
        }
    dispatch(getProducts(keyword,price,category,rating));

    },[dispatch,error,keyword,price,category,rating])
    return(
        <Fragment>
            {loading? <Loader/> :(
                <Fragment>

                    <MetaData title={'Kupuj produkty online'}/>

                    <section id="products" className="container-xxl mt-5">
                        <div className="row">
                            {keyword?(
                                <Fragment>
                                    <div className="col-6 col-md-3 mt-5 mb-5">
                                        <div className="px-5">
                                            <Range
                                                marks={{
                                                    1: `1zł`,
                                                    10000: `10000zł`
                                                }}
                                                min={1}
                                                max={10000}
                                                defaultValue={[1, 10000]}
                                                tipFormatter={value => `${value}zł`}
                                                tipProps={{
                                                    placement: "left",
                                                    visible: true
                                                }}
                                                value={price}
                                                onChange={price => setPrice(price)}
                                            />
                                         <hr className="my-5"/>
                                            <div className="mt-5">
                                            <div className="mb-3">Kategorie</div>
                                                <ul className="pl-0">
                                                    {categories.map(category =>(
                                                        <li
                                                        style= {{cursor:'pointer',listStyleType:'none'}}
                                                        key = {category}
                                                        onClick={() => setCategory(category)}
                                                        >

                                                            {category}


                                                        </li>


                                                        ))}


                                                </ul>
                                            </div>


                                            <hr className="my-5"/>
                                            <div className="mt-5">
                                                <div className="mb-3">Ocena</div>
                                                <ul className="pl-0">
                                                    {[1,2,3,4,5].map(star =>(
                                                        <li
                                                            style= {{cursor:'pointer',listStyleType:'none'}}
                                                            key = {category}
                                                            onClick={() => setRating(star)}
                                                        >

                                                            <div className="rating-outer">
                                                                <div className="rating-inner"
                                                                style={{width:`${star * 20}%`}}
                                                                >





                                                                </div>
                                                            </div>


                                                        </li>


                                                    ))}


                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                        <div className="col-6 col-md-9">
                                            <div className="row">
                                                {products && products.map(product =>(
                                                <Product key={product._id} product={product} col={4}/>
                                                ))}
                                            </div>
                                        </div>

                                </Fragment>
                            ):(

                                products && products.map(product =>(
                                    <Product key={product._id} product={product} col={3}/>
                                ))
                            )}


                        </div>
                    </section>




                </Fragment>



                )}






        </Fragment>
    )


}

export default Homepage;
