import React from 'react';
import { Link } from 'react-router-dom'

module.exports = class Dashboard extends React.Component
{
	render()
	{
		return (
			<div>
				<h2>Om Makerpay.se</h2>

				<p>Makerpay.se är ett betalflöde utvecklat av och för Stockholm Makerspace. Tanken är att alla föreningens betalningar skall ske genom ett och samma system. På så vis underlättar vi administrationen för styrelsen och gör det enklare för våra medlemmar. I framtiden kommer alla föreningens betalningar gå via Makerpay.se, dvs medlemsavgifter, anmälningsavgifter till workshops, materialförsäljning till själkostnadspris, donationer etc.</p>

				<p>Läs våra <Link to="/villkor"><span uk-icon="icon: copy"></span>&nbsp;&nbsp;Användarvillkor</Link></p>

				<p>Har du några frågor? Tveka inte att kontakta oss på <a href="mailto:info@makerspace.se">info@makerspace.se</a> eller besöka <a href="https://www.makerspace.se/" target="_blank">www.makerspace.se</a></p>




				<br /><br /><br />
				<h3>Debug info</h3>
				<p>
					<strong>Commit hash:</strong> {__COMMIT_HASH__}<br />
					<strong>Build date:</strong> {__BUILD_DATE__}
				</p>

				<button className="uk-button uk-button-default"><Link to="/pay/145623452345235">Skapa testbetalning</Link></button>
			</div>
		);
	}
}