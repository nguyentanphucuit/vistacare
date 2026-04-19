"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { buttonVariants } from "@/components/ui/button";
import { categories } from "@/lib/products";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";

const orderSchema = z.object({
  name: z.string().min(1, "Required").max(80),
  email: z.string().email("Invalid email"),
  phone: z.string().min(6, "Required").max(20),
  compressionClass: z.enum(["I", "II", "custom"]),
  size: z.string().min(1, "Required"),
  quantity: z.coerce.number().int().min(1, "Min 1").max(50, "Max 50"),
  address: z.string().min(10, "Please enter full address").max(300),
  measurements: z
    .string()
    .min(5, "Please list your measurements")
    .max(500),
  notes: z.string().max(1000).optional(),
});

type OrderValues = z.infer<typeof orderSchema>;

const SIZES = ["S", "M", "L", "XL", "XXL", "Custom"] as const;

const MEASUREMENT_HINTS: Record<string, string> = {
  "below-knee":
    "Ankle (cB), calf (cC), leg length (ankle to below knee).",
  "thigh-high":
    "Ankle (cB), calf (cC), thigh (cG), leg length (ankle to thigh).",
  "full-leg":
    "Ankle, calf, thigh, waist, hip, total length heel → waist.",
  "arm-sleeves":
    "Wrist, forearm, upper arm, arm length. For gauntlet: palm + thumb circumferences.",
  "body-garments":
    "Chest, waist, hip, torso length, and any specific reference points (scar, surgery site).",
  accessories: "Hand/foot size (S/M/L) and desired quantity.",
};

export function OrderForm({ categoryId }: { categoryId: string }) {
  const t = useTranslations("howToOrder.orderForm");
  const category = categories.find((c) => c.id === categoryId);
  const measurementHint =
    MEASUREMENT_HINTS[categoryId] ?? "List all relevant measurements.";

  const form = useForm<OrderValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      compressionClass: "I",
      size: "M",
      quantity: 1,
      address: "",
      measurements: "",
      notes: "",
    },
  });

  const onSubmit = (values: OrderValues) => {
    console.log("order submission", { categoryId, ...values });
    toast.success(t("successTitle"), {
      description: t("successBody"),
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 pt-2"
      >
        {category && (
          <div className="rounded-md bg-brand-navy-light px-3 py-2 text-sm text-brand-navy">
            {t("orderingFor")}: <strong>{category.label}</strong>
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("name")}</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("email")}</FormLabel>
                <FormControl>
                  <Input {...field} type="email" autoComplete="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("phone")}</FormLabel>
              <FormControl>
                <Input {...field} type="tel" autoComplete="tel" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-5 md:grid-cols-3">
          <FormField
            control={form.control}
            name="compressionClass"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("compressionClass")}</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="h-10 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="I">Class I (15–20 mmHg)</SelectItem>
                      <SelectItem value="II">Class II (20–30 mmHg)</SelectItem>
                      <SelectItem value="custom">{t("custom")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("size")}</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="h-10 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SIZES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("quantity")}</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min={1} max={50} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("address")}</FormLabel>
              <FormControl>
                <Textarea {...field} rows={2} autoComplete="street-address" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="measurements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("measurements")}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={3}
                  placeholder={measurementHint}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("notes")}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={3}
                  placeholder={t("notesPlaceholder")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="submit"
          className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
          disabled={form.formState.isSubmitting}
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          {t("submit")}
        </button>
      </form>
    </Form>
  );
}
