/**
 * Centralized Cache Key Management
 * 
 * รวม cache key patterns ไว้ที่เดียว เพื่อ:
 * 1. ป้องกัน key ซ้ำ/สะกดผิด
 * 2. ง่ายต่อการค้นหาว่า key ไหนถูกใช้ที่ไหน
 * 3. ง่ายต่อการ invalidate ทั้งกลุ่ม
 */

/** Generate a deterministic cache key fragment from QueryProps for list queries */
function queryToCacheKey(query: { paginate?: { page?: number; limit?: number }; search?: { q?: string }; isActive?: boolean | string; sortField?: string; sortDirection?: string; categoryId?: string; zoneId?: string }): string {
  const parts: string[] = [];
  if (query.paginate?.page || query.paginate?.limit) {
    parts.push(`p${query.paginate.page ?? 1}_l${query.paginate.limit ?? 10}`);
  }
  if (query.search?.q) {
    parts.push(`q:${query.search.q}`);
  }
  if (query.isActive !== undefined) {
    parts.push(`a:${query.isActive}`);
  }
  if (query.categoryId) {
    parts.push(`category:${query.categoryId}`);
  }
  if (query.zoneId) {
    parts.push(`zone:${query.zoneId}`);
  }
  if (query.sortField) {
    parts.push(`sf:${query.sortField}_sd:${query.sortDirection ?? 'DESC'}`);
  }
  return parts.length > 0 ? parts.join('|') : 'default';
}

export const CacheKeys = {
  // ─── Currency ───────────────────────────────────────
  CURRENCY_LIST: 'currency:list',
  CURRENCY_LIST_QUERY: (query: any) => `currency:list:${queryToCacheKey(query)}`,
  CURRENCY_BY_ID: (id: string) => `currency:id:${id}`,
  CURRENCY_PATTERN: 'currency:*',
  CURRENCY_LIST_PATTERN: 'currency:list:*',

  // ─── Category ───────────────────────────────────────
  CATEGORY_LIST: 'category:list',
  CATEGORY_LIST_QUERY: (query: any) => `category:list:${queryToCacheKey(query)}`,
  CATEGORY_BY_ID: (id: string) => `category:id:${id}`,
  CATEGORY_PATTERN: 'category:*',
  CATEGORY_LIST_PATTERN: 'category:list:*',

  // ─── Zone ────────────────────────────────────────────
  ZONE_LIST: 'zone:list',
  ZONE_LIST_QUERY: (query: any) => `zone:list:${queryToCacheKey(query)}`,
  ZONE_BY_ID: (id: string) => `zone:id:${id}`,
  ZONE_PATTERN: 'zone:*',
  ZONE_LIST_PATTERN: 'zone:list:*',

  // ─── Table ───────────────────────────────────────────
  TABLE_LIST: 'table:list',
  TABLE_LIST_QUERY: (query: any) => `table:list:${queryToCacheKey(query)}`,
  TABLE_BY_ID: (id: string) => `table:id:${id}`,
  TABLE_BY_ZONE: (zoneId: string) => `table:zone:${zoneId}`,
  TABLE_PATTERN: 'table:*',
  TABLE_LIST_PATTERN: 'table:list:*',

  // ─── Menu Item ───────────────────────────────────────
  MENU_ITEM_LIST: 'menu_item:list',
  MENU_ITEM_LIST_QUERY: (query: any) => `menu_item:list:${queryToCacheKey(query)}`,
  MENU_ITEM_BY_ID: (id: string) => `menu_item:id:${id}`,
  MENU_ITEM_BY_CATEGORY: (categoryId: string) => `menu_item:category:${categoryId}`,
  MENU_ITEM_PATTERN: 'menu_item:*',
  MENU_ITEM_LIST_PATTERN: 'menu_item:list:*',

  // ─── Menu Option ─────────────────────────────────────
  MENU_OPTION_BY_ITEM: (menuItemId: string) => `menu_option:item:${menuItemId}`,
  MENU_OPTION_BY_ID: (id: string) => `menu_option:id:${id}`,
  MENU_OPTION_PATTERN: 'menu_option:*',

  // ─── Order ───────────────────────────────────────────
  ORDER_LIST: 'order:list',
  ORDER_LIST_QUERY: (query: any) => `order:list:${queryToCacheKey(query)}`,
  ORDER_BY_ID: (id: string) => `order:id:${id}`,
  ORDER_BY_TABLE: (tableId: string) => `order:table:${tableId}`,
  ORDER_PATTERN: 'order:*',
  ORDER_LIST_PATTERN: 'order:list:*',

  // ─── Payment ─────────────────────────────────────────
  PAYMENT_BY_ORDER: (orderId: string) => `payment:order:${orderId}`,
  PAYMENT_BY_ID: (id: string) => `payment:id:${id}`,
  PAYMENT_PATTERN: 'payment:*',

  // ─── Customer ────────────────────────────────────────
  CUSTOMER_LIST: 'customer:list',
  CUSTOMER_LIST_QUERY: (query: any) => `customer:list:${queryToCacheKey(query)}`,
  CUSTOMER_BY_ID: (id: string) => `customer:id:${id}`,
  CUSTOMER_PATTERN: 'customer:*',
  CUSTOMER_LIST_PATTERN: 'customer:list:*',

  // ─── Attachment ──────────────────────────────────────
  ATTACHMENT_LIST: 'attachment:list',
  ATTACHMENT_LIST_QUERY: (query: any) => `attachment:list:${queryToCacheKey(query)}`,
  ATTACHMENT_BY_ID: (id: string) => `attachment:id:${id}`,
  ATTACHMENT_BY_OWNER: (ownerId: string, ownerType?: string) => `attachment:owner:${ownerId}:${ownerType ?? 'all'}`,
  ATTACHMENT_PATTERN: 'attachment:*',
  ATTACHMENT_LIST_PATTERN: 'attachment:list:*',
} as const;

