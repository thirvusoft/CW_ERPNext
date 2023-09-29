// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

frappe.query_reports["Sales Register"] = {
	"filters": [
		{
			"fieldname":"from_date",
			"label": __("From Date"),
			"fieldtype": "Date",
			"default": frappe.datetime.month_start(),
			"width": "80"
		},
		{
			"fieldname":"to_date",
			"label": __("To Date"),
			"fieldtype": "Date",
			"default": frappe.datetime.month_end()
		},
		{
			"fieldname":"customer",
			"label": __("Customer"),
			"fieldtype": "Link",
			"options": "Customer"
		},
		{
			"fieldname":"party_branch",
			"label": __("Party Branch"),
			"fieldtype": "Link",
			"options": "Branch"
		},
		{
			"fieldname":"company",
			"label": __("Company"),
			"fieldtype": "Link",
			"options": "Company",
			"reqd": 1,
			"default": frappe.defaults.get_user_default("Company")
		},
		{
			"fieldname": "company_gstin",
			"label": __("Company GSTIN"),
			"fieldtype": "Select"
		},
		{
			"fieldname":"mode_of_payment",
			"label": __("Mode of Payment"),
			"fieldtype": "Link",
			"options": "Mode of Payment"
		},
		{
			"fieldname":"owner",
			"label": __("Owner"),
			"fieldtype": "Link",
			"options": "User"
		},
		{
			"fieldname":"cost_center",
			"label": __("Cost Center"),
			"fieldtype": "Link",
			"options": "Cost Center"
		},
		{
			"fieldname":"warehouse",
			"label": __("Warehouse"),
			"fieldtype": "Link",
			"options": "Warehouse"
		},
		{
			"fieldname":"brand",
			"label": __("Brand"),
			"fieldtype": "Link",
			"options": "Brand"
		},
		{
			"fieldname":"item_group",
			"label": __("Item Group"),
			"fieldtype": "Link",
			"options": "Item Group"
		},
		{
			"fieldname":"sum_of_ig",
			"label": __("Item Group Wise"),
			"fieldtype": "Select",
			"options": ["Qty", "Amount"],
			"default":"Qty"
		}
	],
	onload: function (report) {
		let filters = report.get_values();
		if(frappe.query_report.report_name != "Sales Day Book"){
			frappe.query_report.toggle_filter_display("sum_of_ig", true) 
		}
		frappe.call({
			method: "erpnext.accounts.report.sales_register.sales_register.get_company_gstins",
			args: {
				company: filters.company
			},
			callback: function(r) {
				frappe.query_report.page.fields_dict.company_gstin.df.options = r.message;
				frappe.query_report.page.fields_dict.company_gstin.refresh();
			}
		});

		frappe.query_report.page.fields_dict.company.df.onchange = function(){
			frappe.call({
				method: "erpnext.regional.report.gstr_1.gstr_1.get_company_gstins",
				args: {
					company: frappe.query_report.page.fields_dict.company.get_value() 
				},
				callback: function(r) {
					frappe.query_report.page.fields_dict.company_gstin.df.options = r.message;
					frappe.query_report.page.fields_dict.company_gstin.refresh();
				}
			});
		}
	}
}
// setTimeout(()=>{
// 	frappe.query_report.page.fields_dict.company.df.onchange = function(){
// 		frappe.call({
// 			method: "erpnext.regional.report.gstr_1.gstr_1.get_company_gstins",
// 			args: {
// 				company: frappe.query_report.page.fields_dict.company.get_value() 
// 			},
// 			callback: function(r) {
// 				frappe.query_report.page.fields_dict.company_gstin.df.options = r.message;
// 				frappe.query_report.page.fields_dict.company_gstin.refresh();
// 			}
// 		});
// 	}
// }, 100)
erpnext.utils.add_dimensions("Sales Register", 7);
