exports.seed = function(knex) {
	//

	return knex('users').insert([
		{ username: 'admin2', password: 'admin2' },
		{ username: 'test2', password: 'test2' }
	]);
};
