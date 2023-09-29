# Copyright (c) 2023, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

import frappe


def execute(filters={}):
	columns, data = get_columns(), get_data(filters)
	return columns, data

def get_columns():
	return [
		{
			"fieldname":"customer",
			"label":"Customer",
			"fieldtype":"Link",
			"options":"Customer",
		},
		{
			"fieldname":"customer_name",
			"label":"Customer Name",
			"fieldtype":"Data",
		},
		{
			"fieldname":"territory",
			"label":"Territory",
			"fieldtype":"Link",
			"options":"Territory",
		},
		{
			"fieldname":"customer_group",
			"label":"Customer Group",
			"fieldtype":"Link",
			"options":"Customer Group",
		},
	]

def get_data(filters={}):
	conditions = ""
	if(filters.get("customer_group")):
		conditions = f""" And `tabCustomer`.customer_group = "{filters.get("customer_group")}" """
	data = frappe.db.sql(f"""SELECT
				`tabCustomer`.name as "customer",
				`tabCustomer`.customer_name as "customer_name",
				`tabCustomer`.territory as "territory",
				`tabCustomer`.customer_group as "customer_group"
			FROM
				`tabCustomer`
			WHERE
				not exists(select name from `tabSales Invoice` where `tabCustomer`.name = `tabSales Invoice`.customer and `tabSales Invoice`.docstatus=1 limit 1)
				and not exists(select name from `tabSales Order` where `tabCustomer`.name = `tabSales Order`.customer and `tabSales Order`.docstatus=1 limit 1)
		      	{conditions}""")
	return data
