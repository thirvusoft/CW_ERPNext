// Copyright (c) 2016, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Item Variant Details"] = {
	"filters": [
		{
			fieldname:"company",
			label:"Company",
			fieldtype:"Link",
			options:"Company",
			default: frappe.defaults.get_user_permissions()['Company']?frappe.defaults.get_user_permissions()['Company'].filter(d=> d.is_default)[0].doc:'',
			reqd:1
		},
		{
			fieldname:"warehouse",
			label:"Warehouse",
			fieldtype:"Link",
			options:"Warehouse",
			"reqd": 1,
			"default": frappe.defaults.get_user_permissions()['Warehouse']?frappe.defaults.get_user_permissions()['Warehouse'].filter(d=> d.is_default)[0].doc:'',
			get_query: () => {
				let company = frappe.query_report.get_filter_value("company");

				return {
					filters: {
						"company":company
					}
				}
			}
		},
		{
			reqd: 1,
			default: "",
			options: "Item",
			label: __("Item"),
			fieldname: "item",
			fieldtype: "Link",
			get_query: () => {
				return {
					filters: { "has_variants": 1 }
				}
			}
		}
	]
}
