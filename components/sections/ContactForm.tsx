"use client";

import { motion, AnimatePresence } from "motion/react";
import { Formik, Form, Field, type FieldProps } from "formik";
import { contactSchema } from "@/schemas/contact";
import { cn } from "@/lib/utils";
import { HiCheckCircle } from "react-icons/hi2";
import { ContactFormValues } from "@/types";

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  message: "",
};

function FormField({
  label,
  name,
  type = "text",
  as,
  rows,
}: {
  label: string;
  name: string;
  type?: string;
  as?: string;
  rows?: number;
}) {
  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <div>
          <label
            htmlFor={name}
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            {label}
          </label>
          {as === "textarea" ? (
            <textarea
              {...field}
              id={name}
              rows={rows}
              className={cn(
                "w-full rounded-lg bg-surface-1 border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all duration-300 resize-none",
                meta.touched && meta.error
                  ? "border-destructive/50"
                  : "border-border"
              )}
              placeholder={`Enter your ${label.toLowerCase()}`}
              aria-describedby={
                meta.touched && meta.error ? `${name}-error` : undefined
              }
            />
          ) : (
            <input
              {...field}
              id={name}
              type={type}
              className={cn(
                "w-full rounded-lg bg-surface-1 border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all duration-300",
                meta.touched && meta.error
                  ? "border-destructive/50"
                  : "border-border"
              )}
              placeholder={`Enter your ${label.toLowerCase()}`}
              aria-describedby={
                meta.touched && meta.error ? `${name}-error` : undefined
              }
            />
          )}
          <AnimatePresence>
            {meta.touched && meta.error && (
              <motion.p
                id={`${name}-error`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-xs text-destructive mt-1.5"
                role="alert"
              >
                {meta.error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}
    </Field>
  );
}

export function ContactForm({ submitted, setSubmitted }: { submitted: boolean, setSubmitted: (b: boolean) => void }) {
  const handleSubmit = async (
    _values: ContactFormValues,
    { setSubmitting }: { setSubmitting: (b: boolean) => void }
  ) => {
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
          >
            <HiCheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          </motion.div>
          <h3 className="font-display text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
          <p className="text-sm text-muted-foreground mb-6">Thank you! I’ll reply soon.</p>
          <button onClick={() => setSubmitted(false)} className="text-sm text-primary hover:underline">
            Send another
          </button>
        </motion.div>
      ) : (
        <motion.div key="form" exit={{ opacity: 0, scale: 0.95 }}>
          <Formik
            initialValues={initialValues}
            validationSchema={contactSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-5" noValidate>
                <FormField label="Name" name="name" />
                <FormField label="Email" name="email" type="email" />
                <FormField label="Message" name="message" as="textarea" rows={5} />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full py-3.5 rounded-lg font-semibold text-sm transition-all duration-300",
                    isSubmitting
                      ? "bg-primary/50 text-primary-foreground/50 cursor-wait"
                      : "bg-primary text-primary-foreground hover:shadow-[0_0_30px_oklch(0.7_0.22_145/25%)] hover:scale-[1.01]"
                  )}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                       <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </span>
                  ) : "Send Message"}
                </button>
              </Form>
            )}
          </Formik>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
