import './nav.css'
import rslogo from '../img/rslogo.png'
export default function NavBar(){
    return (
        <div className='mainnav'>
            <img className='mylogo' src={rslogo} alt="Rudhram.S" />
        </div>
    )
}