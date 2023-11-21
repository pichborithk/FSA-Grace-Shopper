import { Link } from 'react-router-dom'
import './footer.css'

export default function Footer() {
  return (
    <div className="navLinkAll">
      <div className="sepBottomNav">
        <div className="footerNav">
          <Link className=" firstFootNav footerLink" to={'/'}>
            Privacy Policy
          </Link>
          <Link className="footerLink" to={'/'}>
            Terms of Use
          </Link>
          <Link className="footerLink" to={'/'}>
            Sales and Refunds
          </Link>

          <Link className="footerLink" to={'/'}>
            Legal
          </Link>
          <Link className="footerLink" to="/">
            Site Map
          </Link>
        </div>
      </div>
    </div>
  )
}
