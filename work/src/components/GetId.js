import React, { useEffect, useState } from "react"
import { Link, useParams, withRouter } from "react-router-dom";
import {useAxios} from "../hooks/useAxios.js"
;

const GetId = () => {
    const {id} = useParams()

return id
}

export default withRouter(GetId)