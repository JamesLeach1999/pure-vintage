import React from 'react'
import defaultImage from "../assets/shoes1.jpg";


const Welcome = () => {
    return (
        <>
            
            <div class="row header">
                <div class="col-2">
                    <h1>High quality clothing <br/> from your favorite brands</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br/> Molestias, magni dignissimos. Maxime ab architecto expedita.</p>
                    <a href="" class="btn">Explore now &#10132;</a>
                </div>
                <div class="col-2">
                    <img src={defaultImage} alt=""/>
                </div>
            </div>
            </>
    )
}

export default Welcome
