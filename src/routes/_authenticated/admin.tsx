import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { servicesQuery, plansQuery, faqsQuery, siteContentQuery, type Service, type Plan, type Faq } from "@/lib/api";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — NFS Tech" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      setEmail(userData.user?.email ?? "");
      if (!userData.user) return;
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", userData.user.id);
      setIsAdmin(!!data?.some(r => r.role === "admin"));
    })();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  const handleClaim = async () => {
    const { data, error } = await supabase.rpc("claim_admin");
    if (error) return toast.error(error.message);
    if (data) { toast.success("Admin role granted"); setIsAdmin(true); }
    else toast.error("Admin already claimed by another user");
  };

  if (isAdmin === null) return <div className="py-32 text-center text-muted-foreground">Loading…</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">Signed in as {email}</p>
        </div>
        <button onClick={handleSignOut} className="text-sm px-4 py-2 border border-border rounded hover:border-primary">Sign Out</button>
      </div>

      {!isAdmin ? (
        <div className="card-dark p-8 text-center">
          <p className="mb-4 text-muted-foreground">You don't have admin access yet.</p>
          <button onClick={handleClaim} className="btn-primary">Claim Admin Role</button>
          <p className="text-xs text-muted-foreground mt-3">Only the first user can claim admin.</p>
        </div>
      ) : (
        <Tabs defaultValue="services">
          <TabsList className="mb-6 flex-wrap h-auto">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="plans">Pricing Plans</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="content">Site Content</TabsTrigger>
          </TabsList>
          <TabsContent value="services"><ServicesAdmin /></TabsContent>
          <TabsContent value="plans"><PlansAdmin /></TabsContent>
          <TabsContent value="faqs"><FaqsAdmin /></TabsContent>
          <TabsContent value="content"><ContentAdmin /></TabsContent>
        </Tabs>
      )}
    </div>
  );
}

/* ------------------ SERVICES ------------------ */
function ServicesAdmin() {
  const qc = useQueryClient();
  const { data: services = [], isLoading } = useQuery(servicesQuery());
  const [editing, setEditing] = useState<Partial<Service> | null>(null);

  const save = async () => {
    if (!editing) return;
    const payload = {
      slug: editing.slug ?? "",
      title: editing.title ?? "",
      heading: editing.heading ?? editing.title ?? "",
      intro: editing.intro ?? "",
      meta_title: editing.meta_title ?? "",
      meta_desc: editing.meta_desc ?? "",
      pricing_label: editing.pricing_label ?? null,
      price_suffix: editing.price_suffix ?? "/one time",
      sort_order: editing.sort_order ?? 0,
    };
    const { error } = editing.id
      ? await supabase.from("services").update(payload).eq("id", editing.id)
      : await supabase.from("services").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    setEditing(null);
    qc.invalidateQueries({ queryKey: ["services"] });
  };

  const del = async (id: string) => {
    if (!confirm("Delete this service and all its plans?")) return;
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    qc.invalidateQueries({ queryKey: ["services"] });
    qc.invalidateQueries({ queryKey: ["plans"] });
  };

  if (isLoading) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Services ({services.length})</h2>
        <button onClick={() => setEditing({ sort_order: services.length, price_suffix: "/one time" })} className="btn-primary text-sm">+ Add Service</button>
      </div>
      <div className="grid gap-3">
        {services.map(s => (
          <div key={s.id} className="card-dark p-4 flex flex-wrap justify-between items-center gap-3">
            <div>
              <div className="font-semibold">{s.title}</div>
              <div className="text-xs text-muted-foreground">/{s.slug} · order {s.sort_order}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(s)} className="text-sm px-3 py-1 border border-border rounded hover:border-primary">Edit</button>
              <button onClick={() => del(s.id)} className="text-sm px-3 py-1 border border-destructive/40 text-destructive rounded hover:bg-destructive/10">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <Modal onClose={() => setEditing(null)} title={editing.id ? "Edit Service" : "New Service"}>
          <Field label="Slug"><input className={inputCls} value={editing.slug ?? ""} onChange={e => setEditing({ ...editing, slug: e.target.value })} /></Field>
          <Field label="Title"><input className={inputCls} value={editing.title ?? ""} onChange={e => setEditing({ ...editing, title: e.target.value })} /></Field>
          <Field label="Heading"><input className={inputCls} value={editing.heading ?? ""} onChange={e => setEditing({ ...editing, heading: e.target.value })} /></Field>
          <Field label="Intro"><textarea rows={4} className={inputCls} value={editing.intro ?? ""} onChange={e => setEditing({ ...editing, intro: e.target.value })} /></Field>
          <Field label="Meta Title"><input className={inputCls} value={editing.meta_title ?? ""} onChange={e => setEditing({ ...editing, meta_title: e.target.value })} /></Field>
          <Field label="Meta Description"><textarea rows={2} className={inputCls} value={editing.meta_desc ?? ""} onChange={e => setEditing({ ...editing, meta_desc: e.target.value })} /></Field>
          <Field label="Pricing Label"><input className={inputCls} value={editing.pricing_label ?? ""} onChange={e => setEditing({ ...editing, pricing_label: e.target.value })} /></Field>
          <Field label="Price Suffix"><input className={inputCls} value={editing.price_suffix ?? ""} onChange={e => setEditing({ ...editing, price_suffix: e.target.value })} /></Field>
          <Field label="Sort Order"><input type="number" className={inputCls} value={editing.sort_order ?? 0} onChange={e => setEditing({ ...editing, sort_order: Number(e.target.value) })} /></Field>
          <div className="flex gap-2 pt-2"><button onClick={save} className="btn-primary flex-1 justify-center">Save</button><button onClick={() => setEditing(null)} className="px-4 py-2 border border-border rounded">Cancel</button></div>
        </Modal>
      )}
    </div>
  );
}

/* ------------------ PLANS ------------------ */
function PlansAdmin() {
  const qc = useQueryClient();
  const { data: services = [] } = useQuery(servicesQuery());
  const { data: plans = [], isLoading } = useQuery(plansQuery());
  const [editing, setEditing] = useState<Partial<Plan> | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? plans : plans.filter(p => p.service_slug === filter);

  const save = async () => {
    if (!editing) return;
    const payload = {
      service_slug: editing.service_slug ?? "",
      name: editing.name ?? "",
      note: editing.note ?? "",
      price: editing.price ?? "0",
      features: editing.features ?? [],
      featured: editing.featured ?? false,
      sort_order: editing.sort_order ?? 0,
    };
    const { error } = editing.id
      ? await supabase.from("plans").update(payload).eq("id", editing.id)
      : await supabase.from("plans").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    setEditing(null);
    qc.invalidateQueries({ queryKey: ["plans"] });
    qc.invalidateQueries({ queryKey: ["service"] });
  };

  const del = async (id: string) => {
    if (!confirm("Delete this plan?")) return;
    const { error } = await supabase.from("plans").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    qc.invalidateQueries({ queryKey: ["plans"] });
    qc.invalidateQueries({ queryKey: ["service"] });
  };

  if (isLoading) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
        <h2 className="text-xl font-semibold">Plans ({filtered.length})</h2>
        <div className="flex gap-2">
          <select value={filter} onChange={e => setFilter(e.target.value)} className={inputCls + " w-auto"}>
            <option value="all">All services</option>
            {services.map(s => <option key={s.slug} value={s.slug}>{s.title}</option>)}
          </select>
          <button onClick={() => setEditing({ service_slug: services[0]?.slug ?? "", features: [], sort_order: 0 })} className="btn-primary text-sm">+ Add Plan</button>
        </div>
      </div>
      <div className="grid gap-3">
        {filtered.map(p => (
          <div key={p.id} className="card-dark p-4">
            <div className="flex flex-wrap justify-between items-center gap-3">
              <div>
                <div className="font-semibold">{p.name} {p.featured && <span className="text-xs text-primary">★ featured</span>}</div>
                <div className="text-xs text-muted-foreground">{p.service_slug} · ${p.price} · {p.features.length} features</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditing(p)} className="text-sm px-3 py-1 border border-border rounded hover:border-primary">Edit</button>
                <button onClick={() => del(p.id)} className="text-sm px-3 py-1 border border-destructive/40 text-destructive rounded hover:bg-destructive/10">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <Modal onClose={() => setEditing(null)} title={editing.id ? "Edit Plan" : "New Plan"}>
          <Field label="Service">
            <select className={inputCls} value={editing.service_slug ?? ""} onChange={e => setEditing({ ...editing, service_slug: e.target.value })}>
              <option value="">Select…</option>
              {services.map(s => <option key={s.slug} value={s.slug}>{s.title}</option>)}
            </select>
          </Field>
          <Field label="Name"><input className={inputCls} value={editing.name ?? ""} onChange={e => setEditing({ ...editing, name: e.target.value })} /></Field>
          <Field label="Note"><input className={inputCls} value={editing.note ?? ""} onChange={e => setEditing({ ...editing, note: e.target.value })} /></Field>
          <Field label="Price"><input className={inputCls} value={editing.price ?? ""} onChange={e => setEditing({ ...editing, price: e.target.value })} /></Field>
          <Field label="Features (one per line)">
            <textarea rows={8} className={inputCls}
              value={(editing.features ?? []).join("\n")}
              onChange={e => setEditing({ ...editing, features: e.target.value.split("\n").map(f => f.trim()).filter(Boolean) })} />
          </Field>
          <Field label="Featured">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!editing.featured} onChange={e => setEditing({ ...editing, featured: e.target.checked })} /> Highlight this plan</label>
          </Field>
          <Field label="Sort Order"><input type="number" className={inputCls} value={editing.sort_order ?? 0} onChange={e => setEditing({ ...editing, sort_order: Number(e.target.value) })} /></Field>
          <div className="flex gap-2 pt-2"><button onClick={save} className="btn-primary flex-1 justify-center">Save</button><button onClick={() => setEditing(null)} className="px-4 py-2 border border-border rounded">Cancel</button></div>
        </Modal>
      )}
    </div>
  );
}

/* ------------------ FAQS ------------------ */
function FaqsAdmin() {
  const qc = useQueryClient();
  const { data: faqs = [], isLoading } = useQuery(faqsQuery());
  const [editing, setEditing] = useState<Partial<Faq> | null>(null);

  const save = async () => {
    if (!editing) return;
    const payload = { question: editing.question ?? "", answer: editing.answer ?? "", sort_order: editing.sort_order ?? 0 };
    const { error } = editing.id
      ? await supabase.from("faqs").update(payload).eq("id", editing.id)
      : await supabase.from("faqs").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    setEditing(null);
    qc.invalidateQueries({ queryKey: ["faqs"] });
  };

  const del = async (id: string) => {
    if (!confirm("Delete this FAQ?")) return;
    const { error } = await supabase.from("faqs").delete().eq("id", id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["faqs"] });
  };

  if (isLoading) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">FAQs ({faqs.length})</h2>
        <button onClick={() => setEditing({ sort_order: faqs.length })} className="btn-primary text-sm">+ Add FAQ</button>
      </div>
      <div className="grid gap-3">
        {faqs.map(f => (
          <div key={f.id} className="card-dark p-4 flex flex-wrap justify-between items-start gap-3">
            <div className="flex-1 min-w-0">
              <div className="font-semibold">{f.question}</div>
              <div className="text-xs text-muted-foreground line-clamp-2">{f.answer}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(f)} className="text-sm px-3 py-1 border border-border rounded hover:border-primary">Edit</button>
              <button onClick={() => del(f.id)} className="text-sm px-3 py-1 border border-destructive/40 text-destructive rounded hover:bg-destructive/10">Delete</button>
            </div>
          </div>
        ))}
      </div>
      {editing && (
        <Modal onClose={() => setEditing(null)} title={editing.id ? "Edit FAQ" : "New FAQ"}>
          <Field label="Question"><input className={inputCls} value={editing.question ?? ""} onChange={e => setEditing({ ...editing, question: e.target.value })} /></Field>
          <Field label="Answer"><textarea rows={5} className={inputCls} value={editing.answer ?? ""} onChange={e => setEditing({ ...editing, answer: e.target.value })} /></Field>
          <Field label="Sort Order"><input type="number" className={inputCls} value={editing.sort_order ?? 0} onChange={e => setEditing({ ...editing, sort_order: Number(e.target.value) })} /></Field>
          <div className="flex gap-2 pt-2"><button onClick={save} className="btn-primary flex-1 justify-center">Save</button><button onClick={() => setEditing(null)} className="px-4 py-2 border border-border rounded">Cancel</button></div>
        </Modal>
      )}
    </div>
  );
}

/* ------------------ SITE CONTENT ------------------ */
function ContentAdmin() {
  const qc = useQueryClient();
  const [key, setKey] = useState("hero");
  const { data, isLoading } = useQuery(siteContentQuery(key));
  const [json, setJson] = useState<string>("");
  const [newKey, setNewKey] = useState("");

  useEffect(() => {
    setJson(JSON.stringify(data?.value ?? {}, null, 2));
  }, [data]);

  const save = async () => {
    let parsed: Record<string, unknown>;
    try { parsed = JSON.parse(json); } catch { return toast.error("Invalid JSON"); }
    const { error } = await supabase.from("site_content").upsert({ key, value: parsed as never, updated_at: new Date().toISOString() });
    if (error) return toast.error(error.message);
    toast.success("Saved");
    qc.invalidateQueries({ queryKey: ["site_content", key] });
  };

  const del = async () => {
    if (!confirm(`Delete content key "${key}"?`)) return;
    const { error } = await supabase.from("site_content").delete().eq("key", key);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["site_content", key] });
    toast.success("Deleted");
  };

  const create = async () => {
    if (!newKey) return;
    const { error } = await supabase.from("site_content").insert({ key: newKey, value: {} });
    if (error) return toast.error(error.message);
    setKey(newKey);
    setNewKey("");
    qc.invalidateQueries({ queryKey: ["site_content"] });
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 items-center mb-4">
        <h2 className="text-xl font-semibold mr-auto">Site Content Blocks</h2>
        <input placeholder="New key (e.g. contact)" value={newKey} onChange={e => setNewKey(e.target.value)} className={inputCls + " w-auto"} />
        <button onClick={create} className="btn-primary text-sm">+ Add Key</button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {["hero", "about", "contact", "stats"].concat(key && !["hero","about","contact","stats"].includes(key) ? [key] : []).map(k => (
          <button key={k} onClick={() => setKey(k)} className={`px-3 py-1 rounded border text-sm ${key === k ? "border-primary text-primary" : "border-border"}`}>{k}</button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mb-2">Editing key: <span className="text-primary">{key}</span>. Store any JSON shape your components read.</p>
      {isLoading ? <p className="text-muted-foreground">Loading…</p> : (
        <>
          <textarea rows={16} value={json} onChange={e => setJson(e.target.value)} className={inputCls + " font-mono text-sm"} />
          <div className="flex gap-2 mt-3">
            <button onClick={save} className="btn-primary">Save</button>
            <button onClick={del} className="px-4 py-2 border border-destructive/40 text-destructive rounded hover:bg-destructive/10">Delete key</button>
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------ helpers ------------------ */
const inputCls = "w-full bg-muted border border-border rounded-lg px-4 py-2 focus:border-primary outline-none text-sm";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block mb-3"><span className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</span>{children}</label>;
}
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur flex items-start justify-center overflow-y-auto p-6" onClick={onClose}>
      <div className="card-dark p-6 w-full max-w-lg my-8 animate-scale-in" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">{title}</h3><button onClick={onClose} className="text-muted-foreground hover:text-foreground text-2xl leading-none">×</button></div>
        {children}
      </div>
    </div>
  );
}
