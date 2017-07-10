## 获取所有符合条件的商品的数量count值
SELECT
	COUNT(`on_sell_goods`.`id`) AS `count`
FROM
	(
		`on_sell_goods` AS `on_sell_goods`
		LEFT JOIN catalogs AS `FirstCatalog` ON `FirstCatalog`.id = `on_sell_goods`.FirstCatalogId
		AND `FirstCatalog`.`type` = "first"
		LEFT JOIN catalogs AS `SecondCatalog` ON `SecondCatalog`.id = `on_sell_goods`.SecondCatalogId
		AND `SecondCatalog`.`type` = "second"
		LEFT JOIN mall_qoas AS `QOA` ON `QOA`.GoodId = `on_sell_goods`.id
		LEFT JOIN warehouses AS `Warehouses` ON `Warehouses`.id = `on_sell_goods`.WarehouseId
	)
## WHERE
##	on_sell_goods.updatedAt >= '1970-01-01 00:00:00'