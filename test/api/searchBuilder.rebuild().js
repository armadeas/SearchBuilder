describe('searchBuilder - API - searchBuilder.rebuild()', function() {
	let table;

	dt.libs({
		js: ['jquery', 'datatables', 'searchbuilder', 'colreorder'],
		css: ['datatables', 'searchbuilder', 'colreorder']
	});

	describe('Check the defaults', function() {
		dt.html('basic');
		it('Exists and is a function', function() {
			table = $('#example').DataTable({
				dom: 'Qlfrtip'
			});
			expect(typeof table.searchBuilder.rebuild).toBe('function');
		});
		it('Getter returns data source property', function() {
			expect(table.searchBuilder.rebuild() instanceof $.fn.dataTable.Api).toBe(true);
		});
	});

	describe('Functional tests', function() {
		dt.html('basic');
		it('No search present', function() {
			table = $('#example').DataTable({
				dom: 'Qlfrtip'
			});

			table.searchBuilder.rebuild({});

			expect($('.dtsb-criteria').length).toBe(0);
			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});
		// DD-1598 is dataIdx needed
		it('Partial search', function() {
			table.searchBuilder.rebuild({ criteria: [{ data: 'Office', dataIdx: '2', value: [] }], logic: 'AND' });

			expect($('.dtsb-criteria').length).toBe(1);
			expect($('.dtsb-data option:selected').text()).toBe('Office');
			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});
		it('Full search', function() {
			table.searchBuilder.rebuild({
				criteria: [{ condition: '=', data: 'Office', dataIdx: '2', value: ['San Francisco'] }],
				logic: 'AND'
			});

			expect($('.dtsb-criteria').length).toBe(1);
			expect($('.dtsb-data option:selected').text()).toBe('Office');
			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Ashton Cox');
		});
		it('Second condition', function() {
			table.searchBuilder.rebuild({
				criteria: [
					{ condition: '=', data: 'Office', dataIdx: '2', value: ['San Francisco'] },
					{ condition: '>', data: 'Age', dataIdx: '3', value: [60] }
				],
				logic: 'AND'
			});

			expect($('.dtsb-criteria').length).toBe(2);
			expect($('.dtsb-data:eq(0) option:selected').text()).toBe('Office');
			expect($('.dtsb-data:eq(1) option:selected').text()).toBe('Age');
			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Ashton Cox');
			expect($('tbody tr').length).toBe(2);
		});

		dt.html('basic');
		it('ColReorder', function() {
			table = $('#example').DataTable({
				dom: 'Qlfrtip',
				colReorder: true
			});

			table.searchBuilder.rebuild({
				criteria: [
					{ condition: '=', data: 'Office', dataIdx: '2', value: ['San Francisco'] },
					{ condition: '>', data: 'Age', dataIdx: '3', value: [60] }
				],
				logic: 'AND'
			});

			table.colReorder.move(3, 0);

			expect($('.dtsb-criteria').length).toBe(2);
			expect($('.dtsb-data:eq(0) option:selected').text()).toBe('Office');
			expect($('.dtsb-data:eq(1) option:selected').text()).toBe('Age');
			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('66');
			expect($('tbody tr').length).toBe(2);
		});
	});
});
