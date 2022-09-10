import axios from "axios";
import { useEffect, useState } from "react"

export const MoviePublishToggle = ({ id, published }) => {

    const [toggle, setToggle] = useState(false);
    const [spin, setSpin] = useState(false);

    useEffect(() => {
        setToggle(published === 1)
    }, [published])

    const handleToggle = () => {
        setSpin(true);
        axios.post(route('movie.togglePublishedState', [id]))
            .then(response => {
                setSpin(false);
                setToggle(!toggle)
            })
            .catch(error => {
                setSpin(false)
            })
    }

    return (
        <>
            {
                spin ?
                    <span className="radial-progress animate-spin" style={{ "--value": 70, "--size": "2rem", "--thickness": "2px" }}></span>
                    :
                    <input type="checkbox" className="toggle" checked={toggle} onClick={handleToggle} />
            }
        </>
    )
}
