module.exports = function (server) {

	var data = [
	{
		"id": "558a751aea1e36af6565c3c1",
		"address": "958 Vandervoort Place, Ola, Virgin Islands, 4915"
	},
	{
		"id": "558a751acf7fa8f18d73a308",
		"address": "988 Overbaugh Place, Olney, Tennessee, 5725"
	},
	{
		"id": "558a751a3f30758672fcf7c6",
		"address": "887 Applegate Court, Campo, Ohio, 7070"
	},
	{
		"id": "558a751a6cb6c6b60460e337",
		"address": "958 Harbor Lane, Callaghan, South Dakota, 4360"
	},
	{
		"id": "558a751ace06ff2e46b1cc4f",
		"address": "112 Colonial Court, Guilford, Montana, 2948"
	},
	{
		"id": "558a751a7f4a321fc5eceaed",
		"address": "670 King Street, Defiance, Nevada, 2932"
	},
	{
		"id": "558a751a4c5e3b2c4e37790c",
		"address": "634 Meserole Avenue, Sperryville, Georgia, 3850"
	},
	{
		"id": "558a751a79d9a5f4b7ca1adb",
		"address": "444 Dearborn Court, Enlow, Indiana, 4305"
	},
	{
		"id": "558a751a2ef49386daf6168d",
		"address": "316 Kingsland Avenue, Foxworth, New Hampshire, 7121"
	},
	{
		"id": "558a751a77547013482a0e2c",
		"address": "653 Oak Street, Florence, Virginia, 3533"
	},
	{
		"id": "558a751acbecebe1832c50bd",
		"address": "249 Halleck Street, Yardville, Hawaii, 7252"
	},
	{
		"id": "558a751a48539d234683b74e",
		"address": "330 Prescott Place, Gambrills, Pennsylvania, 2645"
	},
	{
		"id": "558a751aa8dd1ff95cd7acc1",
		"address": "500 Lorraine Street, Sheatown, Connecticut, 2233"
	},
	{
		"id": "558a751a0a5741f42f775416",
		"address": "571 Ford Street, Blackgum, West Virginia, 5295"
	},
	{
		"id": "558a751a1b5279a1ccc82c81",
		"address": "921 Stuyvesant Avenue, Temperanceville, Kentucky, 2769"
	},
	{
		"id": "558a751a7ebce1db76fa6b72",
		"address": "634 Wythe Avenue, Eastmont, Texas, 4440"
	}
	]

	function findLocationById(id) {
		var location = data.find({'id':id});
		res.send(location);
		res.next();
	}

	function findAllLocations(addressPart){
		console.log("addressPart = "+ addressPart);
		if(!!addressPart){
			return data.filter(function(location){
				return location.address.match(new RegExp(addressPart, 'i'));
			});
		}
		return data;
	}

	server.get('/locations/:id', function (req, res, next) {
		var requestedId = req.params.id;
		
		location = findLocationById(requestedId);
		
		res.send(location);
		res.next();
	});

	server.get('/locations/', function (req, res, next) {
		var addressPart = req.params.searchTerm;
		console.log("search term = "+ addressPart);

		res.send(findAllLocations(addressPart));
		res.next();
	});
};