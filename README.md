## Getting Started

 1. First, copy the default config file and update the values inside:

     `cp config/default.example.json config/default.json`
  
 2. Update `PORT` in `.env` file

 3. Copy the default TypeORM config file and update the values inside:

     `cp ormconfig.example.json ormconfig.json`

 4. Install dependencies:

     `npm install`

 5. Run the project in dev mode:

     `npm run start:dev`
  
 6. By default, project will be running on `http://localhost:5000/`

# Description
The goal of this task is to build a farm management application. The system consists of
two functional segments.
1. Back-end REST API
2. Farm management UI
The application will create farms, add buildings with farm units, and feed those farm
units.

# Routes + Back-end

#### Create farm
- The route should accept only the name of the farm.
- NOTE: The name should be unique.
#### List farms
- List existing farms
#### Create a farm building
- The route should accept
○ Farm id, building name, farm unit name.
- Farm feeding interval is always 60 seconds.
○ The Farm unit will have random health between 50 and 100 health
points and each farm unit feeding interval is 10 seconds.
#### List farm building
- For farm id, return a list of available buildings, with their name, farm unity type,
and number of farm units

#### Add a farm unit to the farm building
- This API route should add an existing farm unit type to the farm building id.
#### List farm building farm unit
- For a farm building id, return all farm units with information about their health
and if they are alive/dead.
#### Feed farm unit
- API route to feed a specific farm unit id. Feed will always add one health to the
farm unit. Farm units can not be fed more than once every 5 seconds

### Farm unit feeding behavior
When a farm unit is added to the farm building, its feeding countdown starts. Every
time its feeding countdown is reached, it will lose 1 health point. If the farm unit
reaches 0 health, it is dead.
When a farm unit is fed by a farm building, it will always recharge half of the missing
health.
Every time a farm unit is fed, its feeding countdown will reset.

**Note: Only way to fully heal a farm unit is to feed it manually.**
