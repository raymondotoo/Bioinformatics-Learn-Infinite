export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405);
    }

    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/x-www-form-urlencoded") && !contentType.includes("multipart/form-data")) {
      return json({ error: "Unsupported content type" }, 415);
    }

    const form = await request.formData();

    // Supports both new plain names and older Staticman-style names.
    const page = readField(form, ["page", "fields[page]"]);
    const email = readField(form, ["email", "fields[email]"]);
    const message = readField(form, ["message", "fields[message]"]);
    const source = readField(form, ["source", "fields[source]"]) || "website-form";
    const slugRaw = readField(form, ["slug", "options[slug]"]) || page;
    const botcheck = readField(form, ["botcheck", "fields[botcheck]"]); // honeypot

    if (botcheck) {
      return json({ ok: true }, 200); // silent spam drop
    }

    if (!page || !email || !message) {
      return json({ error: "Missing required fields" }, 400);
    }

    if (!isValidEmail(email)) {
      return json({ error: "Invalid email" }, 400);
    }

    const maxWords = Number(env.MAX_WORDS || 120);
    const words = countWords(message);
    if (words > maxWords) {
      return json({ error: `Feedback exceeds max word count (${maxWords})` }, 400);
    }

    const slug = slugify(slugRaw || "page");
    const timestamp = Date.now();
    const entryId = `entry${timestamp}`;
    const path = `_data/feedback/${slug}/${entryId}.yml`;

    const yamlBody = toYaml({
      source,
      page,
      email,
      message,
      created_at: new Date(timestamp).toISOString()
    });

    const repo = env.GITHUB_REPO || "raymondotoo/Bioinformatics-Learn-Infinite";
    const branch = env.GITHUB_BRANCH || "main";

    const apiUrl = `https://api.github.com/repos/${repo}/contents/${encodeURIComponent(path).replace(/%2F/g, "/")}`;

    const ghResp = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${env.GITHUB_TOKEN}`,
        "Accept": "application/vnd.github+json",
        "Content-Type": "application/json",
        "User-Agent": "bioinf-feedback-worker"
      },
      body: JSON.stringify({
        message: `Add feedback entry for ${page}`,
        content: b64(yamlBody),
        branch
      })
    });

    if (!ghResp.ok) {
      const details = await ghResp.text();
      return json({ error: "Failed to write feedback to repository", details }, 502);
    }

    const redirect = readField(form, ["_next", "options[redirect]"]);
    if (redirect) {
      return Response.redirect(redirect, 303);
    }

    return json({ ok: true, path }, 200);
  }
};

function readField(form, keys) {
  for (const key of keys) {
    const v = form.get(key);
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return "";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function countWords(text) {
  const t = (text || "").trim();
  return t ? t.split(/\s+/).length : 0;
}

function slugify(text) {
  return String(text || "page")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80) || "page";
}

function escapeYaml(value) {
  return String(value || "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/"/g, '\\"');
}

function toYaml(obj) {
  return Object.entries(obj)
    .map(([k, v]) => `${k}: "${escapeYaml(v)}"`)
    .join("\n") + "\n";
}

function b64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders()
    }
  });
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
}
