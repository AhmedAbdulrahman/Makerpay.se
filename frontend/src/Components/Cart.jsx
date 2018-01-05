import React from 'react';

module.exports = class About extends React.Component
{
	render()
	{
		return (
			<div>
				<table border="1">
					<thead>
						<tr>
							<th width="300">Produkt</th>
							<th width="100">Pris</th>
							<th width="100">Antal</th>
							<th width="100">Totalt</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Medlemskap 2017-01-02 - 2018-01-01</td>
							<td className="price">200 SEK</td>
							<td className="amount">1 st</td>
							<td className="total">200 SEK</td>
						</tr>
						<tr>
							<td>Labbmånad</td>
							<td className="price">300 SEK</td>
							<td className="amount">6 st</td>
							<td className="total">1 800 SEK</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}