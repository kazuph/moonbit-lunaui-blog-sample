///| Routes for Blog Admin
///| Implements SSR blog with Cloudflare D1 database

// =============================================================================
// Route Definitions
// =============================================================================

///|
pub fn routes() -> Array[@router.SolRoutes] {
  [
    @router.SolRoutes::WithMiddleware(
      middleware=[@mw.logger()],
      children=[
        // Layout wrapping all public pages
        @router.SolRoutes::Layout(segment="", layout=root_layout, children=[
          // Home page - blog post list
          @router.SolRoutes::Page(
            path="/",
            handler=@router.PageHandler(home_page),
            title="Blog",
            meta=[],
            revalidate=None,
            cache=None,
          ),
          // Individual blog post
          @router.SolRoutes::Page(
            path="/posts/:slug",
            handler=@router.PageHandler(post_detail),
            title="Blog Post",
            meta=[],
            revalidate=None,
            cache=None,
          ),
        ]),
        // Admin section (Basic Auth handled by Hono middleware in main.js)
        @router.SolRoutes::WithMiddleware(
          middleware=[@mw.security_headers_relaxed()],
          children=[
            @router.SolRoutes::Layout(segment="/admin", layout=admin_layout, children=[
              @router.SolRoutes::Page(
                path="/",
                handler=@router.PageHandler(admin_posts),
                title="Manage Posts",
                meta=[],
                revalidate=None,
                cache=None,
              ),
              @router.SolRoutes::Page(
                path="/posts/new",
                handler=@router.PageHandler(admin_new_post),
                title="New Post",
                meta=[],
                revalidate=None,
                cache=None,
              ),
              @router.SolRoutes::Page(
                path="/posts/:id/edit",
                handler=@router.PageHandler(admin_edit_post),
                title="Edit Post",
                meta=[],
                revalidate=None,
                cache=None,
              ),
            ]),
          ],
        ),
        // API endpoints (Basic Auth handled by Hono middleware in main.js)
        @router.SolRoutes::Post(
          path="/api/posts",
          handler=@router.ApiHandler(api_create_post),
        ),
        @router.SolRoutes::Post(
          path="/api/posts/:id",
          handler=@router.ApiHandler(api_update_post),
        ),
        @router.SolRoutes::Post(
          path="/api/posts/:id/delete",
          handler=@router.ApiHandler(api_delete_post),
        ),
      ],
    ),
  ]
}

// =============================================================================
// Layouts
// =============================================================================

///| Root layout for public pages
fn root_layout(
  _props : @router.PageProps,
  content : @server_dom.ServerNode,
) -> @server_dom.ServerNode raise Error {
  @server_dom.ServerNode::async_(async fn() {
    let inner = content.resolve()
    @luna.fragment([
      div(class="notice-banner", [
        text("このブログは MoonBit × Luna UI のテスト用です。記事の内容はAIが生成したサンプルです。"),
      ]),
      div(class="container", [
        nav(class="main-nav", [
          a(href="/", [strong([text("Blog")])]),
          span([text(" | ")]),
          a(href="/admin", [text("Admin")]),
        ]),
        div(class="content", [inner]),
      ]),
    ])
  })
}

///| Admin layout with sidebar
fn admin_layout(
  _props : @router.PageProps,
  content : @server_dom.ServerNode,
) -> @server_dom.ServerNode raise Error {
  @server_dom.ServerNode::async_(async fn() {
    let inner = content.resolve()
    @luna.fragment([
      div(class="admin-container", [
        nav(class="admin-sidebar", [
          h3([text("Admin")]),
          ul([
            li([a(href="/admin", [text("Posts")])]),
            li([a(href="/admin/posts/new", [text("New Post")])]),
            li([a(href="/", [text("View Blog")])]),
          ]),
        ]),
        div(class="admin-content", [inner]),
      ]),
    ])
  })
}

// =============================================================================
// Public Page Handlers
// =============================================================================

///| Home page - lists published posts
async fn home_page(_props : @router.PageProps) -> @server_dom.ServerNode {
  @server_dom.ServerNode::async_(async fn() {
    let posts = db_get_published_posts().wait()
    let len = array_len(posts)

    let post_items : Array[@luna.Node[Unit]] = []
    for i = 0; i < len; i = i + 1 {
      let post = array_get(posts, i)
      let slug = get_str(post, "slug")
      let title = get_str(post, "title")
      let excerpt = get_str(post, "excerpt")
      let published_at = get_str(post, "published_at")

      post_items.push(
        article(class="post-card", [
          h2([a(href="/posts/" + slug, [text(title)])]),
          p([text(excerpt)]),
          p(class="meta", [
            text("Published: " + published_at),
          ]),
        ])
      )
    }

    let content = if len == 0 {
      [
        h1([text("Blog Posts")]),
        p([text("No posts yet. "), a(href="/admin/posts/new", [text("Create one")])]),
      ]
    } else {
      [h1([text("Blog Posts")])] + post_items
    }

    @luna.fragment(content)
  })
}

///| Post detail page
async fn post_detail(props : @router.PageProps) -> @server_dom.ServerNode {
  @server_dom.ServerNode::async_(async fn() {
    let slug = props.params.get_param("slug").unwrap_or("")
    let post = db_get_post_by_slug(slug).wait()

    if is_null(post) {
      return @luna.fragment([
        h1([text("Post Not Found")]),
        p([text("The post \"" + slug + "\" was not found.")]),
        a(href="/", [text("Back to Blog")]),
      ])
    }

    let title = get_str(post, "title")
    let content_html = get_str(post, "content_html")

    @luna.fragment([
      p(class="back-link", [a(href="/", [text("\u2190 Back to list")])]),
      h1([text(title)]),
      div(class="post-content", [
        @luna.raw_html(content_html),
      ]),
    ])
  })
}

// =============================================================================
// Admin Page Handlers
// =============================================================================

///| Admin posts list
async fn admin_posts(_props : @router.PageProps) -> @server_dom.ServerNode {
  @server_dom.ServerNode::async_(async fn() {
    let posts = db_get_all_posts().wait()
    let len = array_len(posts)

    let rows : Array[@luna.Node[Unit]] = []
    for i = 0; i < len; i = i + 1 {
      let post = array_get(posts, i)
      let id = get_str(post, "id")
      let title = get_str(post, "title")
      let slug = get_str(post, "slug")
      let status = get_str(post, "status")
      let updated_at = get_str(post, "updated_at")

      rows.push(
        tr([
          td([text(title)]),
          td([text(slug)]),
          td(class="status-" + status, [text(status)]),
          td([text(updated_at)]),
          td(class="actions", [
            a(href="/admin/posts/" + id + "/edit", [text("Edit")]),
            text(" | "),
            a(href="/posts/" + slug, [text("View")]),
          ]),
        ])
      )
    }

    @luna.fragment([
      h1([text("Manage Posts")]),
      p([a(href="/admin/posts/new", class="btn", [text("New Post")])]),
      table(class="posts-table", [
        thead([
          tr([
            th([text("Title")]),
            th([text("Slug")]),
            th([text("Status")]),
            th([text("Updated")]),
            th([text("Actions")]),
          ]),
        ]),
        tbody(rows),
      ]),
    ])
  })
}

///| New post form - uses Island Component for markdown editor
async fn admin_new_post(_props : @router.PageProps) -> @server_dom.ServerNode {
  @server_dom.ServerNode::sync(@luna.fragment([
    h1([text("New Post")]),
    // Island Component: Markdown Editor with real-time preview and Server Action
    @server_dom.client(
      @types.markdown_editor({
        initial_content: "",
        action_url: "/_action/create-post",
        post_id: "",
        initial_title: "",
        initial_slug: "",
        initial_status: "draft",
      }),
      [div([text("Loading editor...")])],
    ),
  ]))
}

///| Edit post form - uses Island Component for markdown editor
async fn admin_edit_post(props : @router.PageProps) -> @server_dom.ServerNode {
  @server_dom.ServerNode::async_(async fn() {
    let id = props.params.get_param("id").unwrap_or("")
    let post = db_get_post_by_id(id).wait()

    if is_null(post) {
      return @luna.fragment([
        h1([text("Post Not Found")]),
        a(href="/admin", [text("Back to Admin")]),
      ])
    }

    let content = get_str(post, "content")

    @luna.fragment([
      h1([text("Edit Post")]),
      // Island Component: Markdown Editor with post content pre-filled
      @server_dom.client(
        @types.markdown_editor({
          initial_content: content,
          action_url: "/_action/update-post",
          post_id: id,
          initial_title: "",
          initial_slug: "",
          initial_status: "draft",
        }),
        [div([text("Loading editor...")])],
      ),
      // Delete button (separate form, server-side action)
      form(http_method="POST", action="/api/posts/" + id + "/delete", style="margin-top: 20px;", [
        button(attrs=[("type", @luna.attr_static("submit"))], class="btn btn-danger", [text("Delete Post")]),
      ]),
    ])
  })
}

// =============================================================================
// API Handlers
// =============================================================================

///| Create a new post
async fn api_create_post(props : @router.PageProps) -> @core.Any {
  let body = get_form_body_promise(props).wait()
  let title = get_str(body, "title")
  let slug = get_str(body, "slug")
  let content = get_str(body, "content")
  let status = get_str(body, "status")

  let content_html = render_markdown(content)
  let excerpt = safe_excerpt(content, 150)

  let _result = db_create_post(title, slug, content, content_html, excerpt, status).wait()

  // Return JSON success response with slug for client-side navigation
  api_json_success("記事を作成しました", slug)
}

///| Update a post
async fn api_update_post(props : @router.PageProps) -> @core.Any {
  let id = props.params.get_param("id").unwrap_or("")
  let body = get_form_body_promise(props).wait()
  let title = get_str(body, "title")
  let slug = get_str(body, "slug")
  let content = get_str(body, "content")
  let status = get_str(body, "status")

  let content_html = render_markdown(content)
  let excerpt = safe_excerpt(content, 150)

  let _result = db_update_post(id, title, slug, content, content_html, excerpt, status).wait()
  api_json_success("記事を更新しました", slug)
}

///| Delete a post
async fn api_delete_post(props : @router.PageProps) -> @core.Any {
  let id = props.params.get_param("id").unwrap_or("")
  let _result = db_delete_post(id).wait()
  hono_redirect(props, "/admin")
}

// =============================================================================
// Helpers
// =============================================================================

// Note: Basic Authentication is now handled by Hono's basicAuth middleware
// in .sol/prod/server/main.js for better security (timingSafeEqual)

///| Get form body from Hono context (async)
extern "js" fn get_form_body_promise(props : @router.PageProps) -> @core.Promise[@core.Any] =
  #| async (props) => {
  #|   const ctx = props.ctx;
  #|   if (!ctx?.req) return {};
  #|   try {
  #|     return await ctx.req.parseBody();
  #|   } catch (e) {
  #|     console.error('Error parsing form:', e);
  #|     return {};
  #|   }
  #| }

///| Redirect using Response object with proper 302 status
extern "js" fn hono_redirect(_props : @router.PageProps, url : String) -> @core.Any =
  #| (props, url) => {
  #|   // Create a proper HTTP 302 redirect response
  #|   return new Response(null, {
  #|     status: 302,
  #|     headers: { 'Location': url }
  #|   });
  #| }

///| Return JSON success response (plain object for Sol ApiHandler)
extern "js" fn api_json_success(message : String, slug : String) -> @core.Any =
  #| (message, slug) => ({ success: true, message, slug })

///| Normalize escaped newlines from form submission
extern "js" fn normalize_newlines(s : String) -> String =
  #| (s) => s.replace(/\\n/g, '\n')

///| Render markdown to HTML using MoonBit @markdown package
fn render_markdown(content : String) -> String {
  let normalized = normalize_newlines(content)
  let result = @markdown.parse(normalized)
  @markdown.render_html(result.document)
}

///| Safe excerpt extraction using JS slice (handles UTF-8 properly)
extern "js" fn safe_excerpt(content : String, max_len : Int) -> String =
  #| (content, maxLen) => {
  #|   if (content.length <= maxLen) return content;
  #|   return content.slice(0, maxLen) + "...";
  #| }

// =============================================================================
// Router Configuration
// =============================================================================

///|
const ROOT : String =
  #|<!DOCTYPE html>
  #|<html lang="ja">
  #|<head>
  #|  <meta charset="UTF-8">
  #|  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  #|  <meta name="description" content="MoonBit + Luna UI で構築されたブログ管理システム">
  #|  <title>__LUNA_TITLE__</title>
  #|  <link rel="dns-prefetch" href="https://fonts.googleapis.com">
  #|  <link rel="dns-prefetch" href="https://fonts.gstatic.com">
  #|  <link rel="preconnect" href="https://fonts.googleapis.com">
  #|  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  #|  <link rel="preload" href="/loader.js" as="script">
  #|  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
  #|  <noscript><link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono&display=swap" rel="stylesheet"></noscript>
  #|  <style>
  #|    :root {
  #|      --color-bg: #FFFCF7;
  #|      --color-surface: #ffffff;
  #|      --color-text: #1a1a1a;
  #|      --color-text-muted: #666666;
  #|      --color-border: #e8e4df;
  #|      --color-border-light: #f0ece6;
  #|      --color-accent: #4a7c59;
  #|      --color-accent-hover: #3d6649;
  #|      --color-danger: #c44536;
  #|      --color-warning: #d4a017;
  #|      --font-serif: 'Source Serif 4', Georgia, serif;
  #|      --font-sans: 'IBM Plex Sans', -apple-system, sans-serif;
  #|      --font-mono: 'IBM Plex Mono', monospace;
  #|      --shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
  #|      --shadow-md: 0 4px 12px rgba(0,0,0,0.06);
  #|      --shadow-lg: 0 8px 24px rgba(0,0,0,0.08);
  #|      --radius-sm: 6px;
  #|      --radius-md: 10px;
  #|      --radius-lg: 16px;
  #|      --transition: 0.2s ease;
  #|    }
  #|    *, *::before, *::after { box-sizing: border-box; }
  #|    body {
  #|      font-family: var(--font-sans);
  #|      font-size: 16px;
  #|      line-height: 1.6;
  #|      color: var(--color-text);
  #|      background: var(--color-bg);
  #|      margin: 0;
  #|      padding: 0;
  #|      -webkit-font-smoothing: antialiased;
  #|    }
  #|    h1, h2, h3, h4 {
  #|      font-family: var(--font-serif);
  #|      font-weight: 600;
  #|      line-height: 1.3;
  #|      letter-spacing: -0.01em;
  #|    }
  #|    h1 { font-size: clamp(1.75rem, 4vw, 2.5rem); }
  #|    h2 { font-size: clamp(1.35rem, 3vw, 1.75rem); }
  #|    h3 { font-size: clamp(1.1rem, 2.5vw, 1.35rem); }
  #|    a { color: var(--color-accent); text-decoration: none; transition: color var(--transition); }
  #|    a:hover { color: var(--color-accent-hover); }
  #|    #__sol__ { max-width: 1400px; margin: 0 auto; padding: 24px 20px; min-height: 100vh; }
  #|    .notice-banner {
  #|      background: linear-gradient(135deg, #f0e6d3 0%, #e8dcc8 100%);
  #|      border: 1px solid var(--color-border);
  #|      border-radius: var(--radius-md);
  #|      padding: 12px 20px;
  #|      margin-bottom: 20px;
  #|      text-align: center;
  #|      font-size: 0.9rem;
  #|      color: var(--color-text-muted);
  #|      max-width: 720px;
  #|      margin-left: auto;
  #|      margin-right: auto;
  #|    }
  #|    .container { max-width: 720px; margin: 0 auto; }
  #|    .main-nav {
  #|      display: flex;
  #|      align-items: center;
  #|      gap: 8px;
  #|      padding: 16px 24px;
  #|      background: var(--color-surface);
  #|      border: 1px solid var(--color-border-light);
  #|      border-radius: var(--radius-lg);
  #|      margin-bottom: 40px;
  #|      box-shadow: var(--shadow-sm);
  #|    }
  #|    .main-nav a {
  #|      font-weight: 500;
  #|      padding: 8px 16px;
  #|      border-radius: var(--radius-sm);
  #|      transition: all var(--transition);
  #|    }
  #|    .main-nav a:hover { background: var(--color-border-light); }
  #|    .main-nav strong { font-family: var(--font-serif); font-size: 1.25rem; }
  #|    .main-nav span { color: var(--color-border); }
  #|    .post-card {
  #|      background: var(--color-surface);
  #|      border: 1px solid var(--color-border-light);
  #|      border-radius: var(--radius-md);
  #|      padding: 28px 32px;
  #|      margin-bottom: 20px;
  #|      box-shadow: var(--shadow-sm);
  #|      transition: all var(--transition);
  #|    }
  #|    .post-card:hover {
  #|      box-shadow: var(--shadow-md);
  #|      transform: translateY(-2px);
  #|      border-color: var(--color-border);
  #|    }
  #|    .post-card h2 { margin: 0 0 12px 0; }
  #|    .post-card h2 a { color: var(--color-text); }
  #|    .post-card h2 a:hover { color: var(--color-accent); }
  #|    .post-card p { margin: 0 0 12px 0; color: var(--color-text-muted); }
  #|    .meta {
  #|      font-size: 0.875rem;
  #|      color: var(--color-text-muted);
  #|      display: flex;
  #|      align-items: center;
  #|      gap: 8px;
  #|    }
  #|    .back-link { margin-bottom: 32px; }
  #|    .back-link a {
  #|      display: inline-flex;
  #|      align-items: center;
  #|      gap: 6px;
  #|      font-size: 0.9rem;
  #|      color: var(--color-text-muted);
  #|      padding: 8px 0;
  #|    }
  #|    .back-link a:hover { color: var(--color-accent); }
  #|    .post-content {
  #|      font-family: var(--font-serif);
  #|      font-size: 1.125rem;
  #|      line-height: 1.8;
  #|    }
  #|    .post-content h1, .post-content h2, .post-content h3 { margin: 1.5em 0 0.5em; }
  #|    .post-content p { margin: 0 0 1.25em; }
  #|    .post-content ul, .post-content ol { padding-left: 1.5em; margin: 0 0 1.25em; }
  #|    .post-content li { margin: 0.4em 0; }
  #|    .post-content pre {
  #|      background: #2d2d2d;
  #|      color: #f8f8f2;
  #|      padding: 20px 24px;
  #|      border-radius: var(--radius-md);
  #|      overflow-x: auto;
  #|      font-family: var(--font-mono);
  #|      font-size: 0.9rem;
  #|      line-height: 1.5;
  #|    }
  #|    .post-content code {
  #|      font-family: var(--font-mono);
  #|      font-size: 0.9em;
  #|      background: var(--color-border-light);
  #|      padding: 2px 6px;
  #|      border-radius: 4px;
  #|    }
  #|    .post-content pre code { background: none; padding: 0; }
  #|    .admin-container { display: flex; gap: 32px; }
  #|    .admin-sidebar {
  #|      width: 220px;
  #|      flex-shrink: 0;
  #|      padding: 24px;
  #|      background: var(--color-surface);
  #|      border: 1px solid var(--color-border-light);
  #|      border-radius: var(--radius-lg);
  #|      box-shadow: var(--shadow-sm);
  #|      height: fit-content;
  #|      position: sticky;
  #|      top: 24px;
  #|    }
  #|    .admin-sidebar h3 {
  #|      font-size: 0.75rem;
  #|      text-transform: uppercase;
  #|      letter-spacing: 0.08em;
  #|      color: var(--color-text-muted);
  #|      margin: 0 0 16px;
  #|      font-family: var(--font-sans);
  #|      font-weight: 600;
  #|    }
  #|    .admin-sidebar ul { list-style: none; padding: 0; margin: 0; }
  #|    .admin-sidebar li { margin-bottom: 4px; }
  #|    .admin-sidebar a {
  #|      display: block;
  #|      padding: 10px 14px;
  #|      border-radius: var(--radius-sm);
  #|      color: var(--color-text);
  #|      font-weight: 500;
  #|      transition: all var(--transition);
  #|    }
  #|    .admin-sidebar a:hover { background: var(--color-border-light); color: var(--color-accent); }
  #|    .admin-content { flex: 1; min-width: 0; }
  #|    .admin-content h1 { margin: 0 0 24px; }
  #|    .posts-table {
  #|      width: 100%;
  #|      border-collapse: separate;
  #|      border-spacing: 0;
  #|      background: var(--color-surface);
  #|      border: 1px solid var(--color-border-light);
  #|      border-radius: var(--radius-md);
  #|      overflow: hidden;
  #|      box-shadow: var(--shadow-sm);
  #|    }
  #|    .posts-table th, .posts-table td {
  #|      padding: 14px 18px;
  #|      text-align: left;
  #|      border-bottom: 1px solid var(--color-border-light);
  #|    }
  #|    .posts-table th {
  #|      background: var(--color-bg);
  #|      font-size: 0.75rem;
  #|      text-transform: uppercase;
  #|      letter-spacing: 0.06em;
  #|      color: var(--color-text-muted);
  #|      font-weight: 600;
  #|    }
  #|    .posts-table tr:last-child td { border-bottom: none; }
  #|    .posts-table tr:hover td { background: rgba(74, 124, 89, 0.03); }
  #|    .posts-table td[class^="status-"] {
  #|      text-align: center;
  #|      vertical-align: middle;
  #|      padding: 12px 8px;
  #|    }
  #|    .posts-table td.status-draft,
  #|    .posts-table td.status-published {
  #|      font-size: 0.7rem;
  #|      font-weight: 600;
  #|      text-transform: uppercase;
  #|      letter-spacing: 0.03em;
  #|    }
  #|    .posts-table td.status-draft {
  #|      color: #888;
  #|    }
  #|    .posts-table td.status-published {
  #|      color: var(--color-accent);
  #|    }
  #|    .actions { white-space: nowrap; }
  #|    .actions a {
  #|      margin-right: 12px;
  #|      font-size: 0.875rem;
  #|      font-weight: 500;
  #|    }
  #|    .form-group { margin-bottom: 24px; }
  #|    .form-group label {
  #|      display: block;
  #|      font-weight: 600;
  #|      margin-bottom: 8px;
  #|      font-size: 0.9rem;
  #|    }
  #|    .form-group input, .form-group textarea, .form-group select {
  #|      width: 100%;
  #|      padding: 12px 16px;
  #|      font-size: 1rem;
  #|      font-family: var(--font-sans);
  #|      border: 1px solid var(--color-border);
  #|      border-radius: var(--radius-sm);
  #|      background: var(--color-surface);
  #|      transition: all var(--transition);
  #|    }
  #|    .form-group input:focus, .form-group textarea:focus, .form-group select:focus {
  #|      outline: none;
  #|      border-color: var(--color-accent);
  #|      box-shadow: 0 0 0 3px rgba(74, 124, 89, 0.1);
  #|    }
  #|    .form-group textarea {
  #|      min-height: 500px;
  #|      height: 100%;
  #|      font-family: var(--font-mono);
  #|      font-size: 0.9rem;
  #|      line-height: 1.6;
  #|      resize: none;
  #|    }
  #|    .form-group select { cursor: pointer; }
  #|    .editor-container {
  #|      display: grid;
  #|      grid-template-columns: 1fr 1fr;
  #|      gap: 16px;
  #|      align-items: stretch;
  #|    }
  #|    .editor-container > .preview { order: 1; }
  #|    .editor-container > .editor-pane { order: 2; }
  #|    .editor-pane {
  #|      display: flex;
  #|      flex-direction: column;
  #|    }
  #|    .editor-pane label {
  #|      font-weight: 600;
  #|      margin-bottom: 8px;
  #|      font-size: 0.9rem;
  #|    }
  #|    .editor-pane textarea {
  #|      flex: 1;
  #|      min-height: 500px;
  #|      width: 100%;
  #|      padding: 12px 16px;
  #|      font-size: 1rem;
  #|      font-family: var(--font-mono);
  #|      border: 1px solid var(--color-border);
  #|      border-radius: var(--radius-sm);
  #|      background: var(--color-surface);
  #|      line-height: 1.6;
  #|      resize: none;
  #|    }
  #|    .editor-pane textarea:focus {
  #|      outline: none;
  #|      border-color: var(--color-accent);
  #|      box-shadow: 0 0 0 3px rgba(74, 124, 89, 0.1);
  #|    }
  #|    .preview {
  #|      background: var(--color-surface);
  #|      border: 1px solid var(--color-border-light);
  #|      border-radius: var(--radius-md);
  #|      padding: 24px;
  #|      min-height: 500px;
  #|      max-height: 70vh;
  #|      overflow-y: auto;
  #|      font-family: var(--font-serif);
  #|      line-height: 1.7;
  #|      box-shadow: var(--shadow-sm);
  #|    }
  #|    .preview h1, .preview h2, .preview h3 { margin: 0.8em 0 0.4em; }
  #|    .preview h1:first-child, .preview h2:first-child, .preview h3:first-child { margin-top: 0; }
  #|    .preview ul, .preview ol { padding-left: 1.5em; margin: 0.6em 0; }
  #|    .preview li { margin: 0.3em 0; }
  #|    .preview pre {
  #|      background: #2d2d2d;
  #|      color: #f8f8f2;
  #|      padding: 16px;
  #|      border-radius: var(--radius-sm);
  #|      overflow-x: auto;
  #|      font-family: var(--font-mono);
  #|      font-size: 0.85rem;
  #|    }
  #|    .preview code {
  #|      font-family: var(--font-mono);
  #|      font-size: 0.9em;
  #|      background: var(--color-border-light);
  #|      padding: 2px 5px;
  #|      border-radius: 3px;
  #|    }
  #|    .preview pre code { background: none; padding: 0; }
  #|    .form-actions { margin-top: 32px; }
  #|    .btn {
  #|      display: inline-flex;
  #|      align-items: center;
  #|      justify-content: center;
  #|      gap: 8px;
  #|      padding: 12px 24px;
  #|      font-family: var(--font-sans);
  #|      font-size: 0.9rem;
  #|      font-weight: 600;
  #|      background: var(--color-accent);
  #|      color: white;
  #|      border: none;
  #|      border-radius: var(--radius-sm);
  #|      cursor: pointer;
  #|      text-decoration: none;
  #|      transition: all var(--transition);
  #|      box-shadow: var(--shadow-sm);
  #|    }
  #|    .btn:hover {
  #|      background: var(--color-accent-hover);
  #|      color: white;
  #|      transform: translateY(-1px);
  #|      box-shadow: var(--shadow-md);
  #|    }
  #|    .btn-danger { background: var(--color-danger); }
  #|    .btn-danger:hover { background: #a83a2e; }
  #|    .btn-secondary {
  #|      background: var(--color-border);
  #|      color: var(--color-text);
  #|    }
  #|    .btn-secondary:hover {
  #|      background: var(--color-text-muted);
  #|      color: white;
  #|    }
  #|    .toast {
  #|      position: fixed;
  #|      top: 20px;
  #|      right: 20px;
  #|      padding: 12px 24px;
  #|      border-radius: var(--radius-md);
  #|      color: white;
  #|      font-weight: 500;
  #|      z-index: 1000;
  #|      animation: slideIn 0.3s ease;
  #|    }
  #|    .toast-success { background: var(--color-accent); }
  #|    .toast-error { background: var(--color-danger); }
  #|    @keyframes slideIn {
  #|      from { transform: translateX(100%); opacity: 0; }
  #|      to { transform: translateX(0); opacity: 1; }
  #|    }
  #|    .success-actions {
  #|      margin-top: 24px;
  #|      padding: 20px;
  #|      background: rgba(74, 124, 89, 0.05);
  #|      border: 1px solid rgba(74, 124, 89, 0.2);
  #|      border-radius: var(--radius-md);
  #|      display: flex;
  #|      gap: 12px;
  #|      align-items: center;
  #|    }
  #|    .success-actions .success-message {
  #|      flex: 1;
  #|      color: var(--color-accent);
  #|      font-weight: 600;
  #|    }
  #|    @media (max-width: 768px) {
  #|      #__sol__ { padding: 16px; }
  #|      .main-nav { padding: 12px 16px; margin-bottom: 24px; flex-wrap: wrap; }
  #|      .post-card { padding: 20px; }
  #|      .admin-container { flex-direction: column; gap: 24px; }
  #|      .admin-sidebar {
  #|        width: 100%;
  #|        position: static;
  #|        display: flex;
  #|        flex-wrap: wrap;
  #|        gap: 8px;
  #|        padding: 16px;
  #|      }
  #|      .admin-sidebar h3 { width: 100%; margin-bottom: 8px; }
  #|      .admin-sidebar ul { display: flex; flex-wrap: wrap; gap: 8px; }
  #|      .admin-sidebar li { margin: 0; }
  #|      .admin-sidebar a { padding: 8px 12px; }
  #|      .editor-container { grid-template-columns: 1fr; }
  #|      .posts-table { font-size: 0.875rem; }
  #|      .posts-table th, .posts-table td { padding: 10px 12px; }
  #|      .form-group input, .form-group textarea, .form-group select { padding: 10px 14px; }
  #|    }
  #|    @media (max-width: 480px) {
  #|      h1 { font-size: 1.5rem; }
  #|      .posts-table { display: block; overflow-x: auto; }
  #|      .btn { width: 100%; }
  #|    }
  #|  </style>
  #|  __LUNA_HEAD__
  #|</head>
  #|<body>
  #|  <main role="main" id="__sol__">__LUNA_MAIN__</main>
  #|  <script src="/loader.js"></script>
  #|  <script>if('serviceWorker'in navigator)navigator.serviceWorker.register('/sw.js')</script>
  #|</body>
  #|</html>

///|
pub fn config() -> @router.RouterConfig {
  @router.RouterConfig::default()
  .with_root_template(ROOT)
  .with_loader_url("/loader.js")
}

// =============================================================================
// Server Actions
// =============================================================================

///| Create post action handler
let create_post_action : @action.ActionHandler = @action.ActionHandler(async fn(
  ctx,
) {
  // Parse request body (JSON or form-urlencoded)
  let content_type = ctx.get_header("Content-Type").unwrap_or("")
  let is_form = content_type.contains("application/x-www-form-urlencoded")

  let body = ctx.body
  let (title, slug, content, status) = if is_form {
    let data = parse_form_urlencoded(body)
    (
      get_str(data, "title"),
      get_str(data, "slug"),
      get_str(data, "content"),
      get_str(data, "status"),
    )
  } else {
    let data = parse_json(body)
    (
      get_str(data, "title"),
      get_str(data, "slug"),
      get_str(data, "content"),
      get_str(data, "status"),
    )
  }

  // Validate
  if title == "" {
    return @action.ActionResult::bad_request("タイトルは必須です")
  }
  if slug == "" {
    return @action.ActionResult::bad_request("スラッグは必須です")
  }

  let content_html = render_markdown(content)
  let excerpt = safe_excerpt(content, 150)
  let final_status = if status == "" { "draft" } else { status }

  let _result = db_create_post(
      title, slug, content, content_html, excerpt, final_status,
    )
    .wait()

  @action.ActionResult::ok(
    action_json_response(true, "記事を作成しました", slug),
  )
})

///| Update post action handler (ID passed in body)
let update_post_action : @action.ActionHandler = @action.ActionHandler(async fn(
  ctx,
) {
  let content_type = ctx.get_header("Content-Type").unwrap_or("")
  let is_form = content_type.contains("application/x-www-form-urlencoded")

  let body = ctx.body
  let (id, title, slug, content, status) = if is_form {
    let data = parse_form_urlencoded(body)
    (
      get_str(data, "id"),
      get_str(data, "title"),
      get_str(data, "slug"),
      get_str(data, "content"),
      get_str(data, "status"),
    )
  } else {
    let data = parse_json(body)
    (
      get_str(data, "id"),
      get_str(data, "title"),
      get_str(data, "slug"),
      get_str(data, "content"),
      get_str(data, "status"),
    )
  }

  if id == "" {
    return @action.ActionResult::bad_request("IDは必須です")
  }
  if title == "" {
    return @action.ActionResult::bad_request("タイトルは必須です")
  }

  let content_html = render_markdown(content)
  let excerpt = safe_excerpt(content, 150)
  let final_status = if status == "" { "draft" } else { status }

  let _result = db_update_post(
      id, title, slug, content, content_html, excerpt, final_status,
    )
    .wait()

  @action.ActionResult::ok(
    action_json_response(true, "記事を更新しました", slug),
  )
})

///| Create JSON response for action
extern "js" fn action_json_response(
  success : Bool,
  message : String,
  slug : String,
) -> @core.Any =
  #| (success, message, slug) => ({ success, message, slug })

///| Parse JSON string
extern "js" fn parse_json(s : String) -> @core.Any =
  #| (s) => { try { return JSON.parse(s); } catch { return {}; } }

///| Parse form-urlencoded string
extern "js" fn parse_form_urlencoded(s : String) -> @core.Any =
  #| (s) => Object.fromEntries(new URLSearchParams(s))

///|
/// Action registry with Server Actions for post CRUD
pub fn action_registry() -> @action.ActionRegistry {
  @action.ActionRegistry::new(allowed_origins=[
    "http://localhost:3000", "http://localhost:8787",
    "https://blog-admin-kazu-san.workers.dev",
    "https://blog-admin.kazu-san.workers.dev",
  ]).register(
    @action.ActionDef::new("create-post", create_post_action).with_require_json(
      false,
    ),
  ).register(
    @action.ActionDef::new("update-post", update_post_action).with_require_json(
      false,
    ),
  )
}
