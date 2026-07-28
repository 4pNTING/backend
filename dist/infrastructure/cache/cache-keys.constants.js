"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheKeys = void 0;
function queryToCacheKey(query) {
    const parts = [];
    if (query.paginate?.page || query.paginate?.limit) {
        parts.push(`p${query.paginate.page ?? 1}_l${query.paginate.limit ?? 10}`);
    }
    if (query.search?.q) {
        parts.push(`q:${query.search.q}`);
    }
    if (query.isActive !== undefined) {
        parts.push(`a:${query.isActive}`);
    }
    if (query.sortField) {
        parts.push(`sf:${query.sortField}_sd:${query.sortDirection ?? 'DESC'}`);
    }
    return parts.length > 0 ? parts.join('|') : 'default';
}
exports.CacheKeys = {
    CURRENCY_LIST: 'currency:list',
    CURRENCY_LIST_QUERY: (query) => `currency:list:${queryToCacheKey(query)}`,
    CURRENCY_BY_ID: (id) => `currency:id:${id}`,
    CURRENCY_PATTERN: 'currency:*',
    CURRENCY_LIST_PATTERN: 'currency:list:*',
    CATEGORY_LIST: 'category:list',
    CATEGORY_LIST_QUERY: (query) => `category:list:${queryToCacheKey(query)}`,
    CATEGORY_BY_ID: (id) => `category:id:${id}`,
    CATEGORY_PATTERN: 'category:*',
    CATEGORY_LIST_PATTERN: 'category:list:*',
    ZONE_LIST: 'zone:list',
    ZONE_LIST_QUERY: (query) => `zone:list:${queryToCacheKey(query)}`,
    ZONE_BY_ID: (id) => `zone:id:${id}`,
    ZONE_PATTERN: 'zone:*',
    ZONE_LIST_PATTERN: 'zone:list:*',
    TABLE_LIST: 'table:list',
    TABLE_LIST_QUERY: (query) => `table:list:${queryToCacheKey(query)}`,
    TABLE_BY_ID: (id) => `table:id:${id}`,
    TABLE_BY_ZONE: (zoneId) => `table:zone:${zoneId}`,
    TABLE_PATTERN: 'table:*',
    TABLE_LIST_PATTERN: 'table:list:*',
    MENU_ITEM_LIST: 'menu_item:list',
    MENU_ITEM_LIST_QUERY: (query) => `menu_item:list:${queryToCacheKey(query)}`,
    MENU_ITEM_BY_ID: (id) => `menu_item:id:${id}`,
    MENU_ITEM_BY_CATEGORY: (categoryId) => `menu_item:category:${categoryId}`,
    MENU_ITEM_PATTERN: 'menu_item:*',
    MENU_ITEM_LIST_PATTERN: 'menu_item:list:*',
    MENU_OPTION_BY_ITEM: (menuItemId) => `menu_option:item:${menuItemId}`,
    MENU_OPTION_BY_ID: (id) => `menu_option:id:${id}`,
    MENU_OPTION_PATTERN: 'menu_option:*',
    ORDER_LIST: 'order:list',
    ORDER_LIST_QUERY: (query) => `order:list:${queryToCacheKey(query)}`,
    ORDER_BY_ID: (id) => `order:id:${id}`,
    ORDER_BY_TABLE: (tableId) => `order:table:${tableId}`,
    ORDER_PATTERN: 'order:*',
    ORDER_LIST_PATTERN: 'order:list:*',
    PAYMENT_BY_ORDER: (orderId) => `payment:order:${orderId}`,
    PAYMENT_BY_ID: (id) => `payment:id:${id}`,
    PAYMENT_PATTERN: 'payment:*',
    CUSTOMER_LIST: 'customer:list',
    CUSTOMER_LIST_QUERY: (query) => `customer:list:${queryToCacheKey(query)}`,
    CUSTOMER_BY_ID: (id) => `customer:id:${id}`,
    CUSTOMER_PATTERN: 'customer:*',
    CUSTOMER_LIST_PATTERN: 'customer:list:*',
};
//# sourceMappingURL=cache-keys.constants.js.map