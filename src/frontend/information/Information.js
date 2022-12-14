import NavBar from "../navbar/NavBar"
import './info.css';
import { Link } from "react-router-dom";
export default function Info() {
    return (
        <>
            <div>
                <NavBar />
            </div>
            <div className="infomain">
                <div className="warning">
                    <h1>Waring!</h1>
                    <p>Hello Visitor, <br />Rudhram saraswat from this side<br />I request you that please do not enter your private information (Account Number & Password) in this project because this project is connected with backend.</p>
                    <p>*All the information's which are entered by you will be store in my <u><a href="https://en.wikipedia.org/wiki/Database">Database</a></u>.</p>
                </div>
                <Link to={'./signin'}><button className="butt">Let's Go...</button></Link>
            </div>
        </>
    )
}