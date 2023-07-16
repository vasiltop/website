
import './Navbar.css';

function Navbar() {


    return (
    <nav>
        <div id="name-section-nav" className="nav-section"> 
            <h3>Vasil Topalovic</h3>
        </div>
        <div id="links-section-nav" className="nav-section"> 
            <a href="https://github.com/vasiltop">
                <i class="fa-brands fa-github">github</i>
            </a>
            
            <a href="https://www.linkedin.com/in/vasil-topalovic/">
                <i class="fa-brands fa-linkedin">linkedin</i>
            </a>
        </div>
    </nav>
    );
}


export default Navbar;