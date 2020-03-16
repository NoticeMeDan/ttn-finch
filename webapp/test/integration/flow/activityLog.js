describe('Test activity log', () => {
	beforeEach(() => {
		cy.visit('/flow/1')
		cy.server()

		cy.route('GET', '/api/log/1/*/*/0', {
			totalPages: 2,
			pageData: [
				{
					time: 1584375912,
					message: 'Heyo 1'
				},
				{
					time: 1584375913,
					message: 'Heyo 2'
				}
			]
		})

		cy.route('GET', '/api/log/1/*/*/1', {
			totalPages: 2,
			pageData: [
				{
					time: 1584375914,
					message: 'Heyo 3'
				},
				{
					time: 1584375915,
					message: 'Heyo 4'
				}
			]
		})
	})

	it('Paginates correctly', () => {
		cy.contains('16/03/2020 17:25:12')
		cy.contains('Heyo 1')
		cy.contains('16/03/2020 17:25:13')
		cy.contains('Heyo 2')

		cy.get('button[title="Next page"]').click()

		cy.contains('16/03/2020 17:25:14')
		cy.contains('Heyo 3')
		cy.contains('16/03/2020 17:25:15')
		cy.contains('Heyo 4')
	})
})
