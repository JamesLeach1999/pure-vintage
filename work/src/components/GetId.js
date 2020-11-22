import React, { useEffect, useState } from "react"
import { Link, useParams, withRouter } from "react-router-dom";
import {useAxios} from "../hooks/useAxios.js"
;

const GetId = () => {
    const {id} = useParams()

return id
}

// const GetData = async (url) => {
//     const data = await useAxios(url)

//     return data
// }

export default withRouter(GetId)