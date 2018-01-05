// Load jQuery and UIkit
import $ from 'jquery'; 
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons';
UIkit.use(Icons);

// React
import React from 'react';
import ReactDOM from 'react-dom';

// React router
import {
	Router,
	Route
} from 'react-router'
import { Link } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
const history = createBrowserHistory()

// Stripe
import {StripeProvider} from 'react-stripe-elements';

// Pages
import Dashboard from './Pages/Dashboard'
import Terms from './Pages/Terms'
import Cart from './Pages/Cart'

class App extends React.Component
{
	render()
	{
		return (
			<StripeProvider apiKey="pk_test_12345">{/* TODO */}
				<div>
					<div className="uk-background-secondary uk-margin" style={{width: "100%"}}>
						<img src="/images/logo.png" alt="Makerpay.se logo" style={{maxWidth: "250px", padding: "10px", marginLeft: "100px"}} />
					</div>

					<div className="uk-container uk-margin-top uk-margin-bottom">
						<Route exact path="/" component={Dashboard} />
						<Route exact path="/villkor" component={Terms} />
						<Route exact path="/pay/:token" component={Cart} />
					</div>

					<div>
						<footer className="uk-padding-remove-horizontal">
							<div className="uk-dark uk-background-secondary " style={{padding: "10px", paddingLeft: "110px", paddingTop: "15px"}}>
								<p className="uk-margin-remove-bottom">Makerpay.se är ett betalflöde utvecklat för Stockholm Makerspace. Copyright &copy; 2017 Stockholm Makerspace</p>

								<nav className="uk-navbar-container uk-navbar-transparent" uk-navbar style={{marginLeft: "-15px", marginBottom: "-25px", marginTop: "-20px"}}>
									<div className="uk-navbar-left2">
										<ul className="uk-navbar-nav">
											<li><Link to="/">Om Makerpay</Link></li>
											<li><Link to="/villkor">Användarvillkor</Link></li>
										</ul>
									</div>
								</nav>
							</div>
						</footer>
					</div>
				</div>
			</StripeProvider>
		);
	}
}

ReactDOM.render((
	<Router history={history}>
		<Route path="/" component={App}/>
	</Router>
), document.getElementById("app"));