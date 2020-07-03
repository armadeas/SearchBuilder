describe('searchBuilder - options - language.searchBuilder.value', function() {
	let table;

	dt.libs({
		js: ['jquery', 'datatables', 'searchbuilder'],
		css: ['datatables', 'searchbuilder']
	});

	describe('Functional tests', function() {
		dt.html('basic');
		it('Default', function() {
			table = $('#example').DataTable({
				dom: 'Qlfrtip'
			});

			$('.dtsb-add').click();
			expect($('.dtsb-condition option:selected').text()).toBe('Condition');
		});

		dt.html('basic');
		it('Modified', function() {
			table = $('#example').DataTable({
				dom: 'Qlfrtip',
				language: {
					searchBuilder: {
						condition: 'unit test'
					}
				}
			});

			$('.dtsb-add').click();
			expect($('.dtsb-condition option:selected').text()).toBe('unit test');
		});
	});
});
