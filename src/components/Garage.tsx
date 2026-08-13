import type { Vehicle } from '../App'

type GarageProps = {
    vehicles: Vehicle[]
    year: string
    make: string
    model: string
    vehicleMileage: string
    setYear: (value: string) => void
    setMake: (value: string) => void
    setModel: (value: string) => void
    setVehicleMileage: (value: string) => void
    addVehicle: (event: React.SubmitEvent<HTMLFormElement>) => void
}

function Garage({ 
    vehicles, 
    year,
    make,
    model,
    vehicleMileage,
    setYear, 
    setMake, 
    setModel, 
    setVehicleMileage,
    addVehicle

}: GarageProps) { 
    return (
        <div className="app">
            <h1>My Garage</h1>
            <p>Manage and view your vehicle's details</p>

            <section className="card">
                <form onSubmit={addVehicle}>
                    <p>Enter new vehicle?</p>
                    <input
                        placeholder="Year"
                        value={year}
                        onChange={(event) => setYear(event.target.value)}
                    />

                    <input
                        placeholder="Make"
                        value={make}
                        onChange={(event) => setMake(event.target.value)}
                    />

                    <input
                        placeholder="Model"
                        value={model}
                        onChange={(event) => setModel(event.target.value)}
                    />
                    
                    <input
                        placeholder="Mileage"
                        value={vehicleMileage}
                        onChange={(event) => setVehicleMileage(event.target.value)}
                    />

                    <button type="submit">Add Vehicle</button>
                </form>
            </section>
            <section className="card">
                <h2>Your Vehicles</h2>
                {vehicles.map((vehicle) => (
                    <div key={vehicle.id}>
                        <h2>
                            {vehicle.year} {vehicle.make} {vehicle.model}
                        </h2>
                        <p>{vehicle.mileage} miles</p>
                    </div>
                ))}    
            </section>
        </div>
    )
}

export default Garage
