const { Link } = ReactRouterDOM

import { userService } from '../services/user.service.local.js'
import { CarPreview } from './CarPreview.jsx'

export function CarList({ cars, onRemoveCar }) {
	const user = userService.getLoggedinUser()

	function isOwner(car) {
		if (!user) return false
		if (!car.owner) return true
		return user.isAdmin || car.owner._id === user._id
	}

	return (
		<ul className="car-list">
			{cars.map(car => (
				<li key={car._id}>
					<CarPreview car={car} />
					<section>
						<button>
							<Link to={`/car/${car._id}`}>Details</Link>
						</button>
						{isOwner(car) && (
							<div>
								<button onClick={() => onRemoveCar(car._id)}>Remove Car</button>
								<button>
									<Link to={`/car/edit/${car._id}`}>Edit</Link>
								</button>
							</div>
						)}
					</section>
				</li>
			))}
		</ul>
	)
}
