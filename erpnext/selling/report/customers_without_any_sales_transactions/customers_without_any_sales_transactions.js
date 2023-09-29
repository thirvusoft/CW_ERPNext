// Copyright (c) 2023, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Customers Without Any Sales Transactions"] = {
	"filters": [
		{
			fieldname:"customer_group",
			label:"Customer Group",
			fieldtype:"Link",
			options:"Customer Group",
			default:"FRANCHISING"
		}
	]
};
