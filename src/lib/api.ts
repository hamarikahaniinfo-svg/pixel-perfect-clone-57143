import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Service = {
  id: string;
  slug: string;
  title: string;
  heading: string;
  intro: string;
  meta_title: string;
  meta_desc: string;
  pricing_label: string | null;
  price_suffix: string;
  sort_order: number;
};

export type Plan = {
  id: string;
  service_slug: string;
  name: string;
  note: string;
  price: string;
  features: string[];
  featured: boolean;
  sort_order: number;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
};

export const servicesQuery = () =>
  queryOptions({
    queryKey: ["services"],
    queryFn: async (): Promise<Service[]> => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return (data as Service[]) ?? [];
    },
  });

export const serviceBySlugQuery = (slug: string) =>
  queryOptions({
    queryKey: ["service", slug],
    queryFn: async (): Promise<{ service: Service | null; plans: Plan[] }> => {
      const [{ data: s, error: e1 }, { data: p, error: e2 }] = await Promise.all([
        supabase.from("services").select("*").eq("slug", slug).maybeSingle(),
        supabase.from("plans").select("*").eq("service_slug", slug).order("sort_order"),
      ]);
      if (e1) throw e1;
      if (e2) throw e2;
      return { service: (s as Service | null) ?? null, plans: (p as Plan[]) ?? [] };
    },
  });

export const plansQuery = () =>
  queryOptions({
    queryKey: ["plans"],
    queryFn: async (): Promise<Plan[]> => {
      const { data, error } = await supabase.from("plans").select("*").order("service_slug").order("sort_order");
      if (error) throw error;
      return (data as Plan[]) ?? [];
    },
  });

export const faqsQuery = () =>
  queryOptions({
    queryKey: ["faqs"],
    queryFn: async (): Promise<Faq[]> => {
      const { data, error } = await supabase.from("faqs").select("*").order("sort_order");
      if (error) throw error;
      return (data as Faq[]) ?? [];
    },
  });

export const siteContentQuery = (key: string) =>
  queryOptions({
    queryKey: ["site_content", key],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_content").select("*").eq("key", key).maybeSingle();
      if (error) throw error;
      return data as { key: string; value: Record<string, unknown> } | null;
    },
  });
