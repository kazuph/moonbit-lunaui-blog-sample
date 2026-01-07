///| D1 Database Access Layer using mizchi/cloudflare package
///| Replaces custom FFI with official package types

// =============================================================================
// D1 Database Access - Using mizchi/cloudflare package
// =============================================================================

// Note: D1 database is passed via env binding in Cloudflare Workers
// globalThis.__D1_DB is set by the worker entry point (src/worker.ts)

///| Get D1 database from global context
fn get_db() -> @cloudflare.D1Database {
  let db_js : @core.Any = get_global_db()
  @core.identity(db_js)
}

///| Get global D1 database reference (minimal FFI - required for binding access)
extern "js" fn get_global_db() -> @core.Any =
  #| () => {
  #|   const db = globalThis.__D1_DB;
  #|   if (!db) throw new Error('D1 database not initialized');
  #|   return db;
  #| }

// =============================================================================
// Blog Post CRUD Operations - Using @cloudflare.D1Database API
// =============================================================================

///| Get all published blog posts
pub async fn db_get_published_posts() -> @core.Any {
  let db = get_db()
  let result = db
    .prepare("SELECT * FROM posts WHERE status = 'published' ORDER BY published_at DESC")
    .all()
  result.results_raw()
}

///| Get all posts (for admin)
pub async fn db_get_all_posts() -> @core.Any {
  let db = get_db()
  let result = db
    .prepare("SELECT * FROM posts ORDER BY updated_at DESC")
    .all()
  result.results_raw()
}

///| Get a single blog post by slug
pub async fn db_get_post_by_slug(slug : String) -> @core.Any {
  let db = get_db()
  let row = db
    .prepare("SELECT * FROM posts WHERE slug = ?")
    .bind1(@core.any(slug))
    .first()
  match row {
    Some(r) => r
    None => @core.null()
  }
}

///| Get a single blog post by id
pub async fn db_get_post_by_id(id : String) -> @core.Any {
  let db = get_db()
  let row = db
    .prepare("SELECT * FROM posts WHERE id = ?")
    .bind1(@core.any(id))
    .first()
  match row {
    Some(r) => r
    None => @core.null()
  }
}

///| Create a new post
pub async fn db_create_post(
  title : String,
  slug : String,
  content : String,
  content_html : String,
  excerpt : String,
  status : String
) -> @core.Any {
  let db = get_db()
  let published_at = if status == "published" {
    get_timestamp()
  } else {
    ""
  }
  let published_at_val : @core.Any = if published_at == "" {
    @core.null()
  } else {
    @core.any(published_at)
  }
  let row = db
    .prepare(
      "INSERT INTO posts (title, slug, content, content_html, excerpt, status, published_at) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *",
    )
    .bind([
      @core.any(title),
      @core.any(slug),
      @core.any(content),
      @core.any(content_html),
      @core.any(excerpt),
      @core.any(status),
      published_at_val,
    ])
    .first()
  match row {
    Some(r) => r
    None => @core.null()
  }
}

///| Update an existing post
pub async fn db_update_post(
  id : String,
  title : String,
  slug : String,
  content : String,
  content_html : String,
  excerpt : String,
  status : String
) -> @core.Any {
  let db = get_db()
  let row = db
    .prepare(
      "UPDATE posts SET title = ?, slug = ?, content = ?, content_html = ?, excerpt = ?, status = ? WHERE id = ? RETURNING *",
    )
    .bind([
      @core.any(title),
      @core.any(slug),
      @core.any(content),
      @core.any(content_html),
      @core.any(excerpt),
      @core.any(status),
      @core.any(id),
    ])
    .first()
  match row {
    Some(r) => r
    None => @core.null()
  }
}

///| Delete a post
pub async fn db_delete_post(id : String) -> @cloudflare.D1Result {
  let db = get_db()
  db.prepare("DELETE FROM posts WHERE id = ?").bind1(@core.any(id)).run()
}

// =============================================================================
// Data Access Helpers - MoonBit Native Implementation
// =============================================================================

///| Extract string field from JS object (MoonBit native)
pub fn get_str(obj : @core.Any, field : String) -> String {
  // Guard against null/undefined obj
  if @core.is_nullish(obj) {
    return ""
  }
  let val = obj._get(field)
  if @core.is_nullish(val) {
    ""
  } else {
    val.to_string()
  }
}

///| Extract int field from JS object (MoonBit native)
pub fn get_int(obj : @core.Any, field : String) -> Int {
  // Guard against null/undefined obj
  if @core.is_nullish(obj) {
    return 0
  }
  let val = obj._get(field)
  if @core.is_nullish(val) {
    0
  } else {
    // Use JS Number() via cast
    val.cast()
  }
}

///| Check if JS value is null/undefined (MoonBit native)
pub fn is_null(obj : @core.Any) -> Bool {
  @core.is_nullish(obj)
}

///| Get array length (MoonBit native)
pub fn array_len(arr : @core.Any) -> Int {
  if @core.is_nullish(arr) {
    0
  } else {
    let len = arr._get("length")
    if @core.is_nullish(len) {
      0
    } else {
      len.cast()
    }
  }
}

///| Get array element (MoonBit native)
pub fn array_get(arr : @core.Any, idx : Int) -> @core.Any {
  arr._get_by_index(idx)
}

///| Get current timestamp (minimal FFI - Date API is JS-only)
pub extern "js" fn get_timestamp() -> String =
  #| () => new Date().toISOString()

// =============================================================================
// Post Data Structure Helpers
// =============================================================================

///| Post record structure
pub struct Post {
  id : String
  title : String
  slug : String
  content : String
  content_html : String
  excerpt : String
  status : String
  published_at : String
  created_at : String
  updated_at : String
}

///| Convert JS object to Post
pub fn post_from_js(obj : @core.Any) -> Post {
  {
    id: get_str(obj, "id"),
    title: get_str(obj, "title"),
    slug: get_str(obj, "slug"),
    content: get_str(obj, "content"),
    content_html: get_str(obj, "content_html"),
    excerpt: get_str(obj, "excerpt"),
    status: get_str(obj, "status"),
    published_at: get_str(obj, "published_at"),
    created_at: get_str(obj, "created_at"),
    updated_at: get_str(obj, "updated_at"),
  }
}
